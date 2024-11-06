---
custom_edit_url: null
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Директива `@mixin`

Міксіни або домішки, як і плейсхолдери, дозволяють створювати готові набори властивостей, але з різними значеннями, залежно від отриманих аргументів під час виклику міксіна.

```css
@mixin ім'я (параметри) {
  // Властивості
}
```

Міксін оголошується за допомогою директиви `@mixin` та його імені. Далі можуть йти необов'язкові параметри в круглих дужках (самі дужки обов'язкові), а у фігурних - набір властивостей і значень.

Створимо міксін для встановлення тільки верхньої і нижньої рамки елемента, і зробимо колір рамки значенням, що може налаштовуватися. Параметри міксіна - це локальні SASS-змінні.

```css
@mixin bordered($color) {
  border-top: 1px solid $color;
  border-bottom: 1px solid $color;
}
```

Додати стилі міксіна до селектора можна за допомогою директиви `@include`, після якої викликаємо міксін і передаємо значення для властивостей, що налаштовуються.

Після компіляції будуть тільки правила для селекторів `.section` і `.header` з доданим кодом з міксіна, коду оголошення самого міксіна не буде.

<Tabs>
  <TabItem value="scss" label="SCSS" default>

    ```css title="main.scss"
      @mixin bordered($color) {
        border-top: 1px solid $color;
        border-bottom: 1px solid $color;
      }

      .section {
        /* highlight-start */
        @include bordered(tomato);
        /* highlight-end */
        padding: 20px;
      }

      .header {
        /* highlight-start */
        @include bordered(green);
        /* highlight-end */
        min-height: 80px;
      }
    ```

  </TabItem>

  <TabItem value="css" label="CSS">

  ```css title="main.css"
    .section {
      /* highlight-start */
      border-top: 1px solid tomato;
      border-bottom: 1px solid tomato;
      /* highlight-end */
      padding: 20px;
    }

    .header {
      /* highlight-start */
      border-top: 1px solid green;
      border-bottom: 1px solid green;
      /* highlight-end */
      min-height: 80px;
    }

  ```

  </TabItem>

</Tabs>

:::warning[Увага]
Міксін відрізняється від плейсхолдера тим, що властивості дублюються в кожен селектор. Все тому, що значення властивостей міксіна можуть бути різними, залежно від переданих аргументів під час виклику `@include міксін(аргументи)`. У той час як властивості та їх значення в плейсхолдері завжди однакові.
:::
