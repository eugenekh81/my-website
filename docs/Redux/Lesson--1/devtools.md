---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Redux DevTools

**Інструменти розробника** - це розширення браузера, яке додає зручний візуальний інтерфейс для налагодження змін стану програми та стеження за потоком даних у Redux, від відправлення дій до зміни стану.

Для початку необхідно додати розширення інструментів розробника у ваш браузер:

- [Chrome Web Store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)
- [Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/redux-devtools/nnkgneoiohoecpdiaponcejilbhhikei)

Далі встановлюємо бібліотеку, яка дозволить ініціалізувати логіку Redux DevTools та зв'язати її з розширенням в інструментах розробника.

```bash
npm install @redux-devtools/extension
```

Ми поки що не використовуємо жодних додаткових можливостей Redux, тому імпортуємо функцію `devToolsEnhancer` і використовуємо її при створенні стора, передавши її результат третім аргументом, замість початкового стану.

```jsx title="src/redux/store.js"
import { createStore } from "redux";
import { devToolsEnhancer } from "@redux-devtools/extension";

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

const rootReducer = (state = initialState, action) => {
  return state;
};

// Створюємо розширення стора, щоб додати інструменти розробника
const enhancer = devToolsEnhancer();

export const store = createStore(rootReducer, enhancer);
```

:::info Порядок аргументів
Якщо вам не потрібний початковий стан `preloadedState`, то значення `enhancer` передається другим аргументом. В іншому випадку - третім.
:::

Після запуску проекту командою `npm start`, у стандартних інструментах розробника з'явиться нова вкладка `Redux`, при переході на яку відкриються Redux DevTools зі списком відправлених екшенів зліва та детальною інформацією про стан та екшени праворуч.

<img src='/img/Redux/devtools.png' alt='Redux DevTools extension UI' />

