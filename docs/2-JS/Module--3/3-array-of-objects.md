---
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Масив об'єктів

Стандартний набір повсякденних завдань розробника містить маніпуляцію масивом однотипних об'єктів. Це означає, що всі об'єкти в масиві гарантовано матимуть однаковий набір властивостей, але з різними значеннями.

```js
const books = [
  {
    title: "The Last Kingdom",
    author: "Bernard Cornwell",
    rating: 8.38,
  },
  {
    title: "На березі спокійних вод",
    author: "Роберт Шеклі",
    rating: 8.51,
  },
  {
    title: "Сон смішної людини",
    author: "Федір Достоєвський",
    rating: 7.75,
  },
];
```

Для перебирання такого масиву використовується стандартний цикл `for...of`. Значення властивостей кожного об'єкта можна отримати, використовуючи синтаксис «через крапку», оскільки в кожному об'єкті набір властивостей та їх імена будуть однакові, відрізняються тільки значення.

```js
for (const book of books) {
  // Об'єкт книги
  console.log(book);
  // Назва
  console.log(book.title);
  // Автор
  console.log(book.author);
  // Рейтинг
  console.log(book.rating);
}
```

Наприклад, отримаємо список назв усіх книг в колекції `books`.

```js
const bookNames = [];

for (const book of books) {
  bookNames.push(book.title);
}

console.log(bookNames); // ["The Last Kingdom", "На березі спокійних вод", "Сон смішної людини"]
```

Дізнаємося середній рейтинг усієї нашої колекції. Для цього, додамо усі рейтинги, після чого поділимо це значення на кількість книг в колекції.

```js
let totalRating = 0;

for (const book of books) {
  totalRating += book.rating;
}

const averageRating = (totalRating / books.length).toFixed(1);
console.log(averageRating); // 8.2
```
