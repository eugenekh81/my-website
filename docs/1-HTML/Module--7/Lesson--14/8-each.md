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

# Директива `@each`

Директива `@each` - це цикл, який виконає тіло директиви для кожного значення зі списку. Це дозволяє скоротити кількість коду, який необхідно написати вручну.

```css
@each <значення> in <список значень> {
  // Тіло директиви @each
}
```

Наприклад, необхідно створити серію селекторів для елементів з фоновими зображеннями. В CSS це виглядає наступним чином. Занадто багато повторюваного коду.

```css title="main.scss"
.dog-icon {
  background-image: url('../images/dog.png');
}

.cat-icon {
  background-image: url('../images/cat.png');
}

.bird-icon {
  background-image: url('../images/bird.png');
}

.turtle-icon {
  background-image: url('../images/turtle.png');
}

```

Використовуючи директиву `@each`, можемо досягнути такого самого результату, записавши наступний Sass-код, який буде скомпільований в CSS з попереднього прикладу.

```css title="main.scss"
@each $animal in dog, cat, bird, turtle {
  .#{$animal}-icon {
    background-image: url('../images/#{$animal}.png');
  }
}
```

Директива `@each` встановлює `$animal` у кожне зі значень списку тварин і для кожного створює код, записаний в тілі директиви - CSS-правило з селектором класу і набором властивостей.

- `$animal` - локальна змінна, в яку будуть послідовно присвоюватися значення зі списку тварин. Ім'я змінної може бути довільним. Ми перебираємо список тварин, тому назвали animal - тварина.
- `dog`, `cat`, `bird`, `turtle` - список тварин, кожен елемент якого розділений пробілом з комою.

:::info[Інтерполяція]
Для того щоб підставити значення змінної `$animal`, необхідно використовувати інтерполяцію `#{$ім'я_змінної}`, оскільки ми створюємо рядки. Без інтерполяції ім'я змінної не буде замінено на її значення під час компіляції.
:::
