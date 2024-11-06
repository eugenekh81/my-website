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

# Вкладені правила

Подібно до вкладеності тегів в HTML, в SASS можна вкладати CSS-селектори. це одна з найбільш корисних можливостей, яка також часто неправильно використовується. Вкладеність дозволяє робити одні оголошення правил всередині інших. Нижче наведений CSS і SCSS код оформлення секції із заголовком і абзацом.

<Tabs>
  <TabItem value="css" label="CSS">

  ```css title="main.css"
    .section {
      width: 100%;
    }

    .section .title {
      color: red;
    }

    .section .text {
      font-size: 14px;
    }
  ```

  </TabItem>
  <TabItem value="scss" label="SCSS" default>

    ```css title="main.scss"
      .section {
        width: 100%;

        .title {
          color: red;
        }

        .text {
          font-size: 14px;
        }
      }
    ```

  </TabItem>
</Tabs>

Синтаксис SCSS виглядає чистішим і менше повторюється. Після компіляції у стандартний CSS, ми отримаємо код як в `main.css`. Але в процесі розробки писати код буде зручніше.

## Конкатенація селекторів

Символ `&` (амперсанд) дозволяє вказати, в яке місце необхідно підставити батьківський селектор. Запишемо імена класів з попереднього прикладу, використовуючи BEM-нотацію в CSS і SCSS.

<Tabs>
  <TabItem value="css" label="CSS">

  ```css title="main.css"
    .section {
      width: 100%;
    }

    .section__title {
      color: red;
    }

    .section__text {
      font-size: 14px;
    }
  ```

  </TabItem>
  <TabItem value="scss" label="SCSS" default>

    ```css title="main.scss"
      .section {
        width: 100%;

        &__title {
          color: red;
        }

        &__text {
          font-size: 14px;
        }
      }
    ```

  </TabItem>
</Tabs>

Розглянемо ще один приклад - оформлення посилання зі станами ховеру і фокусу.

<Tabs>
  <TabItem value="css" label="CSS">

  ```css title="main.css"
    .link {
      color: black;
    }

    .link:hover {
      color: red;
    }

    .link:focus {
      color: red;
    }
  ```

  </TabItem>
  <TabItem value="scss" label="SCSS" default>

    ```css title="main.scss"
      .link {
        color: black;

        &:hover {
          color: red;
        }

        &:focus {
          color: red;
        }
      }
    ```

  </TabItem>
</Tabs>

Що робити, якщо селектори для `:hover` і :`focus` в CSS згруповані? Без проблем групуємо в SASS, не забуваючи поставити амперсанд (`&`) там, де необхідно підставити батьківський селектор.

<Tabs>
  <TabItem value="css" label="CSS">

  ```css title="main.css"
    .link {
      color: black;

      &:hover,
      &:focus {
        color: red;
      }
    }
  ```

  </TabItem>
  <TabItem value="scss" label="SCSS" default>

    ```css title="main.scss"
      .link {
        color: black;
      }

      .link:hover,
      .link:focus {
        color: red;
      }
    ```

  </TabItem>
</Tabs>

## Правила вкладеності


кладеність селекторів - це чудовий спосіб заощадити час і спростити підтримку, але надмірна вкладеність гарантовано викличе проблеми з читабельністю коду.

Уявімо наступну розмітку кнопки з іконкою і текстом.

```html
<button class="button" type="button">
  <svg class="icon"></svg>
  <span class="label">Замовити</span>
</button>
```

Запишемо якісь стилі в CSS і SCSS, і зробимо їх спеціально трохи складнішими, ніж потрібно.

<Tabs>
  <TabItem value="css" label="CSS">

  ```css title="main.css"
    .button {
      color: red;
    }

    .button:hover {
      color: blue;
    }

    .button__icon {
      width: 20px;
      height: 20px;
    }

    .button__icon:hover {
      width: 50px;
      height: 50px;
    }

    .button__label {
      font-size: 16px;
    }

    .button:hover .button__icon {
      background-color: teal;
    }

    .button:hover .button__label {
      font-size: 20px;
    }
  ```

  </TabItem>
  <TabItem value="scss" label="SCSS" default>

    ```css title="main.scss"
     .button {
      color: red;

      &:hover {
        color: blue;

        .button__icon {
          background-color: teal;
        }

        .button__label {
          font-size: 20px;
        }
      }

      &__icon {
        width: 20px;
        height: 20px;

        &:hover {
          width: 50px;
          height: 50px;
        }
      }

      &__label {
        font-size: 16px;
      }
    }
    ```

  </TabItem>
</Tabs>

Прочитати такий SCSS-код швидко досить складно, візуально втрачається зв'язок з батьківським селектором і, замість того щоб розбирати CSS-код, доводиться вчитуватися у синтаксис вкладеностей. Тобто, використовуючи можливості препроцесора, ми зробили гірше, більше - не завжди краще.

Створюйте нове правило для кожного блоку або елемента, а вкладеності і конкатенації використовуйте для оформлення станів і BEM-модифікаторів. Тобто користуйтеся здоровим глуздом, і робіть так як зручно, тому що SCSS-код пишеться для зручності розробника.

<Tabs>
  <TabItem value="css" label="CSS">

  ```css title="main.css"
    .button {
      color: red;
    }

    .button:hover {
      color: blue;
    }

    .button__icon {
      width: 20px;
      height: 20px;
    }

    .button__icon:hover {
      width: 50px;
      height: 50px;
    }

    .button__label {
      font-size: 16px;
    }

    .button:hover .button__icon {
      background-color: teal;
    }

    .button:hover .button__label {
      font-size: 20px;
    }
  ```

  </TabItem>
  <TabItem value="scss" label="SCSS" default>

    ```css title="main.scss"
     // Правило для всієї кнопки
    .button {
      color: red;

      &:hover {
        color: blue;
      }
    }

    // Правило для іконки
    .button__icon {
      width: 20px;
      height: 20px;

      &:hover {
        width: 50px;
        height: 50px;
      }

      .button:hover & {
        background-color: teal;
      }
    }

    // Правило для тексту
    .button__label {
      font-size: 16px;

      .button:hover & {
        font-size: 20px;
      }
    }
    ```

  </TabItem>
</Tabs>
