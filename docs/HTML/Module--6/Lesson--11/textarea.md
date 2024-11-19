---
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CPN } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Елемент `<textarea>`

Створює багаторядкове текстове поле для введення великої кількості тексту. Наприклад, для зворотного зв'язку, коментаря, поста у соцмережах, уточнення деталей замовлення тощо.

<CPN src='https://codepen.io/goit-academy/embed/NWRLrKO?height=265&theme-id=dark&default-tab=html,result' />

Атрибут `rows` встановлює кількість рядків (висоту), а `cols` - стовпчиків (ширину). На практиці вказується тільки `rows`, а ширина елементу контролюється за допомогою `CSS`.

За замовчуванням елемент `<textarea>` можна розтягувати за горизонталлю і вертикаллю. Для того щоб контролювати можливість зміни розміру користувачем, в CSS є властивість `resize`.

```
resize: both | horizontal | vertical | none
```
