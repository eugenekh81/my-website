---
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CPN } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Групування полів

Групування пов'язаних елементів робить форми зрозумілішими для користувачів. Це також допомагає користувачеві зосередитися на невеликих упорядкованих групах полів, а не намагатися зрозуміти всю форму відразу. Групування виконується як візуально в інтерфейсі, так і логічно в коді.

## Елементи `<fieldset>` і `<legend>`

Елемент `<fieldset>` - це контейнер для групування декількох пов'язаних елементів у формі, а вкладений `<legend>` виконує роль заголовка групи. Пов'язані радіо-кнопки і чекбокси завжди повинні бути згруповані, інші типи полів групуються у разі потреби.

<CPN src='https://codepen.io/goit-academy/embed/QWKVQGa?height=265&theme-id=dark&default-tab=html,result' />

## Групування з можливістю оформлення

Елементи `<fieldset>` і `<legend>` мають відмінну семантику, але обмежені можливості оформлення. Здебільшого для групування елементів форми використовується `<div>` з атрибутами доступності `role` і `aria-labelledby`.

```html
<div role="group" aria-labelledby="contact-details-head">
  <p id="contact-details-head">Enter your contact details</p>
  Related elements
</div>
```

- Атрибут `role="group"` вказує на те, що елементи всередині цього `<div>` є частиною групи.
- Атрибут `aria-labelledby="contact-details-head"` містить ідентифікатор елемента з описом групи.

<CPN src='https://codepen.io/goit-academy/embed/JjRapgG?height=265&theme-id=dark&default-tab=html,result' />
