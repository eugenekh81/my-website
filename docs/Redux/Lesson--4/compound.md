---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Складові селектори

У найпростішому вигляді селектор отримує поточний стан та повертає його необхідну частину. Селектори це звичайні функції, а отже, в них можна виконувати якісь дії, крім повернення значення. Селектор може обчислювати значення використовуючи частини стану та повертати результат обчислень.

```jsx
const selectTotalValue = (state) => {
  const a = state.values.a;
  const b = state.values.b;
  return a + b;
};
```

## Список завдань

У компоненті списку завдань `TaskList` у нас є код обчислення списку завдань які підходять під поточну умову фільтрації. Те, що робить функція `getVisibleTasks` може робити селектор, цим приховуючи від компонента логіку обчислення відфільтрованого списку завдань.

```jsx title="src/components/TaskList/TaskList.js" showLineNumbers
import { useSelector } from 'react-redux';
import { selectTasks, selectStatusFilter } from 'redux/selectors';
import { statusFilters } from 'redux/constants';

const getVisibleTasks = (tasks, statusFilter) => {
  switch (statusFilter) {
    case statusFilters.active:
      return tasks.filter((task) => !task.completed);
    case statusFilters.completed:
      return tasks.filter((task) => task.completed);
    default:
      return tasks;
  }
};

export const TaskList = () => {
  const tasks = useSelector(selectTasks);
  const statusFilter = useSelector(selectStatusFilter);
  const visibleTasks = getVisibleTasks(tasks, statusFilter);

  // Рендер JSX розмітки
};
```

Оголосимо селектор `selectVisibleTasks` і перенесемо до нього логіку обчислення списку відфільтрованих завдань.

```jsx title="src/redux/selectors.js" showLineNumbers
import { statusFilters } from './constants';

export const selectTasks = (state) => state.tasks.items;
export const selectIsLoading = (state) => state.tasks.isLoading;
export const selectError = (state) => state.tasks.error;
export const selectStatusFilter = (state) => state.filters.status;

export const selectVisibleTasks = (state) => {
  // Використовуємо інші селектори
  const tasks = selectTasks(state);

  const statusFilter = selectStatusFilter(state);

  switch (statusFilter) {
    case statusFilters.active:
      return tasks.filter((task) => !task.completed);
    case statusFilters.completed:
      return tasks.filter((task) => task.completed);
    default:
      return tasks;
  }
};
```

Зверніть увагу на те, що ми використовуємо інші селектори `selectTasks` та `selectStatusFilter` всередині селектора `selectVisibleTasks`, щоб одержати необхідні частини стану для наступних обчислень.

:::info Термінологія
Селектори, які тільки повертають якусь частину стану, без додаткових обчислень, називатимемо «атомарними». А ті, що повертають якісь значення, що обчислюються - «складовими».
:::

Тепер код компонента `TaskList` буде значно простіше, бо ми винесли всю логіку у селектор. Компоненту залишається лише викликати селектор і використовувати отримане значення.

```jsx title="src/components/TaskList/TaskList.js" showLineNumbers
import { useSelector } from 'react-redux';
import { selectVisibleTasks } from 'redux/selectors';

export const TaskList = () => {
  const tasks = useSelector(selectVisibleTasks);

  // Рендер JSX розмітки
};
```

## Лічильник завдань

Така сама ситуація в компоненті `TaskCounter`, де обчислюється кількість активних та виконаних завдань.

```jsx title="src/components/TaskCounter/TaskCounter.js" showLineNumbers
import { useSelector } from 'react-redux';
import { selectTasks } from 'redux/selectors';

export const TaskCounter = () => {
  const tasks = useSelector(selectTasks);

  const count = tasks.reduce(
    (acc, task) => {
      if (task.completed) {
        acc.completed += 1;
      } else {
        acc.active += 1;
      }
      return acc;
    },
    { active: 0, completed: 0 }
  );

  // Рендер JSX розмітки
};
```

Оголосимо складовий селектор `selectTaskCount`, який буде використовувати атомарний `selectTasks` для отримання списку всіх завдань та повертати результат обчислень.

```jsx title="src/redux/selectors.js" showLineNumbers
// Решта селекторів

export const selectTasks = (state) => state.tasks.items;

export const selectTaskCount = (state) => {
  const tasks = selectTasks(state);

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

Тепер код компонента `TaskCounter` буде значно простіше, тому що ми винесли всю логіку до селектора. Компоненту залишається лише викликати селектор і використовувати отримане значення.

```jsx title="src/components/TaskCounter/TaskCounter.js" showLineNumbers
import { useSelector } from 'react-redux';
import { selectTaskCount } from 'redux/selectors';

export const TaskCounter = () => {
  const count = useSelector(selectTaskCount);

  // Рендер JSX розмітки
};
```

Розберіть живий приклад нашої програми з кодом складових селекторів.

<CP src='https://codesandbox.io/embed/goit-react-textbook-lesson-14-redux-toolkit-compound-selectors-1vsoh5?fontsize=14&hidenavigation=1&theme=dark' />
