---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Типи даних

## Примітивні типи

​В JavaScript змінна не асоціюється з будь-яким типом даних, тип має її значення. Тобто змінна може зберігати значення різних типів.

### `Number`

`Number` - цілі числа і числа з плаваючою комою (крапкою).

```js
const age = 20;
const points = 15.8;
```

### `String`

`String` - рядки, послідовність з нуля або більше символів. Рядок починається і закінчується одинарними `'`, або подвійними лапками `"`.


```js
const username = "Mango";
const description = "JavaSript для початківців";
```

### `Boolean`

`Boolean` - логічний тип даних, прапорці стану. Всього два значення: `true` і `false`. Наприклад, на запитання чи увімкнено світло в кімнаті, можна відповісти так (`true`) або ні (`false`).


- true — так, вірно, істина, `1`
- false — ні, невірно, неправда, `0`

Зверніть увагу на імена змінних, що містять `буль`. Вони ставлять запитання, і відповідь на нього - так або ні.


```js
const isLoggedIn = true;
const canMerge = false;
const hasChildren = true;
const isModalOpen = false;
```

### `null`

`null` - особливе значення, яке по суті означає `ніщо`. Використовується в тих ситуаціях, коли необхідно явно вказати порожнечу. Наприклад, якщо користувач нічого не вибрав, то можна сказати що значення `null`.


```js
let selectedProduct = null;
```

### `undefined`

`undefined` - ще одне спеціальне значення. За замовчуванням, коли змінна оголошується, але не ініціалізується, її значення не визначено, їй присвоюється `undefined`.


```js
let username;
console.log(username); // undefined
```

### Оператор `typeof​`

Використовується для отримання типу значення змінної. Повертає на місце свого виклику тип значення змінної, вказаного після нього - рядок, в якому вказано тип.


```js
let username;
console.log(typeof username); // "undefined"

let inputValue = null;
console.log(typeof inputValue); // "object"

const quantity = 17;
console.log(typeof quantity); // "number"

const message = "JavaScript is awesome!";
console.log(typeof message); // "string"

const isSidebarOpen = false;
console.log(typeof isSidebarOpen); // "boolean"
```
