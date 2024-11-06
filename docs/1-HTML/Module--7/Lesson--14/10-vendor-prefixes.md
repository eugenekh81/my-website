---
custom_edit_url: null
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Вендорні префікси

**Вендорні префікси** - це спеціальні приставки, що використовуються виробниками (вендорами) браузерів для експериментальних CSS-властивостей і значень, які ще не прийняті у стандарті, або не повністю реалізовані в браузері.

Список вендорних префіксів по браузерам:

- `-webkit-` - Chrome, Safari, Edge, нові версії Opera.
- `-moz-` - Firefox.
- `-o-` - Старі версії Opera.
- `-ms-` - Internet Explorer.

:::tip[Корисно]
Вручну прописувати їх не потрібно, для цього використовуються спеціальні інструменти, які автоматизують процес, наприклад SASS-компілятор з додатковими налаштуваннями. Для ознайомлення можна використовувати інтерактивну платформу **https://autoprefixer.github.io/**.
:::

Наприклад, наступний CSS-код буде працювати у більшості останніх версій сучасних браузерів:

```css
.example {
  display: flex;
  transition: all 0.5s;
  background: linear-gradient(to bottom, white, black);
}
```

Після обробки [**автопрефіксером**](https://autoprefixer.github.io/) отримуємо наступний код, який буде гарантовано працювати в останніх 4-х версіях всіх сучасних браузерів. Браузери, які підтримують нативні властивості та значення, проігнорують їх аналоги з вендорними префіксами, і навпаки:

```css
.example {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;

  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(white),
    to(black)
  );
  background: -o-linear-gradient(top, white, black);
  background: linear-gradient(to bottom, white, black);
}
```

:::info[Browserslist]
Потрібна кількість версій вибирається в інтерфейсі автопрефіксера у спеціальному форматі [**Browserslist**](https://github.com/browserslist/browserslist) - конфігурації, що описує версії браузерів, які повинен підтримувати код проекту. Всі сучасні інструменти, які будь-яким чином перетворюють код, орієнтуються на цю єдину для всього проекту конфігурацію.
:::
