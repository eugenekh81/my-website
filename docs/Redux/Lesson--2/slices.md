---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# `createSlice`

При проектуванні структура стану Redux ділиться на слайси (`slice`, частина), за кожен із яких відповідає окремий редюсер. У нашому додатку планувальника задач є два слайси - завдання (`tasks`) та фільтри (`filters`).

```js
const appState = {
  tasks: [],
  filters: {},
};
```

Для кожного слайсу створюється стандартний набір сутностей: типи екшенів, генератори екшенів та редюсер. Редюсери визначають початковий стан слайсу, список екшенів, що впливають на нього та операції оновлення стану.

Функція [`createSlice()`](https://redux-toolkit.js.org/api/createSlice) це надбудова над `createAction()` та `createReducer()`, яка стандартизує та ще більше спрощує оголошення слайсу. Вона приймає параметри налаштувань, створює і повертає типи екшенів, генератори екшенів та редюсер. Розберемо створення слайсу на прикладі списку задач.

```jsx showLineNumbers
import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  // Ім'я слайсу
  name: "tasks",
  // Початковий стан редюсера слайсу
  initialState: tasksInitialState,
  // Об'єкт редюсерів
  reducers: {
    addTask(state, action) {},
    deleteTask(state, action) {},
    toggleCompleted(state, action) {},
  },
});

// Генератори екшенів
const { addTask, deleteTask, toggleCompleted } = tasksSlice.actions;
// Редюсер слайсу
const tasksReducer = tasksSlice.reducer;
```

Властивість `name` визначає ім'я слайсу, яке додаватиметься під час створення екшенів, як приставка до імен редюсерів, оголошених у властивості `reducers`. Так ми отримаємо екшени з типами `tasks/addTask`, `tasks/deleteTask` та `tasks/toggleCompleted`.

Функція `createSlice()` у своїй реалізації використовує `createReducer` і бібліотеку `Immer`, тому можна писати логіку оновлення стану так, як якби ми безпосередньо змінювали його.

```jsx showLineNumbers
import { createSlice } from "@reduxjs/toolkit";

const tasksInitialState = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {
    addTask(state, action) {
      state.push(action.payload);
    },
    deleteTask(state, action) {
      const index = state.findIndex(task => task.id === action.payload);
      state.splice(index, 1);
    },
    toggleCompleted(state, action) {
      for (const task of state) {
        if (task.id === action.payload) {
          task.completed = !task.completed;
          break;
        }
      }
    },
  },
});

const { addTask, deleteTask, toggleCompleted } = tasksSlice.actions;
const tasksReducer = tasksSlice.reducer;
```

## Вміст `payload`

Генератор екшену `addTask` очікує лише рядок з текстом завдання, після чого змінює значення `payload` використовуючи функцію підготовки екшену. Ось як це виглядає зараз у нашому коді.

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
```

Щоб зробити те саме при створенні слайсу, властивості в об'єкті редюсерів, в нашому випадку `addTask`, необхідно передати не функцію, а об'єкт із двома властивостями - `reducer` та `prepare`.


```jsx showLineNumbers
import { createSlice, nanoid } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            text,
            id: nanoid(),
            completed: false,
          },
        };
      },
    },
    // Код решти редюсерів
  },
});
```

## Файли слайсів

Нам більше не потрібний файл `reducer.js`, тому що під кожен слайс ми створимо окремий файл. Для слайсу завдань це буде файл `tasksSlice.js`.

```jsx title="src/redux/tasksSlice.js"
import { createSlice } from "@reduxjs/toolkit";

const tasksInitialState = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            text,
            id: nanoid(),
            completed: false,
          },
        };
      },
    },
    deleteTask(state, action) {
      const index = state.findIndex(task => task.id === action.payload);
      state.splice(index, 1);
    },
    toggleCompleted(state, action) {
      for (const task of state) {
        if (task.id === action.payload) {
          task.completed = !task.completed;
          break;
        }
      }
    },
  },
});

// Експортуємо генератори екшенів та редюсер
export const { addTask, deleteTask, toggleCompleted } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
```

Та файл `filtersSlice.js` для слайсу фільтрів.

```jsx title="src/redux/filtersSlice.js" showLineNumbers
import { createSlice } from "@reduxjs/toolkit";
import { statusFilters } from "./constants";
const filtersInitialState = {
  status: statusFilters.all,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: filtersInitialState,
  reducers: {
    setStatusFilter(state, action) {
      state.status = action.payload;
    },
  },
});

// Експортуємо генератори екшенів та редюсер
export const { setStatusFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
```

## Створення стора

У файлі створення стора необхідно змінити код імпорту редюсерів.

```jsx title="src/redux/store.js" showLineNumbers
import { configureStore } from "@reduxjs/toolkit";
//=============== Before ========================
// import { tasksReducer, filtersReducer } from "./reducer";
//=============== After ========================
import { tasksReducer } from "./tasksSlice";
import { filtersReducer } from "./filtersSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
  },
});
```

## Генератори екшенів
Генератори екшенів тепер створюються автоматично для кожного слайсу. Це означає, що нам більше не потрібно вручну оголошувати їх в окремому файлі. `createAction()`. Ми можемо видалити файл `actions.js` та оновити імпорти генераторів екшенів у файлах компонентів. Структура файлів проекту тепер буде виглядати так.

<Image src='/img/Redux/file-structure.png' alt='Slice based file structure' />

Імпорти генераторів екшенів виготовляються з відповідного файлу слайсу.

```jsx
//=============== Before ========================
 import { deleteTask, toggleCompleted } from "redux/actions";

//=============== After ========================
import { deleteTask, toggleCompleted } from "redux/tasksSlice";
```

## Планувальник завдань
Розберіть живий приклад планувальника завдань з оновленим кодом створення сторінок і генераторів екшенів.

<CP src='https://codesandbox.io/embed/goit-react-textbook-lesson-12-redux-toolkit-slices-ie3w35?fontsize=14&hidenavigation=1&theme=dark' />
