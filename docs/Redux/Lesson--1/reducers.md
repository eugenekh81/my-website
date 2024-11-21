---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Редюсери (reducers)

Ми спроектували стан програми, пов'язали компоненти та стор, додали відправлення екшенів. Настав час написати логіку зміни стану Redux.

**Редюсер (reducer)** - це функція, яка приймає поточний стан та екшен як аргументи і повертає новий стан. Редюсер визначає, як змінюється стан програми у відповідь на екшени, надіслані на стор. Пам'ятайте, що екшени описують тільки те, що сталося, а не як змінюється стан програми.

```bash
(state, action) => nextState
```

## Кореневий редюсер

У додатку завжди буде лише один кореневий редюсер, який потрібно передати до `createStore` під час створення стора. Цей редюсер відповідає за обробку всіх відправлених екшенів та обчислення нового стану.

```jsx title="src/redux/reducer.js" showLineNumbers
import { statusFilters } from "./constants";

const initialState = {
  tasks: [
    { id: 0, text: "Learn HTML and CSS", completed: true },
    { id: 1, text: "Get good at JavaScript", completed: true },
    { id: 2, text: "Master React", completed: false },
    { id: 3, text: "Discover Redux", completed: false },
    { id: 4, text: "Build amazing apps", completed: false },
  ],
  filters: {
    status: statusFilters.all,
  },
};

// Використовуємо initialState як значення стану за умовчанням
export const rootReducer = (state = initialState, action) => {
  // Редюсер розрізняє екшени за значенням властивості type
  switch (action.type) {
    // Залежно від типу екшену виконуватиметься різна логіка
    default:
      // Кожен редюсер отримує всі екшени, відправлені в стор.
      // Якщо редюсер не повинен обробляти якийсь тип екшену,
      // необхідно повернути наявний стан без змін.
      return state;
  }
};
```

:::info Початковий стан
При ініціалізації стора (екшен `@@INIT` у Redux DevTools) всім редюсерам у якості значення стану передається `undefined`. Тому кожному редюсеру необхідно вказати значення за замовчуванням для параметра `state`, яке стане початковим станом програми.
:::

Додамо логіку обробки екшену створення завдання. Перевіряємо чи відповідає тип відправленого екшену рядку `"tasks/addTask"` і повертаємо новий об'єкт, що містить весь стан, навіть для властивостей, які не змінилися.

```jsx title="src/redux/reducer.js" showLineNumbers
import { statusFilters } from "./constants";

const initialState = {
  tasks: [
    { id: 0, text: "Learn HTML and CSS", completed: true },
    { id: 1, text: "Get good at JavaScript", completed: true },
    { id: 2, text: "Master React", completed: false },
    { id: 3, text: "Discover Redux", completed: false },
    { id: 4, text: "Build amazing apps", completed: false },
  ],
  filters: {
    status: statusFilters.all,
  },
};

export const rootReducer = (state = initialState, action) => {
  // Редюсер розрізняє екшени за значенням властивості type
  switch (action.type) {
    // Залежно від типу екшену виконуватиметься різна логіка
    case "tasks/addTask": {
      // Потрібно повернути новий об'єкт стану
      return {
        // в якому є всі дані існуючого стану
        ...state,
        // та новий масив задач
        tasks: [
          // в якому є всі існуючі завдання
          ...state.tasks,
          // та об'єкт нового завдання
          action.payload,
        ],
      };
    }
    default:
      // Кожен редюсер отримує всі екшени, відправлені в стор.
      // Якщо редюсер не повинен обробляти якийсь тип екшену,
      // необхідно повернути наявний стан без змін.
      return state;
  }
};
```

:::info Імутабельність стану
Писати логіку оновлення стану вручну не найлегше завдання, тому випадкова зміна стану в редюсерах – це поширена помилка, на практиці вам не доведеться писати складні вкладені іммутабельні оновлення вручну. У наступному занятті ви дізнаєтесь, як використовувати Redux Toolkit, щоб спростити написання логіки поновлення стану.
:::

Код файлу створення стора імпортує та використовує кореневий редюсер.

```jsx title="src/redux/store.js" showLineNumbers
import { createStore } from "redux";
import { devToolsEnhancer } from "@redux-devtools/extension";
import { rootReducer } from "./reducer";

const enhancer = devToolsEnhancer();
export const store = createStore(rootReducer, enhancer);
```

:::info Оновлення інтерфейсу
Якщо тепер спробувати додати нове завдання до інтерфейсу нашої програми, то у списку завдань з'явиться новий елемент. Справа в тому, що хук `useSelector` змушує компонент рендери повторно кожного разу при зміні тієї частини стану, на яку підписаний компонент.
:::

## Правила редюсерів
Редюсери повинні бути чистими функціями та дотримуватися списку правил:

- Не можна змінювати аргументи (`state` та `action`). Редюсери мають лише обчислювати нове значення стану з урахуванням цих аргументів
- Не можна змінювати стан (`state`). Натомість редюсери повинні робити оновлення, копіюючи існуючий стан та вносячи зміни до копії
- Редюсери не повинні виконувати жодних «побічних ефектів». Наприклад, запуск таймера, виконання HTTP-запиту, зміна значення поза функцією або її аргументів, генерація випадкових чисел чи рядків тощо

