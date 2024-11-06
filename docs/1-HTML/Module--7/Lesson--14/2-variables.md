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

# Змінні

Змінні і операції над ними - це одна з найпростіших, і водночас потужних особливостей препроцесорів. Синтаксис оголошення змінної - знак `$` перед ім'ям та її значення після двокрапки.

<Tabs>
  <TabItem value="scss" label="SCSS" default>

```scss title="main.scss"
$primaryColor: #888;
$cardBorderRadius: 4px;

.product {
  background-color: $primaryColor;
  border-radius: $cardBorderRadius;
}
```

  </TabItem>

  <TabItem value="css" label="CSS">

    ```css title="main.css"
    .product {
      background-color: #888;
      border-radius: 4px;
    }

    ```

</TabItem>
</Tabs>

Імена змінних повинні бути описові, щоб за ім'ям було зрозуміло, що там зберігається. Змінна `$color-blue` має деяке значення (крім того, що вона вказує на синій колір), а ось `$color-accent`, `$color-primary` або `$color-background` показує роль цього кольору. Семантичні, описові імена змінних не вимагають перейменування, наприклад, у разі зміни палітри брендових кольорів компанії.

:::tip[Корисно]
Імена змінних можуть бути записані в kebab-case, snake_case або camelCase нотаціях. Головне, щоб у проекті використовувався тільки один з цих стилів для однорідності коду.
:::

## Область видимості

Змінні доступні тільки в межах того рівня вкладеності селекторів, на якому вони визначені. Тобто, якщо змінна оголошена в селекторі, вона доступна тільки в ньому. Змінна, яка оголошується за межами будь-яких селекторів, доступна глобально.

```css title="main.scss"
$primaryColor: red;

body {
  $primaryColor: blue;
  // Це зовсім інша змінна, хоча і з таким самим ім'ям,
  // і доступна вона тільки всередині body.
  background: $primaryColor;
}

p {
  color: $primaryColor;
  // Колір тексту параграфа буде червоний,
  // використовується глобальна змінна зі значенням red.
}
```

У разі, якщо в імені змінної допущена помилка або такої змінної немає в доступній області видимості, виникне помилка компіляції стилів.

```css title="main.scss"
$primaryColor: red;

body {
  $secondaryColor: blue;
  background: $primaryColor;
}

p {
  color: $primaryColor;
  background-color: $secondaryColor;
  // Виникне помилка компіляції стилів, тому що
  // змінна secondaryColor не доступна глобально.
  // Вона існує тільки в селекторі body. глобальна змінна зі значенням red.
}
```

:::danger[Помилка компіляції]
Якщо сталася помилка компіляції, необхідно її виправити, тоді виконається повторна компіляція і оновиться результуючий CSS-файл.
