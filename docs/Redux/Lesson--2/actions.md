---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# `createAction`

Функція [`createAction(type)`](https://redux-toolkit.js.org/api/createAction) спрощує процес оголошення екшенів. В якості аргументу вона приймає рядок який описує тип дії та повертає генератор екшену.

```jsx title="src/redux/actions.js" showLineNumbers
//=============== Before ========================
const addTask = text => {
  return { type: "tasks/AddTask", payload: text };
};

console.log(addTask("Learn Redux Toolkit"));
// {type: "tasks/addTask", payload: "Learn Redux Toolkit"}

//=============== After ========================
import { createAction } from "@reduxjs/toolkit";

const addTask = createAction("tasks/AddTask");

console.log(addTask("Learn Redux Toolkit"));
// {type: "tasks/addTask", payload: "Learn Redux Toolkit"}
```

Додамо код створення інших генераторів екшенів для нашої програми. Використання `createAction()` позбавить нас від повторюваного шаблонного коду оголошення генератора екшену.

```jsx title="src/redux/actions.js" showLineNumbers
import { createAction } from "@reduxjs/toolkit";

export const addTask = createAction("tasks/addTask");

export const deleteTask = createAction("tasks/deleteTask");

export const toggleCompleted = createAction("tasks/toggleCompleted");

export const setStatusFilter = createAction("filters/setStatusFilter");
```

## Тип екшену

Є два способи отримати тип екшену, наприклад, для використання в редюсері.

```jsx
import { createAction } from "@reduxjs/toolkit";

const addTask = createAction("tasks/AddTask");

// У генератора екшену є властивість type
console.log(addTask.type); // "tasks/AddTask"

// Метод toString() функції addTask був перевизначений
console.log(addTask.toString()); // "tasks/AddTask"
```

У редюсері імпортуємо екшени та використовуємо їх властивість type для заміни рядків всередині інструкції `switch`.

```jsx title="src/redux/reducer.js" showLineNumbers
import { addTask, deleteTask, toggleCompleted } from "./actions";

export const tasksReducer = (state = tasksInitialState, action) => {
  switch (action.type) {
    case addTask.type:
      return [...state, action.payload];

    case deleteTask.type:
      return state.filter(task => task.id !== action.payload);

    case toggleCompleted.type:
      return state.map(task => {
        if (task.id !== action.payload) {
          return task;
        }
        return { ...task, completed: !task.completed };
      });

    default:
      return state;
  }
};
```

## Вміст `payload`

За замовчуванням генератори екшенів приймають один аргумент, який стає значенням властивості `payload`. Якщо потрібно написати додаткову логіку створення значення `payload`, наприклад, додати унікальний ідентифікатор, `createAction` можна передати другий, необов'язковий аргумент – функцію створення екшену.

```jsx
createAction(type, prepareAction)
```

Аргументи генератора екшену будуть передані функції `prepareAction`, яка повинна повернути об'єкт із властивістю `payload`. Властивість `type` буде додано автоматично.

```jsx title="src/redux/actions.js" showLineNumbers
import { createAction, nanoid } from "@reduxjs/toolkit";

export const addTask = createAction("tasks/addTask", text => {
  return {
    payload: {
      text,
      id: nanoid(),
      completed: false,
    },
  };
});

console.log(addTask("Learn Redux Toolkit"));
/**
 * {
 *   type: 'tasks/addTask',
 *   payload: {
 *     text: 'Learn Redux Toolkit',
 *     id: '4AJvwMSWEHCchcWYga3dj',
 *     completed: false
 *   }
 * }
 **/
```

Розберіть живий приклад планувальника завдань з оновленим кодом створення сторінок і генераторів екшенів.

<CP src='https://codesandbox.io/embed/goit-react-textbook-lesson-12-redux-toolkit-actions-48pfmc?fontsize=14&hidenavigation=1&theme=dark' />
