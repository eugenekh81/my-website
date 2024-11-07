---
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Директива `@extend`

Директива `@extend` використовується для наслідування (розширення) вже існуючих стилів. Застосуємо її, щоб створити компонент кнопки з декількома станами.

<Tabs>
  <TabItem value="scss" label="SCSS" default>

    ```css title="main.scss"
    .button {
      display: inline-flex;
      border-radius: 3px;
      font-size: 16px;
      padding: 10px 20px;
      color: white;
      background-color: gray;
    }

    .button-success {
      /* highlight-start */
      @extend .button;
      /* highlight-end */
      background-color: green;
    }

    .button-error {
      /* highlight-start */
      @extend .button;
      /* highlight-end */
      background-color: red;
    }
    ```

  </TabItem>

  <TabItem value="css" label="CSS">

```css title="main.css"
/* highlight-start */
.button,
.button-error,
.button-success {
  /* highlight-end */
  display: inline-flex;
  border-radius: 3px;
  font-size: 16px;
  padding: 10px 20px;
  color: white;
  background-color: gray;
}

.button-success {
  background-color: green;
}

.button-error {
  background-color: red;
}
```

  </TabItem>

</Tabs>

Розширення (наслідування) не зробить копію стилів для кожного селектора, а грамотно додасть потрібні селектори у перелік до правила з наслідуваними стилями.

## Шаблони (плейсхолдери)

Але що, якщо ми хочемо розширити набір стилів, для якого не потрібний базовий селектор? Наприклад, якщо не потрібний селектор `.button` з попереднього прикладу, адже сам по собі він нічого не робить і не буде використаний в HTML.

Для таких випадків існує `placeholder` (плейсхолдер, заповнювач місця, шаблон) - довільне ім'я селектора з обов'язковим символом `%` на початку, наприклад `%button`.

<Tabs>
  <TabItem value="scss" label="SCSS" default>

    ```css title="main.scss"
    /* highlight-start */
    %button {
    /* highlight-end */
      display: inline-flex;
      border-radius: 3px;
      font-size: 16px;
      padding: 10px 20px;
      color: white;
      background-color: gray;
    }

    .button-success {
      /* highlight-start */
      @extend %button;
      /* highlight-end */
      background-color: green;
    }

    .button-error {
      /* highlight-start */
      @extend %button;
      /* highlight-end */
      background-color: red;
    }
    ```

  </TabItem>

  <TabItem value="css" label="CSS">

```css title="main.css"
/* highlight-start */
.button-error,
.button-success {
  /* highlight-end */
  display: inline-flex;
  border-radius: 3px;
  font-size: 16px;
  padding: 10px 20px;
  color: white;
  background-color: gray;
}

.button-success {
  background-color: green;
}

.button-error {
  background-color: red;
}
```

  </TabItem>

</Tabs>

Після компіляції будуть доступні селектори `.button-success` і `.button-error`, прив'язані до правила шаблону, а самого імені шаблону в CSS не буде.
