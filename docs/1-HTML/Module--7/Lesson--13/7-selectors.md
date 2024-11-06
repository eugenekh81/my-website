---
custom_edit_url: null
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Селектори

Методологія BEM забороняє використання селекторів тегів, ідентифікаторів або комбінованих селекторів на зразок `div.class1.class2`. Стилі блоків, елементів і модифікаторів описуються як прості селектори класу. Прості селектори захищають від проблем зі специфічністю.

```
.card {}
.card__title {}
.card__excerpt {}
.card__link {}
```

Проте, іноді цього не достатньо, тому методологія допускає використання вкладених селекторів. Вкладеність доречна, якщо необхідно змінити стилі елемента, залежно від модифікатора або стану блоку або іншого елемента цього блоку.

У прикладі, вкладені селектори `.card:hover .card__link` і `.card:hover .card__link::before` необхідні для зміни стилів посилання і запуску анімації іконки при ховері по картці.

<CodePenSnippet src='https://codepen.io/goit-academy/embed/abNYGdN?height=265&theme-id=default&default-tab=result' />
