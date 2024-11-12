---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Масиви

## Ітерація по масиву

Цикл `for` можна використовувати для ітерації по масиву, тобто «перебрати» його поелементно.

```js
const clients = ['Mango', 'Ajax', 'Poly'];

for (let i = 0; i < clients.length; i += 1) {
  console.log(clients[i]);
}
```

Для доступу до елементів використовується синтаксис квадратних дужок `масив[індекс]`, де `індекс` - це значення лічильника циклу від `0` і до останнього індексу масиву, тобто менше, але не дорівнює його довжині.

## Цикл `for...of​`

Конструкція `for...of` оголошує цикл, що перебирає ітерабельні об'єкти - масиви і рядки. Тіло циклу буде виконуватися для значення кожного елемента. Це хороша заміна циклу for, якщо не потрібен доступ до лічильника ітерації.

```js
for (const variable of iterable) {
  // тіло циклу
}
```

- `variable` — змінна, яка буде зберігати значення елемента на кожній ітерації.
- `iterable` — колекція, яка містить ітерабельні (що можна порахувати) елементи, наприклад `масив`.

```js
const clients = ['Mango', 'Ajax', 'Poly'];

for (const client of clients) {
  console.log(client);
}

const string = 'javascript';

for (const character of string) {
  console.log(character);
}
```

## Оператори `break` і `continue​`

Будемо шукати ім'я клієнта в масиві імен, якщо знайшли - перериваємо цикл, оскільки немає сенсу шукати далі, імена у нас унікальні.

```js
const clients = ['Mango', 'Poly', 'Ajax'];
const clientNameToFind = 'Poly';
let message;

for (const client of clients) {
  // На кожній ітерації будемо перевіряти чи збігається елемент масиву з
  // іменем клієнта. Якщо збігається - записуємо в message повідомлення
  // про успіх і робимо break, щоб далі не шукати
  if (client === clientNameToFind) {
    message = "Клієнт з таким ім'ям є в базі даних!";
    break;
  }

  // Якщо вони не збігаються - записуємо в message повідомлення про відсутність імені
  message = "Клієнт з таким ім'ям відсутній в базі даних!";
}

console.log(message); // "Клієнт з таким ім'ям є в базі даних!"
```

Можна на початку задати message значення невдачі пошуку, а в циклі перезаписати його на успіх, якщо знайшли ім'я. Але `break` все одно нам знадобиться, оскільки, якщо у нас масив із `10000` клієнтів, а потрібний нам знаходиться на 2 позиції, то немає абсолютно жодного сенсу перебирати інші 9998 елементи.

```js
const clients = ['Mango', 'Poly', 'Ajax'];
const clientNameToFind = 'Poly';
let message = "Клієнт з таким ім'ям відсутній в базі даних!";

for (const client of clients) {
  if (client === clientNameToFind) {
    message = "Клієнт з таким ім'ям є в базі даних!";
    break;
  }
  // Якщо не збігається, то на цій ітерації нічого не робимо
}

console.log(message); // Клієнт з таким ім'ям є в базі даних!
```

Використовуємо цикл для виведення тільки чисел, більших за певне значення.

```js
const numbers = [1, 3, 14, 18, 4, 7, 29, 6, 34];
const threshold = 15;

// Для чисел, менших ніж порогове значення, спрацьовує continue, виконання тіла
// припиняється і управління передається на наступну ітерацію.
for (let i = 0; i < numbers.length; i += 1) {
  if (numbers[i] < threshold) {
    continue;
  }

  console.log(`Число більше за ${threshold}: ${numbers[i]}`); // 18, 29, 34
}
```
