---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Методи класу `Promise`

В одному випадку необхідно дочекатися виконання усіх відразу, і тільки потім обробляти їх результат, а в іншому - достатньо дочекатися виконання будь-якого, проігнорувавши інші тощо. Саме для цих випадків клас `Promise` має статичні методи для роботи з одним або групою промісів.

## `Promise.all()`

Приймає масив промісів, очікує їх виконання і повертає проміс. Якщо всі проміси виконаються успішно, проміс, що повертається, перейде у стан `fulfilled`, а його значенням буде масив результатів виконання кожного промісу. У разі, коли хоча б один з промісів буде відхилений, проміс, що повертається, перейде у стан rejected, а його значенням буде помилка.

```js
Promise.all([promise1, promise2, promise3, ...])
```

Напишемо функцію, яка приймає текст для `resolve()` і затримку в мілісекундах, а результатом свого виконання повертає проміс. Потім створимо два проміси з різним часом затримки.

```js
const makePromise = (text, delay) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(text), delay);
  });
};

const promiseA = makePromise("promiseA value", 1000);
const promiseB = makePromise("promiseB value", 3000);

Promise.all([promiseA, promiseB])
  .then(value => console.log(value)) //["promiseA value", "promiseB value"]
  .catch(error => console.log(error));
```

Колбек методу `then()` буде викликаний через три секунди, тобто коли виконається проміс `promiseB`. Проміс `promiseA` виконається через одну секунду і просто чекатиме. Якщо будь-який з промісів буде відхилений, то буде викликаний колбек методу `catch()`.

## `Promise.race()`

Повертає виконаний або відхилений проміс, залежно від того, з яким результатом завершиться «найшвидший» з переданих промісів, зі значенням або причиною його відхилення.

```
Promise.race([promise1, promise2, promise3, ...])
```

Коли хоча б один проміс з масиву виконається або буде відхилений, проміс, що повертається, перейде у стан `resolved` або `rejected`, а всі інші будуть відкинуті.

```js
const makePromise = (text, delay) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(text), delay);
  });
};

const promiseA = makePromise("promiseA value", 1000);
const promiseB = makePromise("promiseB value", 3000);

Promise.race([promiseA, promiseB])
  .then(value => console.log(value)) // "promiseA value"
  .catch(error => console.log(error));
```

Колбек методу `then()` або `catch()` буде викликаний через одну секунду, коли виконається `promiseA`. Другий проміс `promiseB` буде проігнорований.

## `Promise.resolve()` і `Promise.reject()`

Статичні методи для створення промісів, що миттєво успішно виконуються або відхиляються. Працюють аналогічно `new Promise()` за винятком можливості вказати затримку, але мають коротший синтаксис.

```js
// Fulfilled promise
new Promise(resolve => resolve("success value")).then(value =>
  console.log(value)
);

Promise.resolve("success value").then(value => console.log(value));

// Rejected promise
new Promise((resolve, reject) => reject("error")).catch(error =>
  console.error(error)
);

Promise.reject("error").catch(error => console.error(error));
```

Ці методи використовуються для промісифікаціі функцій, коли необхідно побудувати ланцюжок промісів і вже є початкове значення. Виконаємо рефакторинг наступного коду.

```js
const makeGreeting = guestName => {
  if (guestName === "" || guestName === undefined) {
    return {
      success: false,
      message: "Guest name must not be empty",
    };
  }

  return {
    success: true,
    message: `Welcome ${guestName}`,
  };
};

const result = makeGreeting("Mango");

if (result.success) {
  console.log(result.message);
} else {
  console.error(result.message);
}
```

Використовуючи колбек, відпадає необхідність повертати складні об'єкти зі статусом операції і перевіряти його у зовнішньому коді.

```js
const makeGreeting = (guestName, onSuccess, onError) => {
  if (guestName === "" || guestName === undefined) {
    return onError("Guest name must not be empty");
  }
  onSuccess(`Welcome ${guestName}`);
};

makeGreeting(
  "Mango",
  greeting => console.log(greeting),
  error => console.error(error)
);
```

Останнім кроком буде промісифікація функції `makeGreeting()` для того, щоб повністю усунути її залежність від зовнішнього коду.

```js
const makeGreeting = guestName => {
  if (guestName === "" || guestName === undefined) {
    return Promise.reject("Guest name must not be empty");
  }

  return Promise.resolve(`Welcome ${guestName}`);
};

makeGreeting("Mango")
  .then(greeting => console.log(greeting))
  .catch(error => console.error(error));
```
