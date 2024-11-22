---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Встановлення

Redux Toolkit встановлюється як стандартний NPM пакет.

```bash
npm install @reduxjs/toolkit
```

Використовуючи Redux Toolkit, немає необхідності додавати в проект пакет `redux`, крім випадків, коли вам необхідна функція `combineReducers()`. Достатньо встановити `@reduxjs/toolkit` для написання логіки Redux та `react-redux` для зв'язку стора з компонентами.

```bash
npm install @reduxjs/toolkit react-redux
```

Якщо ви ініціалізуєте створення стартових файлів програми, використовуючи Create React App, без попередньо заготовленого шаблону проекту, як наприклад для домашніх робіт, у такому разі варто використовувати офіційний шаблон. Для цього команді `npx create-react-app` потрібно передати прапор `--template` зі значенням `redux`.

```bash
npx create-react-app my-app --template redux
```
