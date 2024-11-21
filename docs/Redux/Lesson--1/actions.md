---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Екшени (actions)

**Екшени** - це об'єкти, які передають дані з компонентів у стор, тим самим сигналізуючи про те, яка подія сталася в інтерфейсі. Вони являються єдиним джерелом інформації для стору.

```js showLineNumbers
const action = {
  type: "Action type",
  payload: "Payload value",
};
```

Екшени повинні мати обов'язкову властивість `type` - рядок який описує тип події в інтерфейсі. Крім властивості `type` структура об'єкта може бути довільною, проте, дані зазвичай передають у необов'язковій властивості `payload`. Даними екшену може бути будь-яке значення крім функцій та класів.

Створимо екшени які описуватимуть додавання, видалення та перемикання статусу завдання, а також зміну значення фільтра.

```js showLineNumbers
const addTask = {
  type: "tasks/addTask",
  payload: {
    id: "Generated id",
    text: "User entered text",
    completed: false,
  },
};

const deleteTask = {
  type: "tasks/deleteTask",
  payload: "Task id",
};

const toggleCompleted = {
  type: "tasks/toggleCompleted",
  payload: "Task id",
};

const setStatusFilter = {
  type: "filters/setStatusFilter",
  payload: "Filter value",
};
```

:::info Найкращі практики - найменування
Одна з найпопулярніших конвенцій складання типу екшену пропонує використовувати у значенні поля `type` дві частини у форматі `domain/eventName`. Перше це ім'я категорії (сутності) до якої належить екшен (`tasks` та `filters`), зазвичай збігається з ім'ям властивості частини стану Redux, і друге це подія, яка описує екшен (`addTask`, `deleteTask`, `toggleCompleted`, `setStatusFilter`).
:::

:::info Найкращі практики - мінімалізм
Екшени повинні нести в собі мінімально необхідний набір інформації, якого буде достатньо для зміни стану. Наприклад, при видаленні завдання досить передати її ідентифікатор, а чи не весь об'єкт завдання цілком.
:::

## Генератори екшенів

Екшени - це статичні об'єкти, значення властивості `payload` яких неможливо задати динамічно. Генератори екшенів (Action Creators) - функції, які можуть приймати аргументи, після чого створюють та повертають екшени з однаковим значенням властивості type, але різними `payload`. Вони можуть мати побічні ефекти, наприклад, заповнювати властивості за замовчуванням або генерувати унікальний ідентифікатор об'єкта завдання. Створимо генератори екшенів для нашої програми.

```jsx title="src/redux/actions.js" showLineNumbers
import { nanoid } from "nanoid";

export const addTask = text => {
  return {
    type: "tasks/addTask",
    payload: {
      id: nanoid(),
      completed: false,
      text,
    },
  };
};

export const deleteTask = taskId => {
  return {
    type: "tasks/deleteTask",
    payload: taskId,
  };
};

export const toggleCompleted = taskId => {
  return {
    type: "tasks/toggleCompleted",
    payload: taskId,
  };
};

export const setStatusFilter = value => {
  return {
    type: "filters/setStatusFilter",
    payload: value,
  };
};
```

