---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# `createReducer`

Будь-який редюсер отримує стан Redux і екшен, перевіряє тип екшену всередині інструкції `switch` і виконує відповідну логіку оновлення стану для даного екшену. До того ж, редюсер визначає початкове значення стану та повертає отриманий стан, якщо не повинен обробляти екшен. Цей спосіб вимагає занадто багато шаблонного коду і схильний до помилок. Функція [`createReducer()`](https://redux-toolkit.js.org/api/createReducer) спрощує процес оголошення редюсерів.

```js
createReducer(initialState, builderCallback);
```

Перший параметр `initialState` очікує початковий стан редюсера, а другий параметр - функцію зворотнього виклику `builderCallback`, за допомогою якої визначається редюсер для кожного екшена.

```jsx
createReducer({}, (builder) => {
  builder.addCase(action, (state, action) => {});
});
```

Функція зворотнього виклику `builderCallback` оголошує один параметр `builder` - об'єкт із методами, за допомогою яких (`addCase`) ми реєструємо редюсери для екшенів. Тобто кожен case з switch стає викликом addCase, для якого написаний власний міні-редюсер.

```js
addCase(action, reducer);
```

Замінимо код оголошення редюсера завдань у нашому додатку використовуючи `createReducer`.

```jsx title="src/redux/reducer.js" showLineNumbers
import { createReducer } from '@reduxjs/toolkit';
import { statusFilters } from './constants';
import { addTask, deleteTask, toggleCompleted } from './actions';

const tasksInitialState = [];

//=============== Before ========================
const tasksReducer = (state = tasksInitialState, action) => {
  switch (action.type) {
    case addTask.type:
    // case logic
    case deleteTask.type:
    // case logic
    case toggleCompleted.type:
    // case logic
    default:
      return state;
  }
};

//=============== After ========================
export const tasksReducer = createReducer(tasksInitialState, (builder) => {
  builder
    .addCase(addTask, (state, action) => {})
    .addCase(deleteTask, (state, action) => {})
    .addCase(toggleCompleted, (state, action) => {});
});
```

Зверніть увагу на те, що не потрібен аналог `default`. Функція `createReducer` автоматично додає обробку поведінки за замовчуванням.

:::info Приведення до рядка
Першим аргументом, який передається до `addCase`, є посилання на функцію створення екшена. Вона перетворюється у рядок, тобто у значення властивості `type`, оскільки метод `toString()` генератора екшену було перевизначено так, щоб повертати тип екшену.
:::

Всередині кожного міні-редюсера додаємо код оновлення стану для екшену з відповідним типом.

```jsx title="src/redux/reducer.js" showLineNumbers
export const tasksReducer = createReducer(tasksInitialState, (builder) => {
  builder
    .addCase(addTask, (state, action) => {
      return [...state, action.payload];
    })
    .addCase(deleteTask, (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    })
    .addCase(toggleCompleted, (state, action) => {
      return state.map((task) => {
        if (task.id !== action.payload) {
          return task;
        }
        return {
          ...task,
          completed: !task.completed,
        };
      });
    });
});

export const filtersReducer = createReducer(filtersInitialState, (builder) => {
  builder.addCase(setStatusFilter, (state, action) => {
    return {
      ...state,
      status: action.payload,
    };
  });
});
```

Один із фундаментальних принципів Redux полягає в тому, що редюсери повинні бути чистими функціями, які не змінюють поточний стан, а повертають новий. Це дозволяє писати передбачуваний код, але іноді сильно ускладнює його, оскільки код іммутального оновлення стану може бути досить заплутаним.

## Бібліотека Immer

Redux Toolkit «під капотом» використовує бібліотеку [`Immer`](https://immerjs.github.io/immer/), яка значно спрощує логіку роботи зі станом, дозволяючи нам писати код оновлення стану в редюсері так, ніби ми безпосередньо змінювали стан. Насправді редюсери отримують копію стану, а Immer перетворює всі мутації на еквівалентні операції оновлення.

```jsx title="src/redux/reducer.js" showLineNumbers
export const tasksReducer = createReducer(tasksInitialState, (builder) => {
  builder
    .addCase(addTask, (state, action) => {
      // ✅ Immer замінить це на операцію оновлення
      state.push(action.payload);
    })
    .addCase(deleteTask, (state, action) => {
      // ✅ Immer замінить це на операцію оновлення
      const index = state.findIndex((task) => task.id === action.payload);
      state.splice(index, 1);
    })
    .addCase(toggleCompleted, (state, action) => {
      // ✅ Immer замінить це на операцію оновлення
      for (const task of state) {
        if (task.id === action.payload) {
          task.completed = !task.completed;
        }
      }
    });
});

export const filtersReducer = createReducer(filtersInitialState, (builder) => {
  builder.addCase(setStatusFilter, (state, action) => {
    // ✅ Immer замінить це на операцію оновлення
    state.status = action.payload;
  });
});
```

Написання редюсерів «змінюючих» стан робить код коротшим і усуває поширені помилки, які допускаються під час роботи з вкладеним станом. Однак це додає «магії» і візуально порушує один із фундаментальних принципів Redux.

### Зміна або оновлення

Іноді код іммутабельного оновлення стану лаконічніший, ніж його альтернатива, що «змінює». Наприклад, у редюсері обробки екшену видалення завдання. У такому разі необхідно обов'язково повернути новий стан.

```jsx title="src/redux/reducer.js" showLineNumbers
export const tasksReducer = createReducer(tasksInitialState, (builder) => {
  builder.addCase(deleteTask, (state, action) => {
    // ❌ Не правильно
    // state.filter(task => task.id !== action.payload)
    // ✅ Правильно
    return state.filter((task) => task.id !== action.payload);
  });
});
```

### Зміна чи повернення

Один із підводних каменів бібліотеки Immer полягає в тому, що в коді одного редюсера можна лише або мутувати стан, або повернути оновлений, але не те й інше водночас.

```jsx showLineNumbers
const reducer = createReducer([], (builder) => {
  builder.addCase(doSomething, (state, action) => {
    // ❌ Так робити не можна, буде згенеровано виняток
    state.push(action.payload);
    return state.map((value) => value * 2);
  });
});
```

## Планувальник завдань

Розберіть живий приклад планувальника завдань з оновленим кодом створення сторінок і генераторів екшенів.

<CP src='https://codesandbox.io/embed/goit-react-textbook-lesson-12-redux-toolkit-reducers-obj0xb?fontsize=14&hidenavigation=1&theme=dark' />