Як виконувати побічні ефекти ми розглянемо далі, поки просто пам'ятаєте - редюсер має бути чистою функцією. Отримуючи аргументи, він має обчислити наступний стан та повернути його. Жодних побічних ефектів. Жодних мутацій. Тільки обчислення нової версії стану.

## Обробка екшенів

Додамо в кореневий редюсер код обробки всіх інших екшенів нашої програми.

### Видалення завдання

При видаленні нам доступний ідентифікатор завдання у властивості `payload`, тому використовуємо метод `Array.filter()` для того, щоб іммутабельно створити новий масив без цього завдання. Перевіряємо, чи відповідає тип відправленого екшену рядку `"tasks/deleteTask"` та повертаємо новий об'єкт стану.

```jsx title="src/redux/reducer.js" showLineNumbers
export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "tasks/addTask":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "tasks/deleteTask":
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    default:
      return state;
  }
};
```

### Перемикання статусу

При перемиканні статусу нам доступний ідентифікатор завдання у властивості `payload`, тому використовуємо метод `Array.map()` для того, щоб іммутабельно створити новий масив із зміненим значенням властивості `completed` у задачі з відповідним ідентифікатором. Перевіряємо, чи відповідає тип відправленого екшену рядку `"tasks/toggleCompleted"` та повертаємо новий об'єкт стану.

```jsx title="src/redux/reducer.js" showLineNumbers
export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "tasks/addTask":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "tasks/deleteTask":
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case "tasks/toggleCompleted":
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id !== action.payload) {
            return task;
          }
          return {
            ...task,
            completed: !task.completed,
          };
        }),
      };
    default:
      return state;
  }
};
```

### Зміна фільтра

При зміні фільтра нам доступне нове значення фільтра `payload`, тому перевіряємо чи відповідає тип відправленого екшену рядку `"filters/setStatusFilter"` та повертаємо новий об'єкт стану.

```jsx title="src/redux/reducer.js" showLineNumbers
export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "tasks/addTask":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "tasks/deleteTask":
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case "tasks/toggleCompleted":
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === action.payload) {
            return {
              ...task,
              completed: !task.completed,
            };
          }
          return task;
        }),
      };
    case "filters/setStatusFilter":
      return {
        ...state,
        filters: {
          ...state.filters,
          status: action.payload,
        },
      };
    default:
      return state;
  }
};
```

Ми додали код обробки всього чотирьох екшенів, а код кореневого редюсера вже стає громіздким. Якщо намагатися обробити всі екшени програми в одній Функції-редюсер, код буде досить важким для розуміння. Тому редюсери зазвичай поділяються на кілька дрібніших, щоб спростити розуміння і підтримку коду

## Композиція редюсерів

Зазвичай редюсери поділяються ґрунтуючись на частинах стану Redux які вони оновлюють. Розділимо обробку екшенів завдань та зміни фільтра на два незалежних редюсера. Кожен редюсер відповідатиме лише за свою частину стану Redux, тому код оновлення стану буде значно простіше.

```jsx title="src/redux/reducer.js" showLineNumbers
const tasksInitialState = [
  { id: 0, text: "Learn HTML and CSS", completed: true },
  { id: 1, text: "Get good at JavaScript", completed: true },
  { id: 2, text: "Master React", completed: false },
  { id: 3, text: "Discover Redux", completed: false },
  { id: 4, text: "Build amazing apps", completed: false },
];

// Відповідає лише за оновлення властивості tasks
// Тепер значенням параметра state буде масив завдань
const tasksReducer = (state = tasksInitialState, action) => {
  switch (action.type) {
    case "tasks/addTask":
      return [...state, action.payload];
    case "tasks/deleteTask":
      return state.filter(task => task.id !== action.payload);
    case "tasks/toggleCompleted":
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

const filtersInitialState = {
  status: statusFilters.all,
};

// Відповідає лише за оновлення властивості filters
// Тепер значенням параметра state буде об'єкт фільтрів
const filtersReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case "filters/setStatusFilter":
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};
```

Тепер у нас є два окремі редюсери, але при створенні стора необхідно передати один кореневий редюсер, який відповідає за весь стан Redux. Ми можемо написати кореневий редюсер так, щоб він просто викликав два інші редюсери і передавав їм необхідну частину стану та екшен. Це і є композиція редюсерів.

```jsx title="src/redux/reducer.js" showLineNumbers
// Код редюсерів tasksReducer та filtersReducer

export const rootReducer = (state = {}, action) => {
  // Повертаємо об'єкт стану
  return {
    // Обом редюсерам передаємо тільки частину стану, за яку вони відповідають.
    tasks: tasksReducer(state.tasks, action),
    filters: filtersReducer(state.filters, action),
  };
};
```

Щоб не створювати кореневий редюсер вручну, у бібліотеці Redux є функція `combineReducers`, яка робить те саме, але коротше.

```jsx title="src/redux/reducer.js" showLineNumbers
// Імпортуємо функцію композиції редюсерів
import { combineReducers } from "redux";

// Код редюсерів tasksReducer та filtersReducer
export const rootReducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
});
```

## Планувальник завдань

Розберіть повний живий приклад нашої програми.

<CP src='https://codesandbox.io/embed/goit-react-textbook-lesson-11-redux-actions-forked-efuiqz?fontsize=14&hidenavigation=1&theme=dark' />
