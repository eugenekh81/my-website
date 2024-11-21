---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Стор (store)

Об'єкт, який містить повний стан програми, методи доступу до стану та відправлення екшенів. У програмі може бути лише один стор. Для створення стора є функція `createStore()`, яка приймає кілька параметрів та повертає новий об'єкт стора.

```js
createStore(reducer, preloadedState, enhancer)
```

- `reducer` - функція із логікою зміни стану Redux. Обов'язковий параметр
- `preloadedState` - початковий стан програми. Це має бути об'єкт тієї ж форми, що й, як мінімум, частина стану. Необов'язковий параметр
- `enhancer` - функція розширення можливостей стору. Необов'язковий параметр.

```jsx title="src/redux/store.js" showLineNumbers
import { createStore } from "redux";

// Початкове значення стану Redux для кореневого редюсера,
// якщо не передати параметр preloadedState.
const initialState = {
  tasks: [
    { id: 0, text: "Learn HTML and CSS", completed: true },
    { id: 1, text: "Get good at JavaScript", completed: true },
    { id: 2, text: "Master React", completed: false },
    { id: 3, text: "Discover Redux", completed: false },
    { id: 4, text: "Build amazing apps", completed: false },
  ],
  filters: {
    status: "all",
  },
};

// Поки що використовуємо редюсер який
// тільки повертає отриманий стан
const rootReducer = (state = initialState, action) => {
  return state;
};

export const store = createStore(rootReducer);
```

Після створення стору необхідно зв'язати його з компонентами React, щоб вони могли отримувати доступ до стору та його методів. Для цього у бібліотеці React Redux є компонент [Provider](https://react-redux.js.org/api/provider), котрий чекає однойменний пропс `store`. Для того щоб будь-який компонент у додатку міг використовувати стор, обертаємо `Provider` все дерево компонентів.

```jsx title="src/index.js" showLineNumbers
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```
