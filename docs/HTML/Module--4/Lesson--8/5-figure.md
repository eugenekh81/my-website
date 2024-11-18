---
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Оформлення фігур

В CSS можна динамічно змінювати деякі характеристики вбудованого векторного зображення або іконки з SVG-спрайту, наприклад заливання, колір або тип обведення. Значення можна задавати як атрибутами SVG-фігур, так і однойменними CSS-властивостями. На практиці для оформлення фігур використовують не атрибути, а CSS-код, оскільки його простіше підтримувати і змінювати.

## Властивість `fill`

Управляє кольором заливання. Колір можна задавати в будь-якому зручному форматі. Якщо колір заливання не вказаний, фігура буде залита поточним кольором тексту, за замовчуванням чорним (`#000000`). Повністю прибрати заливання можна значенням `none`, в результаті вийде повністю прозора фігура.

```css
/* Встановлюємо колір заливання у спокійному стані. */
.icon {
  fill: #2a2a2a;
}

/* Змінюємо колір заливання при ховері. */
.icon:hover {
  fill: #ff6347;
}
```

<CodePenSnippet src='https://codepen.io/goit-academy/embed/LYbrxqp?height=265&theme-id=dark&default-tab=result' />

## Властивість `fill-opacity`

Управляє тільки прозорістю кольору заливання, а не всього кольору або елемента, тобто відрізняється від opacity або stroke-opacity. Наприклад, якщо у іконки буде задане червоне обведення, то на її колір ця властивість не вплине. Значення задається числом від `0` до `1`.

```css
.icon {
  fill: #2a2a2a;
  /* highlight-start */
  fill-opacity: 0.7;
  /* highlight-end */
}

/* fill-opacity також застосується до нового кольору при ховері. */
.icon:hover {
  fill: #03a9f4;
}
```

<CodePenSnippet src='https://codepen.io/goit-academy/embed/XWNYMrv?height=265&theme-id=dark&default-tab=result' />

## Властивість `stroke`

Встановлює колір обведення. За замовчуванням не має значення. Характеристики обведення, наприклад колір і товщина, задаються окремими властивостями.

```css
.icon {
  stroke: #f44336;
}
```

<CodePenSnippet src='https://codepen.io/goit-academy/embed/RwoJpxQ?height=265&theme-id=dark&default-tab=result' />

## Властивість `stroke-width`

Контролює товщину обведення. Значення за замовчуванням `1px`, тому для однопіксельного обведення достатньо вказати колір у властивості `stroke`. Якщо задана товщина обведення, але не заданий колір, вона не відобразиться.

```css
.icon {
  stroke: #f44336;
  /* highlight-start */
  stroke-width: 3px;
  /* highlight-end */
}
```

<CodePenSnippet src='https://codepen.io/goit-academy/embed/OJbEpaa?height=265&theme-id=dark&default-tab=result' />

## Властивість `stroke-opacity`

Управляє тільки прозорістю кольору обведення, а не всього кольору або елемента. Значення задається числом від `0` до `1`.

```css
.icon {
  stroke: #f44336;
  stroke-width: 3px;
  /* highlight-start */
  stroke-opacity: 0.7;
  /* highlight-end */
}
```

<CodePenSnippet src='https://codepen.io/goit-academy/embed/jOVKBJN?height=265&theme-id=dark&default-tab=result' />
