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

# Арифметичні операції

До того як в CSS з'явилася функція `calc()`, препроцесори були єдиним рішенням за потреби виконати арифметичні обчислення.

## Додавання і віднімання

На відміну від функції `calc()`, в препроцесорі не можна змішувати типи одиниць. При спробі виконати додавання або віднімання несумісних типів, виникне помилка. Пікселі до пікселів, слони до слонів.

```css title="main.scss"
.box {
  width: 960px + 10%; // Помилка!
  width: 960px + 30px; // 990px
  width: 960px + 30; // 990px
  width: 100% + 20%; // 120%

  width: 100% - 50px; // Помилка!
  width: 960px - 30px; // 930px
  width: 960px - 30; // 930px
  width: 100% - 20%; // 80%
}
```

Справа в тому, що препроцесор не знає наперед, скільки буде `100%` або `5em` у пікселях. Значення відносних одиниць в пікселях можна дізнатися тільки в момент рендеру HTML-сторінки. Тому для таких обчислень необхідно використовувати нативну функцію calc().

```css title="main.scss"
.box {
  width: calc(100% - 20px);
  width: calc(5em + 20px);
}
```

## Множення

Виконується аналогічно функції `calc()` в CSS, за винятком того, що не можна множити несумісні типи. Також не можна множити слонів на слонів, можна тільки слонів на множник.

```css title="main.scss"
.box {
  width: 50px * 50px; // Помилка!
  width: 50% * 5%; // Помилка!

  width: 50px * 2; // 100px
  width: 10px * 2 + 50px; // 70px
  width: 5 * (5px + 15px); // 100px
}
```

## Ділення

Ділення в препроцесорі виконується у трьох випадках.

```css title="main.scss"
$value: 50px;

.box {
  // 1 - значення зберігається у змінній.
  width: $value / 5; // 10

  // 2 - значення, взяті в круглі дужки.
  width: (100px / 5); // 20px

  // 3 - значення використовується як частина іншого виразу.
  width: 100px / 5px + 10px; // 30px
}
```

## Змінні в операціях

Якщо в арифметичній операції використовується валідне значення змінної, не буде жодних проблем.

<Tabs>
  <TabItem value="scss" label="SCSS" default>

    ```css title="main.scss"
      $gridItemMargin: 20px;

      .box {
        margin: $gridItemMargin * 2;
      }
    ```

  </TabItem>

  <TabItem value="css" label="CSS">

  ```css title="main.css"
    .box {
      margin: 40px;
    }
  ```

  </TabItem>

</Tabs>

Але у разі, якщо SASS-змінна використовується в функції `calc()`, під час компіляції її ім'я не замінюється на значення.

<Tabs>
  <TabItem value="scss" label="SCSS" default>

    ```css title="main.scss"
      $gridItemMargin: 20px;

      .box {
        margin: calc($gridItemMargin * 2);
      }
    ```

  </TabItem>

  <TabItem value="css" label="CSS">

  ```css title="main.css"
    .box {
      margin: calc($gridItemMargin * 2);
    }
  ```

  </TabItem>

</Tabs>

У таких випадках необхідно робити інтерполяцію значення змінної, використовуючи спеціальну конструкцію `#{$ім'я_змінної}`.

<Tabs>
  <TabItem value="scss" label="SCSS" default>

    ```css title="main.scss"
      $gridItemMargin: 20px;

      .box {
        margin: calc(#{$gridItemMargin} * 2);
      }
    ```

  </TabItem>

  <TabItem value="css" label="CSS">

  ```css title="main.css"
    .box {
      margin: calc(20px * 2);
    }
  ```

  </TabItem>

</Tabs>
