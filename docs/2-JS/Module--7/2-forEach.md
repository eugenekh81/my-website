---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CPN } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Метод `forEach`

Метод перебирання масиву, який використовується для заміни циклів `for...let` і `for...of` в роботі з колекцією даних.

```js
массив.forEach(function callback(element, index, array) {
  // Тіло колбек-функції
});
```

- Поелементо перебирає масив.
- Викликає колбек-функцію для кожного елемента масиву.
- Нічого не повертає.

Аргументи колбек-функції - це значення поточного елемента `element`, його індекс `index` і власне вихідний масив `array`. Можна оголошувати тільки необхідні параметри, найчастіше - це елемент, головне не забувати про їх порядок.

```js
const numbers = [5, 10, 15, 20, 25];

// Класичний for
for (let i = 0; i < numbers.length; i += 1) {
  console.log(`Індекс ${i}, значення ${numbers[i]}`);
}

// Метод перебирання forEach
numbers.forEach(function (number, index) {
  console.log(`Індекс ${index}, значення ${number}`);
});
```

Єдиним випадком, коли варто використовувати цикли `for...let` або `for...of` для перебирання масиву, - це задачі з перериванням виконання циклу. Перервати виконання методу `forEach` не можна, він завжди перебирає масив до кінця.
