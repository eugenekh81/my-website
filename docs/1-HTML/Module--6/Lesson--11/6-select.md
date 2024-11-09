---
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CPN } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Елемент `<select>`

Випадаюче меню - це альтернатива радіо-кнопкам, оскільки за замовчуванням дозволяє вибрати один з багатьох варіантів. Елемент `<select>` - це спливаюче меню з атрибутом `name`, що містить набір елементів `<option>` з атрибутом `value`.

Текст всередині елемента `<option>` відображається користувачеві, а значення атрибута `value` - це те, що буде використано під час відправлення форми.

<CPN src='https://codepen.io/goit-academy/embed/rNMZpLw?height=265&theme-id=dark&default-tab=html,result' />

:::tip[Корисно]
За замовчуванням вибраний перший елемент `<option>` зі списку. Це можна змінити, задавши необхідній опції атрибут-буль `selected`.
:::

## Групування опцій

Іноді потрібно розбити список на окремі групи, не пов'язані між собою. Для цих цілей існує тег `<optgroup>`. Щоб додати заголовок групи, використовується атрибут label.

<CPN src='https://codepen.io/goit-academy/embed/BaLOJRy?height=265&theme-id=dark&default-tab=html,result' />
