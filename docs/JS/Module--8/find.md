---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CPN } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Метод `find()`

## Метод find()

Якщо метод `filter(callback)` використовується для пошуку всіх елементів, що задовольняють умову, то метод `find(callback)` дозволяє знайти і повернути перший відповідний елемент, після чого перебирання масиву припиняється. Тобто він шукає до першого збігу.

```js
масив.find((element, index, array) => {
  // Тіло колбек-функції
});
```

- Не змінює оригінальний масив.
- Поелементо перебирає оригінальний масив.
- Повертає перший елемент, що задовольняє умову, тобто коли колбек повертає `true`.
- Якщо жоден елемент не задовольнив умову, тобто для всіх елементів колбек повернув `false`, метод повертає `undefined`.

Метод `find()` використовується для одного завдання - пошуку елемента за унікальним значенням властивості. Наприклад, пошук користувача за поштою, автомобіля - за серійним номером, книги - за назвою тощо.

```js
const colorPickerOptions = [
  { label: 'red', color: '#F44336' },
  { label: 'green', color: '#4CAF50' },
  { label: 'blue', color: '#2196F3' },
  { label: 'pink', color: '#E91E63' },
  { label: 'indigo', color: '#3F51B5' },
];

colorPickerOptions.find((option) => option.label === 'blue'); // { label: 'blue', color: '#2196F3' }
colorPickerOptions.find((option) => option.label === 'pink'); // { label: 'pink', color: '#E91E63' }
colorPickerOptions.find((option) => option.label === 'white'); // undefined
```
