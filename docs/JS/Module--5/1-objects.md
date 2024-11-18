---
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Об'єкти

Об'єкти дозволяють описати і згрупувати характеристики певної сутності - користувача, книги, продукту в магазині, чого завгодно. Об'єкти ще називають словниками, тобто вони містять терміни (властивості) та їх визначення (значення).

## Створення об'єкта

Для оголошення використовуються фігурні дужки `{}` - літерал об'єкта.

```js
const book = {
  title: 'The Last Kingdom',
  author: 'Bernard Cornwell',
  genres: ['historical prose', 'adventure'],
  isPublic: true,
  rating: 8.38,
};
```

Під час створення об'єкта можна додати властивості, кожна з яких описується парами **`ключ:значення`**. **Ключ** ще називають ім'ям властивості і **це завжди рядок**. Значенням властивості можуть бути будь-які типи: `примітиви`, `масиви`, `об'єкти`, `булі`, `функції` тощо. Властивості розділяються комою.

Правила іменування ключів прості:

- Якщо ключ взятий в лапки, то це може бути довільний рядок.
- Якщо лапок немає, то є обмеження - ім'я без пробілів, починається літерою або символами `_` і `$`.

## Вкладені властивості

Значенням властивості може бути інший об'єкт, для того, щоб зберігати вкладені і згруповані дані. Наприклад, статистика користувача соціальної мережі складається з кількості відстежувачів, переглядів і лайків, і зберігати ці дані найзручніше у вигляді об'єкта. Те саме з місцем розташування - окремо країна і місто.

```js
const user = {
  name: 'Jacques Gluke',
  tag: 'jgluke',
  location: {
    country: 'Jamaica',
    city: 'Ocho Rios',
  },
  stats: {
    followers: 5603,
    views: 4827,
    likes: 1308,
  },
};
```

У майбутньому це можна буде використовувати для пошуку користувачів за країною, містом, мінімальною або максимальною кількістю відстежувачів тощо.

## Звернення до властивостей через крапку

Перший спосіб отримати доступ до властивості об'єкта - це синтаксис `об'єкт.ім'я_властивості`. Синтаксис «через крапку» використовується у більшості випадків і доречний тоді, коли ми заздалегідь знаємо ім'я (ключ) властивості, до якої хочемо отримати доступ.

- На місці звернення буде повернуто значення властивості з таким ім'ям.
- Якщо об'єкт не містить властивості з таким ім'ям, на місці звернення повернеться `undefined`.

```js
const book = {
  title: 'The Last Kingdom',
  author: 'Bernard Cornwell',
  genres: ['historical prose', 'adventure'],
  isPublic: true,
  rating: 8.38,
};

const bookTitle = book.title;
console.log(bookTitle); // 'The Last Kingdom'

const bookGenres = book.genres;
console.log(bookGenres); // ['historical prose', 'adventurs']

const bookPrice = book.price;
console.log(bookPrice); // undefined
```

## Звернення до вкладених властивостей

Для доступу до вкладених властивостей використовується ланцюжок звернень «через крапку». Наприклад, якщо необхідно отримати значення країни користувача, записуємо `user.location.country`, де `user.location` - це звернення (шлях) до об'єкта у властивості `location`, а `user.locaton.country` звернення до властивості `country` у цьому об'єкті. Тобто «крапка» вказує наступну вкладеність:

```js
const user = {
  name: 'Jacques Gluke',
  tag: 'jgluke',
  location: {
    country: 'Jamaica',
    city: 'Ocho Rios',
  },
  hobbies: ['swiming', 'music', 'sci-fi'],
};

const location = user.location;
console.log(location); // Об'єкт location

const country = user.location.country;
console.log(country); // 'Jamaica'
```

Якщо значення властивості - це масив, тоді у нашому прикладі `user.hobbies` - звернення до цього масиву. Далі можна отримати доступ до його елементів через квадратні дужки та індекс, або використовувати властивості і методи.

```js
const hobbies = user.hobbies;
console.log(hobbies); // ['swiming', 'music', 'sci-fi']

const firstHobby = user.hobbies[0];
console.log(firstHobby); // 'swiming'

const numberOfHobbies = user.hobbies.length;
console.log(numberOfHobbies); // 3
```

