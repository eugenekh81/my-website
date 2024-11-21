---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Встановлення

Додамо до проекту бібліотеку [Redux](https://redux.js.org/) - набір функцій для створення стора (сховища, store), роботи зі станом програми (state) та відправлення екшенів (дій, actions).

```bash
npm install redux
```

Для використання React та Redux разом, необхідно додати до проекту бібліотеку [React Redux](https://react-redux.js.org/). Це набір компонентів та хуків зв'язуючих компонентів React та Redux стор (store).

```bash
npm install react-redux
```

:::info Redux vs Redux Toolkit
У матеріалах цього заняття ми познайомимося з основними концепціями бібліотеки Redux та обов'язково розберемо їх на живих прикладах. Але, надалі ми будемо використовувати Redux Toolkit - надбудову над базовими концепціями та конструкціями Redux, яка ґрунтується на кращих практиках, спрощує код пов'язаний з Redux і запобігає поширеним помилкам. Це офіційний рекомендований підхід до написання логіки Redux.
:::
