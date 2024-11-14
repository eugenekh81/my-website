---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CPN } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Правила визначення this

Необхідно засвоїти лише одне правило для визначення ґ - значення контексту всередині функції (не стрілочної) визначається не на момент її створення, а `на момент виклику`. Тобто значення `this` визначається тим, як викликається функція, а не де вона була оголошена.

## `this` у глобальній області видимості

У глобальній області видимості, якщо скрипт виконується не в суворому режимі, `this` посилається на об'єкт `window`. В суворому режимі значення `this`, в глобальній області видимості, буде `undefined`.

```js
function foo() {
  console.log(this);
}

foo(); // window без "use strict" і undefined з "use strict"
```

## `this` в методі об'єкта

Якщо функція була викликана як метод об'єкта, то контекст буде посилатися на об'єкт, частиною якого є метод.

```js
const petro = {
  username: "Petro",
  showThis() {
    console.log(this);
  },
  showName() {
    console.log(this.username);
  },
};

petro.showThis(); // {username: "Petro", showThis: ƒ, showName: ƒ}
petro.showName(); // 'Petro'
```

Розглянемо складніший приклад для кращого розуміння.

- Спочатку створимо функцію в глобальній області видимості і викличемо її.
- Після чого, присвоїмо її у властивість об'єкта і викличемо як метод цього об'єкта.

```js
function showThis() {
  console.log("this in showThis: ", this);
}

// Викликаємо у глобальному контексті
showThis(); // this in showThis: Window

const user = {
  username: "Mango",
};

// Записуємо посилання на функцію у властивість об'єкта
// Зверніть увагу, що це не виклик - немає ()
user.showContext = showThis;

// Викликаємо функцію в контексті об'єкта
// this буде вказувати на поточний об'єкт, в контексті
// якого здійснюється виклик, а не на глобальний об'єкт.
user.showContext(); // this in showThis: {username: "Mango", showContext: ƒ}
```

## `this` в callback-функціях

Передаючи методи об'єкта як колбек-функції, контекст не зберігається. Колбек - це посилання на метод, яке присвоюється як значення параметра, що викликається без об'єкта.

```js
const customer = {
  firstName: "Jacob",
  lastName: "Mercer",
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

function makeMessage(callback) {
  // callback() - це виклик методу getFullName без об'єкта
  console.log(`Обробляємо заявку від ${callback()}.`);
}

makeMessage(customer.getFullName); // Буде помилка у виклику функції
```

:::tip Цікаво
Вирішення цієї проблеми розглядається у секції про метод `bind()` і методи об'єкта.
:::

## `this` у стрілочних функціях

Стрілочні функції не мають свого `this`. На відміну від звичайних функцій, змінити значення `this` всередині стрілки після її оголошення - неможливо.

:::tip Цікаво
Контекст всередині стрілки визначається місцем її оголошення, а не виклику, і посилається на контекст батьківської функції.
:::

Стрілочні функції також ігнорують наявність суворого режиму. Якщо стрілка запам'ятала глобальний контекст, то `this` в ній буде містити посилання на `window`, незалежно від того, чи виконується скрипт в суворому режимі.

```js
const showThis = () => {
  console.log("this in showThis: ", this);
};

showThis(); // this in showThis: window

const user = {
  username: "Mango",
};
user.showContext = showThis;

user.showContext(); // this in showThis: window
```

Обмежуючи стрілочні функції постійним контекстом, JavaScript-рушії можуть краще їх оптимізувати, на відміну від звичайних функцій, значення `this` яких може бути змінено.

Приклад - непрактичний, але чудово показує як працює контекст для стрілок. Значення контексту береться з батьківської області видимості.

```js
const hotel = {
  username: "Resort hotel",
  showThis() {
    const foo = () => {
      // Стрілки запам'ятовують контекст під час оголошення
      // з батьківської області видимості
      console.log("this in foo: ", this);
    };

    foo();
    console.log("this in showThis: ", this);
  },
};

hotel.showThis();
// this in foo: {username: 'Resort hotel', showThis: ƒ}
// this in showThis: {username: 'Resort hotel',showThis: ƒ}
```