## Звернення до властивостей через квадратні дужки

Другий спосіб отримати доступ до властивості об'єкта - це синтаксис `об'єкт["ім'я властивості"]`. Схоже на звернення до елемента масиву з різницею у тому, що в дужках вказується не індекс елемента, а ім'я властивості у вигляді рядка.

Синтаксис «квадратних дужок» використовується значно рідше, у разі, коли ім'я властивості заздалегідь невідоме або зберігається у змінній, наприклад, як значення параметра функції.

- На місці звернення буде повернуте значення властивості з таким ім'ям.
- Якщо в об'єкті відсутня властивість з таким ім'ям, на місці звернення повернеться `undefined`.

```js
const book = {
  title: 'The Last Kingdom',
  author: 'Bernard Cornwell',
  genres: ['historical prose', 'adventure'],
  isPublic: true,
  rating: 8.38,
};

const bookTitle = book['title'];
console.log(bookTitle); // 'The Last Kingdom'

const bookGenres = book['genres'];
console.log(bookGenres); // ['historical prose', 'adventurs']

const propKey = 'author';
const bookAuthor = book[propKey];
console.log(bookAuthor); // 'Bernard Cornwell'
```

## Зміна значення властивості

Після створення об'єкта, значення його властивостей можна змінити. Для цього необхідно звернутися до них за ім'ям, наприклад, «через крапку», і присвоїти нове значення.

```js
const book = {
  title: 'The Last Kingdom',
  author: 'Bernard Cornwell',
  genres: ['historical prose', 'adventure'],
  isPublic: true,
  rating: 8.38,
};

book.rating = 9;
book.isPublic = false;
book.genres.push('драма');

console.log(book.rating); // 9
console.log(book.isPublic); // false
console.log(book.genres); // ['historical prose', 'adventures', 'драма']
```

## Додавання властивостей

Операція додавання нової властивості після створення об'єкта нічим не відрізняється від зміни значення вже існуючої властивості. Якщо під час запису значення за ім'ям, така властивість в об'єкті відсутня, вона буде створена.

```js
const book = {
  title: 'The Last Kingdom',
  author: 'Bernard Cornwell',
  genres: ['historical prose', 'adventure'],
  isPublic: true,
  rating: 8.38,
};

book.pageCount = 836;
book.originalLanguage = 'en';
book.translations = ['ua', 'ru'];

console.log(book.pageCount); // 836
console.log(book.originalLanguage); // 'en'
console.log(book.translations); // ['ua', 'ru']
```

## Короткі властивості

Іноді, під час створення об'єкта значення властивості необхідно взяти зі змінної або параметра функції з таким самим ім'ям, що і у властивості.

Синтаксис у наступному прикладі занадто громіздкий, тому що доводиться дублювати ім'я властивості та ім'я змінної, в якій зберігається потрібне значення.

```js
const name = 'Генрі Сибола';
const age = 25;

const user = {
  name: name,
  age: age,
};

console.log(user.name); // "Генрі Сибола"
console.log(user.age); // 25
```

Синтаксис коротких властивостей (shorthand properties) вирішує цю проблему, дозволяючи використовувати ім'я змінної у якості імені властивості, а її значення - у якості значення властивості.

```js
const name = 'Генрі Сибола';
const age = 25;

const user = {
  name,
  age,
};

console.log(user.name); // "Генрі Сибола"
console.log(user.age); // 25
```

Тобто, оголошуючи об'єкт, достатньо вказати тільки ім'я властивості, а значення буде взяте зі змінної з аналогічним ім'ям.

## Обчислювальні властивості

Бувають ситуації, коли під час оголошення об'єкта необхідно додати властивість з ім'ям, яке ми заздалегідь не знаємо, тому що воно зберігається у якості значення змінної або у якості результату виконання функції.

Раніше для цього необхідно було спочатку створити об'єкт, а потім додавати властивості через квадратні дужки, що не зовсім зручно.

```js
const propName = 'name';
const user = {
  age: 25,
};

