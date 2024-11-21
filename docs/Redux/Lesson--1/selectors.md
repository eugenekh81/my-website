---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Підписка на стор

Щоб отримати дані зі стору, компоненти повинні підписатися на необхідні їм частини стану Redux. Для цього у бібліотеці React Redux є хук [`useSelector(selector)`](https://react-redux.js.org/api/hooks#useselector). Аргументом він приймає функцію, яка оголошує один параметр `state` - весь об'єкт стану Redux, який буде автоматично переданий функції хуком `useSelector`. Ця функція називається селектором і повинна повернути тільки ту частину стану, яка необхідна компоненту.

```jsx
// Імпортуємо хук
import { useSelector } from 'react-redux';

const MyComponent = () => {
  // Отримуємо необхідну частину стану
  const value = useSelector((state) => state.some.value);
};
```

Додамо код підписки компонентів нашої програми. Для того, щоб сфокусувати увагу на логіці коду передплати, у прикладах опустимо стилізацію. Повний код програми можна розібрати на живому прикладі в кінці цієї секції.

## Фільтр за статусом

Збережемо можливі значення фільтра як об'єкта, щоб повторно використовувати їх у різних місцях програми: компоненті `StatusFilter` для обчислення поточного активного фільтра та відправки екшенів зміни фільтра, компоненті `TaskList` для обчислення списку видимих завдань, а також функції-редюсері в якій потім будемо обробляти екшен зміни фільтра.

```jsx title="src/redux/constants.js" showLineNumbers
export const statusFilters = Object.freeze({
  all: 'all',
  active: 'active',
  completed: 'completed',
});
```

:::info `Object.freeze()`
Використовуємо метод [`Object.freeze()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) для того, щоб «заморозити» об'єкт значень фільтра та запобігти випадковій зміні за посиланням у місцях імпорту.
:::

Компоненту `StatusFilter` потрібно значення фільтра з властивості `statusFilter` стану Redux, тому функція-селектор виглядатиме як `state => state.filters.status`.

```jsx title="src/components/StatusFilter/StatusFilter.js" showLineNumbers
// Імпортуємо хук
import { useSelector } from 'react-redux';

// Імпортуємо об'єкт значень фільтра
import { statusFilters } from '../../redux/constants';

export const StatusFilter = () => {
  // Отримуємо значення фільтра із стану Redux
  const filter = useSelector((state) => state.filters.status);

  return (
    <div>
      <Button selected={filter === statusFilters.all}>All</Button>
      <Button selected={filter === statusFilters.active}>Active</Button>
      <Button selected={filter === statusFilters.completed}>Completed</Button>
    </div>
  );
};
```

## Список завдань

Компоненту `TaskList` необхідний масив завдань із властивості `tasks` та значення фільтра із властивості `statusFilter`. На основі цих значень ми можемо вирахувати масив завдань, які необхідно рендерувати в інтерфейсі.

```jsx title="src/components/TaskList/TaskList.js" showLineNumbers
// Імпортуємо хук
import { useSelector } from 'react-redux';
import { Task } from 'components/Task/Task';
// Імпортуємо об'єкт значень фільтра
import { statusFilters } from '../../redux/constants';

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
  // Отримуємо масив завдань із стану Redux
  const tasks = useSelector((state) => state.tasks);
  // Отримуємо значення фільтра із стану Redux
  const statusFilter = useSelector((state) => state.filters.status);
  // Обчислюємо масив завдань, які необхідно відображати в інтерфейсі
  const visibleTasks = getVisibleTasks(tasks, statusFilter);

  return (
    <ul>
      {visibleTasks.map((task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
};
```

:::info Де пропси?
Зверніть увагу на те, що у компонента `TaskList` немає пропсів, як це було б при використанні стану React. Компоненту `App` тепер не потрібно знати про те, що `TaskList` підписаний на дані із стору. Використовуючи Redux будь-який компонент може безпосередньо отримати доступ до значень стану Redux, якщо в цьому є необхідність.
:::

## Лічильник завдань

Компоненту `TaskCounter` необхідний масив завдань із властивості `tasks` стану Redux, тому функція-селектор виглядатиме як `state => state.tasks`. На базі цих даних ми можемо обчислити похідні дані кількості активних і виконаних завдань.

```jsx title="src/components/TaskCounter/TaskCounter.js" showLineNumbers
// Імпортуємо хук
import { useSelector } from 'react-redux';

export const TaskCounter = () => {
  // Отримуємо масив завдань із стану Redux
  const tasks = useSelector((state) => state.tasks);

  // На базі стану Redux отримуємо похідні дані
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

  return (
    <div>
      <p>Active: {count.active}</p>
      <p>Completed: {count.completed}</p>
    </div>
  );
};
```

## Функції-селектори

Один і той же селектор може використовуватися в декількох місцях програми, що призводить до дублювання коду, як, наприклад, у наших компонентах `TaskList`, `StatusFilter` та `TaskCounter`. Щоб уникнути цього та ще більше структурувати код, всі функції-селектори оголошуються в окремому файлі, наприклад, в `src/redux/selectors.js`, після чого імпортуються до компонентів.

```jsx title="src/redux/selectors.js" showLineNumbers
export const getTasks = (state) => state.tasks;

export const getStatusFilter = (state) => state.filters.status;
```

:::info Одне джерело правди
Оголошення функцій-селекторів поза компонентами також добре тим, що компоненти не знають про форму стану Redux, і у разі його зміни достатньо буде відредагувати код одного файлу, а не шукати селектори за кодом всіх компонентів програми.
:::

## Планувальник завдань

Розберіть живий приклад нашої програми. На даний момент у додатку реалізована ініціалізація стора з інструментами розробника та підписка компонентів на стор. Наступним кроком буде додавання відправки екшенів.

<CP src='https://codesandbox.io/embed/goit-react-textbook-lesson-11-redux-selectors-iopsd7?fontsize=14&hidenavigation=1&theme=dark' />
