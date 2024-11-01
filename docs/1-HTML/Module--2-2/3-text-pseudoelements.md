---
custom_edit_url: null
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Псевдоелементи тексту

## Псевдоелемент `::first-letter`

Управляє стилем першого символу в тексті елемента, до якого додається. До цього псевдоелементу можна застосувати тільки властивості оформлення шрифту, кольору, фону, а також геометрії елемента.

```css
елемент::first-letter {
  /* Будь-які стилі*/
}
```

Наприклад, можна виділити перші літери кожного абзацу вірша.

```html
<pre>
  Життя - це посмішка уранці,
  Це фотографія у рамці,
  Життя - це посмішка крізь сльози,
  Життя - це сонце і морози!
</pre>

<pre>
  Життя - це квіти навесні,
  Життя - це жарти і пісні.
  Життя - це кайф, як не крути,
  Його нам варто перейти!
</pre>

<pre>
  Життя - гуляти під дощем,
  Бути з заплаканим лицем.
  Життя - в собі знайти все ж сили,
  Щоб просто жити...мати крила!
</pre>
```

Додамо стилі для псевдоелемента `::first-letter` тегу `pre`. Змінимо шрифт, розмір шрифту і колір.

```css
pre {
  font-family: 'Arial', 'Helvetica', sans-serif;
  color: #2a2a2a;
  font-size: 16px;
}

/* highlight-start */
pre::first-letter {
  font-family: 'Tahoma', serif;
  font-size: 32px;
  color: #f44336;
}
/* highlight-end */
```

## Псевдоелемент `::selection`

Управляє стилем виділення тексту елемента, перевизначаючи стандартні значення з таблиці стилів браузера. В оформленні можна використовувати тільки властивості `color` і `background-color`. Виділіть мишкою частину тексту прикладу.

<CodePenSnippet src='https://codepen.io/goit-academy/embed/XWdJvXL?height=265&theme-id=default&default-tab=css,result' />