user[propName] = 'Генрі Сибола';
console.log(user.name); // 'Генрі Сибола'
```

Синтаксис обчислювальних властивостей (computed properties) допомагає уникнути зайвого коду і, в деяких випадках, спростити його. Значенням обчислювальної властивості може бути будь-який валідний вираз.

```js
const propName = 'name';
const user = {
  age: 25,
  // Ім'я цієї властивості буде взяте зі значення змінної propName
  [propName]: 'Генрі Сибола',
};

console.log(user.name); // 'Генрі Сибола'
```

## Методи об'єкта

Досі ми розглядали об'єкти тільки як сховища взаємопов'язаних даних, наприклад, інформація про книгу тощо. Об'єкти-сховища, зазвичай, знаходяться в масиві таких самих об'єктів, який є колекцією однотипних елементів.

Об'єкти можуть зберігати не тільки дані, але і функції для роботи з цими даними - методи. Якщо значення властивості - це функція, така властивість називається **методом об'єкта**.

```js
// ✅ Логічно і синтаксично згруповані сутності
const bookShelf = {
  books: ["The Last Kingdom", "Dream Guardian"],
  // Це метод об'єкта
  getBooks() {
    console.log("Цей метод буде повертати всі книги - властивість books");
  },
  // Це метод об'єкта
  addBook(bookName) {
    console.log("Цей метод буде додавати нову книгу у властивість books");
  },
};

// Виклики методів
bookShelf.getBooks();
bookShelf.addBook("Нова книга");

Такі об'єкти можна назвати «моделями». Вони пов'язують дані і методи для роботи з цими даними. Наприклад, можна було оголосити змінну books і дві функції getBooks() і addBook(bookName), але тоді це були б три незалежні сутності без явного синтаксичного, і зі слабким логічним зв'язком.

// ❌ Слабкопозв'язані, незалежні сутності
const books = [];
function getBooks() {}
function addBook() {}
```

## Доступ до властивостей об'єкта в методах

Методи використовуються для роботи з властивостями об'єкта, їх зміни. Для доступу до об'єкта в методі використовується не ім'я змінної, наприклад bookShelf, а ключове слово `this` - контекст. Значенням `this` буде об'єкт перед «крапкою», тобто об'єкт, який викликав цей метод, у нашому випадку - це посилання на об'єкт `bookShelf`.

```js
const bookShelf = {
  books: ['The Last Kingdom'],
  getBooks() {
    console.log(this);
  },
};

// Перед крапкою знаходиться об'єкт bookShelf,
// тому, викликаючи метод, this буде зберігати посилання на нього.
bookShelf.getBooks(); // {books: ['The Last Kingdom'], getBooks: f}
```

Для того, щоб отримати доступ до властивостей об'єкта в методах, ми звертаємось до нього через `this` і далі, стандартно - «через крапку» до властивостей.

```js
const bookShelf = {
  books: ['The Last Kingdom'],
  getBooks() {
    return this.books;
  },
  addBook(bookName) {
    this.books.push(bookName);
  },
  removeBook(bookName) {
    const bookIndex = this.books.indexOf(bookName);
    this.books.splice(bookIndex, 1);
  },
};

console.log(bookShelf.getBooks()); // ["The Last Kingdom"]
bookShelf.addBook('The Mist');
bookShelf.addBook('Dream Guardian');
console.log(bookShelf.getBooks()); // ['The Last Kingdom', 'The Mist', 'Dream Guardian']
bookShelf.removeBook('The Mist');
console.log(bookShelf.getBooks()); // ['The Last Kingdom', 'Dream Guardian']
```

Логічно замислитися - чому б не використовувати ім'я об'єкта у зверненні до властивостей, адже ми явно не збираємося його змінювати. Справа в тому, що ім'я об'єкта - річ ненадійна, методи одного об'єкта можна копіювати в інший (з іншим ім'ям), а в майбутньому дізнаємось, що часто під час створення об'єкта, ми наперед зовсім не знаємо імені. Використання this гарантує, що метод працює саме з тим об'єктом, який його викликав.

<Image src='/img/JS/Module--3/this-keyword.jpg' alt ='this у методах обʼєкта' />

:::info [Корисно]
Ми детально розберемо ключове слово **`this`** і всі його підводні камені на наступних заняттях, а зараз достатньо просто використовувати **`this`**, звертаючись до властивості об'єкта в його методах.
:::
