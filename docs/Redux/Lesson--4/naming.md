---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Найменування

До цього моменту ми не замислювалися про імена селекторів. Тим не менш, один з пунктів офіційного [`посібника зі стилю коду Redux`](https://redux.js.org/style-guide), містить інформацію про найкращі практики іменування селекторів. Рекомендується починати імена функцій селекторів приставкою `select`, після якої йде опис обраного значення.

Наразі файл із селекторами виглядає наступним чином. Ім'я кожного селектора ми починали з приставки `get`. У цьому немає нічого поганого, головне однорідність коду в проекті.

```jsx title="src/redux/selectors.js" showLineNumbers
export const getTasks = state => state.tasks.items;

export const getIsLoading = state => state.tasks.isLoading;

export const getError = state => state.tasks.error;

export const getStatusFilter = state => state.filters.status;
```

Тим не менш, слідуватимемо кращим практикам з керівництва за стилем коду та замінимо префікс на select.

```jsx title="src/redux/selectors.js" showLineNumbers
export const selectTasks = state => state.tasks.items;

export const selectIsLoading = state => state.tasks.isLoading;

export const selectError = state => state.tasks.error;

export const selectStatusFilter = state => state.filters.status;
```

Після зміни імен селекторів потрібно оновити код імпорту у файлах компонентів.

```jsx
//=============== Before ========================
import {
  getTasks,
  getIsLoading,
  getError,
  getStatusFilter,
} from "redux/selectors";

//=============== After ========================
import {
  selectTasks,
  selectIsLoading,
  selectError,
  selectStatusFilter,
} from "redux/selectors";
```
