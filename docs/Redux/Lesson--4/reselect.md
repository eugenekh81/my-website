---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Оптимізація

Атомарні селектори повертають частини стану, тому значення, що повертається оновлюється лише за зміни відповідної частини стану, навіть якщо це посилальний тип даних, тобто масив чи об'єкт. Складові селектори повертають значення, що обчислюються, і ці обчислення запускаються щоразу при оновленні стану.

Якщо зараз у код селектора `selectTaskCount` додати логування повідомлення, то ми побачимо його надто часто. Цей селектор обчислює кількість активних та виконаних завдань навіть при зміні значення фільтра статусу, хоча це ніяк не впливає на масив завдань у стані Redux від якого залежать обчислення.

```jsx title="src/redux/selectors.js" showLineNumbers
export const selectTaskCount = state => {
  const tasks = selectTasks(state);

  console.log("Calculating task count");

  return tasks.reduce(
    (count, task) => {
      if (task.completed) {
        count.completed += 1;
      } else {
        count.active += 1;
      }
      return count;
    },
    { active: 0, completed: 0 }
  );
};
```

Додайте логування рядка до коду селектора, після чого відкрийте вкладку Console в інструментах розробника, змінюйте значення фільтра та подивіться результат - повідомлення про обчислення кількості завдань, при цьому масив задач не змінюється. Те саме з селектором `selectVisibleTasks`.

:::info Висновок
Якщо селектор повертає посилальний тип або виконує якісь обчислення, його необхідно оптимізувати так, щоб ці обчислення запускалися тільки за умови зміни тих частин стану, які використовуються в селекторі.
:::

## Функція `createSelector`

Процес оптимізації селекторів називається **мемоізація** - збереження результатів виконання функції для запобігання повторним обчисленням.

Для мемоізації селектора використовується функція `createSelector`, яка приймає масив селекторів, значення яких необхідні для наступних обчислень та функцію перетворювач, в якій виконуватимуться всі обчислення.

```jsx showLineNumbers
import { createSelector } from "@reduxjs/toolkit";

const selector = createSelector(
  // Масив вхідних селекторів
  [inputSelector1, inputSelector2, inputSelector3],
  // Функція перетворювач
  (result1, result2, result3) => {
    // Виконуємо обчислення та повертаємо результат
  }
);
```

- У масиві селекторів можуть бути будь-які інші селектори, як атомарні так і складові, у тому числі мемоізовані
- Результати вхідних селекторів передаються як аргументи функції перетворення в тому самому порядку, в якому вони перераховані
- Повторні обчислення виконуються лише якщо зміниться значення якогось параметра, в іншому випадку повертається результат останнього виклика функції

Використовуємо `createSelector` та напишемо мемоізований селектор підрахунку кількості завдань `selectTaskCount`. Він залежить лише від масиву завдань, тому використовуємо один вхідний селектор `selectTasks`.

```jsx title="src/redux/selectors.js" showLineNumbers
import { createSelector } from "@reduxjs/toolkit";

// Решта селекторів

export const selectTaskCount = createSelector([selectTasks], tasks => {
  console.log("Calculating task count. Now memoized!");

  return tasks.reduce(
    (count, task) => {
      if (task.completed) {
        count.completed += 1;
      } else {
        count.active += 1;
      }
      return count;
    },
    { active: 0, completed: 0 }
  );
});
```

Відкрийте вкладку `Console` в інструментах розробника, змінюйте значення фільтра та подивіться результат - повідомлення про обчислення кількості завдань немає. Тепер обчислення виконуються лише якщо зміниться масив завдань.

Те саме з селектором списку завдань в залежності від значення фільтра `selectVisibleTasks`. Він залежить від списку завдань та фільтра, тому використовуємо вхідні селектори selectTasks та selectStatusFilter.

```jsx title="src/redux/selectors.js" showLineNumbers
import { createSelector } from "@reduxjs/toolkit";

// Решта селекторів

export const selectVisibleTasks = createSelector(
  [selectTasks, selectStatusFilter],
  (tasks, statusFilter) => {
    console.log("Calculating visible tasks. Now memoized!");

    switch (statusFilter) {
      case statusFilters.active:
        return tasks.filter(task => !task.completed);
      case statusFilters.completed:
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }
);
```

Розберіть живий приклад нашого додатка з кодом мемоізованих селекторів.

<CP src='https://codesandbox.io/embed/goit-react-textbook-lesson-14-redux-toolkit-reselect-suw1m8?fontsize=14&hidenavigation=1&theme=dark' />
