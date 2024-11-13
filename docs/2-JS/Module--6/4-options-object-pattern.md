---
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Патерн «Об'єкт параметрів»

Якщо функція приймає більше двох-трьох аргументів, дуже просто заплутатись, в якій послідовності і що передавати. В результаті виходить дуже неочевидний код в місці її виклику.

```js
function doStuffWithBook(title, numberOfPages, downloads, rating, public) {
  // Робимо щось з параметрами
  console.log(title);
  console.log(numberOfPages);
  // І так далі

// ❌ Що таке 736? Що таке 10283? Що таке true?
doStuffWithBook("The Last Kingdom", 736, 10283, 8.38, true);
```

Патерн «Об'єкт параметрів» допомагає вирішити цю проблему, замінюючи набір параметрів всього одним об'єктом з іменованими властивостями.

```js
function doStuffWithBook(book) {
  // Робимо щось з властивостями об'єкта
  console.log(book.title);
  console.log(book.numberOfPages);
  // І так далі
}
```

У такому випадку, під час її виклику передаємо один об'єкт з необхідними властивостями.

```js
// ✅ Все зрозуміло
doStuffWithBook({
  title: 'The Last Kingdom',
  numberOfPages: 736,
  downloads: 10283,
  rating: 8.38,
  isPublic: true,
});
```

Ще один плюс у тому, що можна деструктуризувати об'єкт в параметрі `book`. Це можна зробити в тілі функції.

```js
function doStuffWithBook(book) {
  const { title, numberOfPages, downloads, rating, isPublic } = book;

  console.log(title);
  console.log(numberOfPages);
  // І так далі
}
```

Або відразу в сигнатурі (підписі) функції - немає різниці.

```js
function doStuffWithBook({
  //  highlight-start
  title,
  numberOfPages,
  downloads,
  rating,
  isPublic,
  // highlight-end
}) {
  console.log(title);
  console.log(numberOfPages);
  // І так далі
}
```
