---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CPN } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Метод `findIndex()`

Метод `findIndex(callback)` - це сучасна заміна методу `indexOf()`. Дозволяє виконувати пошук за складнішими умовами, ніж просто рівність. Використовується як для пошуку у масиві примітивів, так і в масиві об'єктів.

```js
масив.findIndex((element, index, array) => {
  // Тіло колбек-функції
});
```

- Не змінює оригінальний масив.
- Поелементо перебирає оригінальний масив.
- Повертає індекс першого елемента, що задовольняє умову, тобто, коли колбек повертає `true`.
- Якщо жоден елемент не задовольняє умову, тобто для всіх елементів колбек повернув `false`, метод повертає `-1`.

```js
const colorPickerOptions = [
  { label: 'red', color: '#F44336' },
  { label: 'green', color: '#4CAF50' },
  { label: 'blue', color: '#2196F3' },
  { label: 'pink', color: '#E91E63' },
  { label: 'indigo', color: '#3F51B5' },
];

colorPickerOptions.findIndex((option) => option.label === 'blue'); // 2
colorPickerOptions.findIndex((option) => option.label === 'pink'); // 3
colorPickerOptions.findIndex((option) => option.label === 'white'); // -1
```
