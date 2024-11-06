---
custom_edit_url: null
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Блок

Функціонально незалежний компонент, який може використовуватися повторно. Блок можна поставити в іншу частину сторінки або проекту, і він буде мати сенс. Наприклад, блоком може бути галерея, стаття, шапка, форма, віджет сайдбара, сам сайдбар, навігація тощо.

Ім'я класу блоку:

- **Може** складатися тільки з латинських літер, цифр і тире.
- **Повинно** відповідати на питання «Що це?» - widget, gallery, navigation, post.
- **Не повинно** відповідати на питання «Як виглядає?» - red-text, round-button тощо.

```html
<!-- В HTML і CSS, блок - це просто базовий клас компонента -->

<a class="logo"></a>

<p class="alert"></p>

<ul class="gallery"></ul>

<article class="product"></article>

<section class="section"></section>

<header class="page-header"></header>
```

## Вкладеність

Блоки можна і потрібно вкладати один в одного, обмежень немає, крім здорового глузду і специфікації HTML, оскільки вони представлені тегами. Вкладені блоки не мають жодних додаткових особливостей, пріоритету або ієрархії.

```html
<!-- Блок page-header -->
<header class="page-header">
  <!-- Вкладений блок logo -->
  <a href="" class="logo"></a>

  <!-- Вкладений блок navigation -->
  <ul class="navigation">
    ...
  </ul>
</header>
```
