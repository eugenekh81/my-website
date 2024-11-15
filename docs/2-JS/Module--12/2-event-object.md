---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Об'єкт події

Щоб обробити подію - недостатньо знати про те, що це клік або натискання клавіші, можуть знадобитися деталі. Наприклад, поточне значення текстового поля, елемент, на якому відбулася подія, вбудовані методи та інші.

Кожна подія - це об'єкт, який містить інформацію про деталі події та автоматично передається першим аргументом в обробник події. Всі події відбуваються з базового класу Event.

```js
const handleClick = event => {
  console.log(event);
};

button.addEventListener("click", handleClick);
```

Параметр `event` - це і є об'єкт події, який автоматично передається першим аргументом під час виклику колбек-функції. Ми можемо називати його як завгодно, але, як правило, його оголошують як `e`, `evt` або `event`.

Деякі властивості об'єкта події:

- `event.type` - тип події.
- `event.currentTarget` - елемент, на якому виконується обробник події.

<CP src='https://codepen.io/goit-academy/embed/MWpXraG?height=265&theme-id=dark&default-tab=js,result' />

## Дії браузера за замовчуванням

Деякі події викликають дію браузера, вбудовану за замовчуванням як реакція на певний тип події. Наприклад, клік на посиланні ініціює перехід на нову адресу, зазначену в `href`, а відправлення форми перезавантажує сторінку. Найчастіше ця поведінка небажана і її необхідно скасувати.

Для скасування дії браузера за замовчуванням в об'єкта події є стандартний метод `preventDefault()`

<CP src='https://codepen.io/goit-academy/embed/wvJXprr?height=265&theme-id=dark&default-tab=js,result' />
