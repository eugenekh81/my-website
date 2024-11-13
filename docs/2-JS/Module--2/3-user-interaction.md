---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Взаємодія з користувачем

Розберемо базові операції введення/виведення, достатні для отримання і відображення даних від користувача, перш ніж навчимося працювати з HTML-документом.

## Виведення даних​

Для виведення даних існує два методи: `console.log()` і `alert()`. В круглих дужках зазначаємо ім'я змінної, значення якої необхідно вивести.

### `console.log`

```js
const message = 'JavaScript is awesome!';
console.log(message); // JavaScript is awesome!
```

Спочатку можна вказати будь-який описовий рядок, після чого поставити кому і вказати ім'я змінної.

```js
const username = 'Mango';
console.log('Username is ', username); // Username is Mango
```

### `alert()`

Метод `alert()` виводить модальне вікно, текст якого відповідає значенню змінної (або літерала), яку передаємо в дужках.

```js
const message = 'JavaScript is awesome!';
alert(message);
```

:::tip[ЦІКАВО]
`console` і `alert` - частина інтерфейсу `window` - глобального об'єкта, доступного при виконанні скрипту на веб-сторінці. Запис `window.alert()` зайвий, пишемо просто `alert()` або `console.log()`. Детальніше про це будемо говорити далі.
:::

[**Going beyond `console.log()`**](https://medium.com/free-code-camp/how-to-use-the-javascript-console-going-beyond-console-log-5128af9d573b)

## Отримання даних

​
Це також методи з інтерфейсу `window`. Результатом свого виконання вони повертають те, що було введено користувачем, тому результат їх роботи можна записати у змінну для подальшого використання.

### `confirm()`

**`confirm()`** - виводить модальне вікно з повідомленням, і дві кнопки, `Ok` і `Cancel`. Натискаючи на `Ok`, результатом будет `true`, натискаючи на `Cancel` - повертається `false`.

```js
// Просимо клієнта підтвердити бронювання готелю
// і зберігаємо результат роботи confirm у змінну
const isComing = confirm('Please confirm hotel reservation');
console.log(isComing);
```

### `prompt()`

**`prompt()`** - виводить модальне вікно з полем введення і кнопками `Ok` і `Cancel`. Натискаючи на `Ok`, результатом буде те, що ввів користувач, у випадку `Cancel` - повертається `null`.

```js
// Запитуємо назву готеля, в якому хотів би зупинитися клієнт
// і зберігаємо результат виклику prompt у змінну.
const hotelName = prompt('Please enter desired hotel name');
console.log(hotelName);
```

Важлива особливість prompt полягає в тому, що незалежно від того, що ввів користувач, завжди повернеться рядок. Тобто, якщо користувач ввів `5`, то повернеться не число `5`, а рядок `"5"`.

```js
const value = prompt('Please enter a number!');
console.log(typeof value); // "string"
console.log(value); // "5"
```
