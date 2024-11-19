---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CPN } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Методи функцій

Трапляються ситуації, коли функцію потрібно викликати в контексті об'єкта, при цьому функція не є його методом. Для цього у функцій є методи `call`, `apply` і `bind`.

## Метод `call()`

```js
foo.call(obj, arg1, arg2, ...)
```

Метод `call` викличе функцію `foo` таким чином, що в `this` буде посилання на об'єкт `obj`, а також передасть аргументи `arg1`, `arg2` тощо.

```js
function greetGuest(greeting) {
  console.log(`${greeting}, ${this.username}.`);
}

const alex = {
  username: 'Alex',
};
const kate = {
  username: 'Kate',
};

greetGuest.call(alex, 'Welcome'); // Welcome, Alex.
greetGuest.call(kate, 'Nice to meet you'); // Nice to meet you, Kate.
```

## Метод `apply`

Метод apply - це аналог методу `call` за винятком того, що синтаксис передачі аргументів вимагає не перерахування, а масив, навіть якщо аргумент всього один.

```js
foo.call(obj, arg1, arg2, ...)

foo.apply(obj, [arg1, arg2, ...])
```

Метод `apply` викличе функцію foo таким чином, що в this буде посилання на об'єкт `obj`, а також передасть елементи масиву як окремі аргументи `arg1`, `arg2` тощо.

```js
function greetGuest(greeting) {
  console.log(`${greeting}, ${this.username}.`);
}

const alex = {
  username: 'Alex',
};
const kate = {
  username: 'Kate',
};

greetGuest.apply(alex, ['Welcome']); // Welcome, Alex.
greetGuest.apply(kate, ['Nice to meet you']); // Nice to meet you, Kate.
```

## Метод `bind()`

Методи `call` і `apply` викликають функцію «на місці», тобто відразу. Але у разі колбек-функцій, коли необхідно не відразу викликати функцію, а передати посилання на неї, причому з прив'язаним контекстом, використовується метод bind.

```
foo.bind(obj, arg1, arg2, ...)
```

Метод `bind` створює і повертає копію функції `foo` з прив'язаним контекстом `obj` і аргументами `arg1`, `arg2` тощо. Утворюється копія функції, яку можна передати куди завгодно і викликати коли завгодно.

```js
function greet(clientName) {
  return `${clientName}, welcome to «${this.service}».`;
}

const steam = {
  service: 'Steam',
};
const steamGreeter = greet.bind(steam);
steamGreeter('Alex'); // "Alex, welcome to «Steam»."

const gmail = {
  service: 'Gmail',
};
const gmailGreeter = greet.bind(gmail);
gmailGreeter('Kate'); // "Kate, welcome to «Gmail»."
```

## `bind()` і методи об'єкта

У разі передачі методів об'єкта як колбек-функцій, контекст не зберігається. Колбек - це посилання на метод, яка присвоюється як значення параметра, що викликається без об'єкта.

```js
const customer = {
  firstName: 'Jacob',
  lastName: 'Mercer',
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

function makeMessage(callback) {
  // callback() - це виклик методу getFullName без об'єкта
  console.log(`Обробляємо заявку від ${callback()}.`);
}

makeMessage(customer.getFullName); // Виникне помилка на момент виклику функції
```

У суворому режимі, значення `this` в методі `getFullName`, викликаючи як колбек-функції `callback()`, буде `undefined`. Звертаючись до властивостей `firstName` і `lastName`, виникне помилка, оскільки `undefined` - це не об'єкт.

Метод `bind` використовується для прив'язування контексту, передаючи методи об'єкта як колбек-функції. Передамо колбеком не оригінальний метод `getFullName`, а його копію з прив'язаним контекстом об'єкту customer.

```js
// ❌ Було
makeMessage(customer.getFullName); // Виникне помилка на момент виклику функції

// ✅ Стало
makeMessage(customer.getFullName.bind(customer)); // Обробляємо заявку від Jacob Mercer.
```