:::info Унікальний ідентифікатор задачі
Зверніть увагу на генератор екшенів створення задачі `addTask`. В майбутньому присвоєнням ідентифікатора займатиметься бекенд, а поки що зробимо це в нашому коді. Для цього використовуємо бібліотеку [**`nanoid`**](https://www.npmjs.com/package/nanoid).
:::

## Відправлення екшенів

Для того щоб сповістити сторінку про те, що в інтерфейсі відбулася якась подія, необхідно відправити екшен. Для цього у бібліотеці React Redux є хук [useDispatch()](https://react-redux.js.org/api/hooks#usedispatch), який повертає посилання на функцію надсилання екшенів dispatch з об'єкта створеного нами раніше стора Redux.

```jsx showLineNumbers
// Імпортуємо хук
import { useDispatch } from "react-redux";

const MyComponent = () => {
  // Отримуємо посилання на функцію відправки екшенів
  const dispatch = useDispatch();
};
```

Додамо код відправлення раніше спроектованих екшенів із компонентів нашої програми. Для того щоб сфокусувати увагу на відправці екшенів, в приклади опустимо код стилізації. Повний код програми ви можете розібрати на живому прикладі наприкінці цієї секції.

### Створення завдання

При сабміті форми в компоненті `TaskForm` необхідно надіслати екшен створення нового завдання, передавши йому значення, введене користувачем у текстове поле.

```jsx title="src/components/TaskForm/TaskForm.js"
// Імпортуємо хук
import { useDispatch } from "react-redux";
// Імпортуємо генератор екшену
import { addTask } from "../../redux/actions";

export const TaskForm = () => {
  // Отримуємо посилання на функцію відправки екшенів
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    // Викликаємо генератор екшену та передаємо текст завдання для поля payload
    // Відправляємо результат – екшен створення завдання
    dispatch(addTask(form.elements.text.value));
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="text" placeholder="Enter task text..." />
      <button type="submit">Add task</button>
    </form>
  );
};
```

При сабміті форми, у списку екшенів зліва Redux DevTools, додається відправлений екшен створення завдання. Клікнувши по ньому та вибравши у правій частині вкладку `Actions`, можна переглянути детальну інформацію.

<img src='add-task-action.png' alt='Add task action in redux devtools' />

### Видалення завдання

При натисканні на кнопку видалення в компоненті `Task`, необхідно відправити екшен видалення завдання, передавши йому ідентифікатор завдання. Цих даних буде достатньо для видалення задачі з масиву об'єктів.

```jsx title="src/components/Task/Task.js" showLineNumbers
// Імпортуємо хук
import { useDispatch } from "react-redux";
// Імпортуємо генератор екшену
import { deleteTask } from "../../redux/actions";

export const Task = ({ task }) => {
  // Отримуємо посилання на функцію відправки екшенів
  const dispatch = useDispatch();
  // Викликаємо генератор екшену та передаємо ідентифікатор завдання
  // Відправляємо результат - екшен видалення завдання
  const handleDelete = () => dispatch(deleteTask(task.id));

  return (
    <div>
      <input type="checkbox" />
      <p>{task.text}</p>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
```

При натисканні на кнопку видалення, в Redux DevTools додається відправлений екшен видалення завдання. Клікнувши по ньому, можна переглянути детальну інформацію.

<img src='/img/Redux/delete-task-action.png' alt='Delete task action in redux devtools' />

### Переключення статусу

При натисканні на чекбокс в компоненті `Task`, необхідно відправити екшен перемикання статусу завдання, передавши йому ідентифікатор завдання. Цих даних буде достатньо для того, щоб знайти завдання в масиві об'єктів і змінити значення властивості на протилежне.

```jsx title="src/components/Task/Task.js" showLineNumbers
// Імпортуємо хук
import { useDispatch } from "react-redux";
// Імпортуємо генератор екшену
import { deleteTask, toggleCompleted } from "../../redux/actions";

export const Task = ({ task }) => {
  // Отримуємо посилання на функцію відправки екшенів
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteTask(task.id));

  // Викликаємо генератор екшену та передаємо ідентифікатор завдання
  // Відправляємо результат - екшен перемикання статусу завдання
  const handleToggle = () => dispatch(toggleCompleted(task.id));

  return (
    <div>
      <input type="checkbox" onChange={handleToggle} checked={task.completed} />
      <p>{task.text}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
```

При кліку по чекбоксу, Redux DevTools додається відправлений екшен зміни статусу завдання. Клікнувши по ньому, можна переглянути детальну інформацію.

<img src='/img/Redux/toggle-task-action.png' alt='Toggle task action in redux devtools' />

:::info Без зайвих пропсів
Зверніть увагу на те, що у компонента `Task` немає додаткових пропсів, наприклад методів для видалення та зміни статусу, як це було б при використання стану React. Це також робить компонент списку завдань простіше, йому не доводиться приймати не потрібні пропси та прокидати їх у компонент завдання. Використовуючи Redux, будь-який компонент може безпосередньо отримати доступ до функції. відправлення екшенів.
:::

### Зміна фільтра

При натисканні на кнопки в компоненті `StatusFilter` необхідно відправити екшен зміни фільтра, передавши йому нове значення. Використовуємо об'єкт значень фільтр з файлу констант.

```jsx title="src/components/StatusFilter/StatusFilter.js" showLineNumbers
// Імпортуємо хук
import { useSelector, useDispatch } from "react-redux";
// Імпортуємо генератор екшену
import { setStatusFilter } from "../../redux/actions";
// Імпортуємо об'єкт значень фільтра
import { statusFilters } from "../../redux/constants";

export const StatusFilter = () => {
  // Отримуємо посилання на функцію відправки екшенів
  const dispatch = useDispatch();

  const filter = useSelector(state => state.statusFilter);

  // Викликаємо генератор екшену та передаємо значення фільтра
  // Відправляємо результат - екшен зміни фільтра
  const handleFilterChange = filter => dispatch(setStatusFilter(filter));

  return (
    <div>
      <Button
        selected={filter === statusFilters.all}
        onClick={() => handleFilterChange(statusFilters.all)}
      >
        All
      </Button>
      <Button
        selected={filter === statusFilters.active}
        onClick={() => handleFilterChange(statusFilters.active)}
      >
        Active
      </Button>
      <Button
        selected={filter === statusFilters.completed}
        onClick={() => handleFilterChange(statusFilters.completed)}
      >
        Completed
      </Button>
    </div>
  );
};
```

При натисканні на кнопки фільтра, в Redux DevTools додається відправлений екшен зміни фільтра. Клікнувши по ньому, можна переглянути детальну інформацію.

<img src='/img/Redux/filter-task-action.png' alt='Filter task action in redux devtools' />

## Планувальник завдань

Розберіть живий приклад нашої програми. На даний момент у додатку реалізовано ініціалізацію стора з інструментами розробника, підписка компонентів на стор і надсилання екшенів. Наступним кроком буде додавання логіки оновлення стану Redux за допомогою функцій-редюсерів.

<CP src='https://codesandbox.io/embed/goit-react-textbook-lesson-11-redux-actions-ysg1xq?fontsize=14&hidenavigation=1&theme=dark' />
