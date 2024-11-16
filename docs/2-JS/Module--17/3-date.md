---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Дата і час

Клас `Date` безпосередньо абстрагує більшу частину роботи з датами. Це дозволяє нам відображати моменти у часі як об'єкти і маніпулювати ними заздалегідь визначеними методами. Використовуючи можливості класу `Date`, можна створювати годинник, лічильники, календарі та інші інтерактивні елементи інтерфейсу.

## Створення дати

Екземпляр об'єкта `Date` - це об'єкт, що відображає певний момент часу. Створення дати без аргументів повертає об'єкт, що зберігає дату і час на момент його ініціалізації, тобто поточні. У рядковому перетворенні об'єкт повертає результат виклику методу `toString()`, тому у першому лозі ми отримаємо рядок, а не об'єкт.

```js
const date = new Date();

console.log(date);
// "Fri Jun 18 2021 15:01:35 GMT+0300 (Eastern European Summer Time)"

console.log(date.toString());
// "Fri Jun 18 2021 15:01:35 GMT+0300 (Eastern European Summer Time)"
```

## Unix час

Внутрішньо дати відображені в мілісекундах, що минули після опівночі 1 січня 1970 року у часовому поясі UTC. Для комп'ютера - це дата початку відліку часу - Unix час. Тому під час ініціалізації дати одним числом, воно являє собою кількість мілісекунд, що вже минула.

```js
console.log(new Date(0));
// "Thu Jan 01 1970 03:00:00 GMT+0300 (Eastern European Standard Time)"

console.log(new Date(15000));
// "Thu Jan 01 1970 03:00:15 GMT+0300 (Eastern European Standard Time)"
```

Метод `getTime()` повертає числове значення цієї дати (`timestamp`) - кількість мілісекунд, що минула з півночі 1 січня 1970 року.

```js
const date = new Date();
console.log(date.getTime()); // 1624021654154
```

Зручність цього формату полягає в тому, що можна відображати точні моменти часу у вигляді одного числа і не турбуватися про дати, рядки і часові пояси, оскільки можна отримати всю необхідну інформацію, коли необхідно.

## Встановлення дати

Створюючи екземпляр класу `Date`, можна встановити дату рядком або числами. Рядок може описувати тільки дату або дату і час.

```js
const teamMeetingDate = new Date("March 16, 2030");
console.log(teamMeetingDate);
// "Mon Mar 16 2030 00:00:00 GMT+0200 (Eastern European Standard Time)"

const preciseTeamMeetingDate = new Date("March 16, 2030 14:25:00");
console.log(preciseTeamMeetingDate);
// "Mon Mar 16 2030 14:25:00 GMT+0200 (Eastern European Standard Time)"
```

Встановлення часу у вигляді рядків внутрішньо викликає метод `Date.parse()`, який перетворює рядок у число - кількість мілісекунд. Саме тому формат переданого рядка - дуже гнучкий. Наприклад, можна не вказувати нуль для днів і місяця. Розглянемо кілька прикладів, які матимуть однаковий результат.

```js
new Date("2030-03-16");
new Date("2030-03");
new Date("2018");
new Date("03/16/2030");
new Date("2030/03/16");
new Date("2030/3/16");
new Date("March 16, 2030");
new Date("March 16, 2030 14:25:00");
new Date("2030-03-16 14:25:00");
new Date("2030-03-16T14:25:00");
new Date("16 March 2030");
```

Інший спосіб створення нових об'єктів - це передати сім чисел, які описують рік, місяць (починається з 0), день, години, хвилини, секунди і мілісекунди. Обов'язкові тільки перші три.

```js
const date = new Date(2030, 2, 16, 14, 25, 0, 0);
console.log(date);
// Sat Mar 16 2030 14:25:00 GMT+0200 (Eastern European Standard Time)
```

## Методи

Екземпляр класу `Date` має безліч методів для читання і запису значень дати і часу. Методи повертають або присвоюють рік, місяць, день місяця або тижня, годину, хвилину, секунду і мілісекунду для кожного екземпляра. Ці дані можуть бути у вигляді рядка з урахуванням місцевого календаря або мови.

### Геттери

Геттери використовуються для читання усієї дати або окремої складової. Значення, що повертається, залежить від поточного часового поясу, встановленого на вашому комп'ютері.

```js
const date = new Date();
console.log("Date: ", date);

// Повертає день місяця від 1 до 31
console.log("getDate(): ", date.getDate());

// Повертає день тижня від 0 до 6
console.log("getDay(): ", date.getDay());

// Повертає місяць від 0 до 11
console.log("getMonth(): ", date.getMonth());

// Повертає рік з 4 цифр
console.log("getFullYear(): ", date.getFullYear());

// Повертає години
console.log("getHours(): ", date.getHours());

// Повертає хвилини
console.log("getMinutes(): ", date.getMinutes());

// Повертає секунди
console.log("getSeconds(): ", date.getSeconds());

// Повертає мілісекунди
console.log("getMilliseconds(): ", date.getMilliseconds());
```

Існують еквівалентні версії цих методів, які повертають значення у форматі UTC (Coordinated Universal Time), а не адаптовані до поточного часового поясу користувача.

```js
const date = new Date();
console.log("Date: ", date);

// Повертає день місяця від 1 до 31
console.log("getUTCDate(): ", date.getUTCDate());

// Повертає день тижня від 0 до 6
console.log("getUTCDay(): ", date.getUTCDay());

// Повертає місяць від 0 до 11
console.log("getUTCMonth(): ", date.getUTCMonth());

// Повертає рік з 4 цифр
console.log("getUTCFullYear(): ", date.getUTCFullYear());

// Повертає години
console.log("getUTCHours(): ", date.getUTCHours());

// Повертає хвилини
console.log("getUTCMinutes(): ", date.getUTCMinutes());

// Повертає секунди
console.log("getUTCSeconds(): ", date.getUTCSeconds());

// Повертає мілісекунди
console.log("getUTCMilliseconds(): ", date.getUTCMilliseconds());
```

### Сеттери

Все, що можна прочитати - можна записати, методи для запису називаються також геттери, але починаються з префіксу `set`. Також для всіх методів існують їх UTC еквіваленти.

```js
const date = new Date("March 16, 2030 14:25:00");

date.setMinutes(50);
// "Sat Mar 16 2030 14:50:00 GMT+0200"

date.setFullYear(2040, 4, 8);
// "Tue May 08 2040 14:50:00 GMT+0300"
```

## Форматування дати

Об'єкт дати може бути представлений у різних рядкових і числових форматах. Для цього існує цілий набір методів. Наприклад, `toString()`, `toDateString()` і `toTimeString()` повертають стандартне рядкове відображення, що не задане жорстко у стандарті, а залежить від браузера. Єдина вимога до нього - читабельність для людини. Метод `toString()` повертає дату повністю, а `toDateString()` і `toTimeString()` - тільки дату і час відповідно.

```js
const date = new Date("March 16, 2030 14:25:00");

date.toString();
// "Sat Mar 16 2030 14:25:00 GMT+0200 (Eastern European Standard Time)"

date.toTimeString();
// "14:25:00 GMT+0200 (Eastern European Standard Time)"

date.toLocaleTimeString();
// "2:25:00 PM"

date.toUTCString();
// "Sat, 16 Mar 2030 12:25:00 GMT"

date.toDateString();
// "Sat Mar 16 2030"

date.toISOString();
// "2030-03-16T12:25:00.000Z"

date.toLocaleString();
// "3/16/2030, 2:25:00 PM"

date.getTime();
// 1899894300000
```
