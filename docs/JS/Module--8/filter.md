---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CPN } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Метод `filter()`

Метод `filter(callback)` використовується для єдиної операції - фільтрації масиву, тобто, коли необхідно вибрати більше одного елемента з колекції за певним критерієм.

```js
масив.filter((element, index, array) => {
  // Тіло колбек-функції
});
```

- Не змінює оригінальний масив.
- Поелементо перебирає оригінальний масив.
- Повертає новий масив.
- Додає у масив, що повертається, елементи, які задовольняють умови колбек-функції.
- Якщо колбек повернув `true`, елемент додається у масив, що повертається.
- Якщо колбек повернув `false`, елемент не додається у масив, що повертається.
- Якщо жоден елемент не задовольнив умову, повертає порожній масив.

```js
const values = [51, -3, 27, 21, -68, 42, -37];

const positiveValues = values.filter((value) => value >= 0);
console.log(positiveValues); // [51, 27, 21, 42]

const negativeValues = values.filter((value) => value < 0);
console.log(negativeValues); // [-3, -68, -37]

const bigValues = values.filter((value) => value > 1000);
console.log(bigValues); // []

// Оригінальний масив не змінився
console.log(values); // [51, -3, 27, 21, -68, 42, -37]
```

Тобто метод `filter` викликає колбек-функцію для кожного елемента вихідного масиву і, якщо результат її виконання - `true`, додає поточний елемент у новий масив.

## Фільтрація унікальних елементів

Використовуючи метод `filter()`, можна виконати фільтрацію масиву таким чином, що у ньому залишаться тільки унікальні елементи. Цей прийом працює тільки з масивом примітивних значень - не об'єктів.

Повернемося до групи студентів і масиву усіх відвідуваних предметів, які ми отримали методом `flatMap()`.

```js
const students = [
  { name: 'Alex', courses: ['mathematics', 'physics'] },
  { name: 'John', courses: ['computer science', 'mathematics'] },
  { name: 'Kate', courses: ['physics', 'biology'] },
];

const allCourses = students.flatMap((student) => student.courses);
// ['mathematics', 'physics', 'computer science', 'mathematics', 'physics', 'biology'];
```

У змінній `allCourses` зберігається масив усіх відвідуваних предметів, які можуть повторюватися. Завдання полягає у тому, щоб створити новий масив, в якому будуть тільки унікальні предмети, тобто без повторень.

```js
const uniqueCourses = allCourses.filter(
  (course, index, array) => array.indexOf(course) === index
);
```

Використовуючи `array.indexOf(course)`, виконуємо пошук першого збігу поточного елемента `course` і отримуємо його індекс в оригінальному масиві усіх курсів. В параметрі index зберігається індекс поточного елемента `course`, перебираючи масив методом `filter`.

Якщо результат `indexOf()` і значення `index` рівні - це унікальний елемент, тому що таке значення зустрічається в масиві вперше, і на поточній ітерації фільтр обробляє саме його.

```
# Масив усіх курсів
['mathematics', 'physics', 'computer science', 'biology'];
```

Для елемента `'mathematics'` під індексом `0`:

- `indexOf()` поверне `0`, тому що шукає перший збіг.
- Значення параметра index буде `0`.
- Вони рівні, а отже, це унікальний елемент.

Для елемента `'mathematics'` під індексом `3`:

- `indexOf()` поверне `0`, тому що шукає перший збіг.
- Значення параметра `index` буде `3`.
- Вони не рівні, а отже, це повторюваний - не унікальний елемент.

## Масив об'єктів

Під час роботи з масивом об'єктів виконується фільтрація за значенням певної властивості. У підсумку, утворюється новий масив відфільтрованих об'єктів.

Наприклад, у нас є масив студентів з балами за тест. Необхідно відфільтрувати кращих (бал вище 80), гірших (бал нижче 50) і середніх студентів (бал від 50 до 80).

```js
const LOW_SCORE = 50;
const HIGH_SCORE = 80;

const students = [
  { name: 'David', score: 83 },
  { name: 'Alex', score: 59 },
  { name: 'John', score: 37 },
  { name: 'Ann', score: 94 },
  { name: 'Chris', score: 64 },
];

const best = students.filter((student) => student.score >= HIGH_SCORE);
console.log(best); // Масив об'єктів з іменами David і Ann

const worst = students.filter((student) => student.score < LOW_SCORE);
console.log(worst); // Масив з одним об'єктом John

// В колбек-функції зручно деструктуризувати властивості об'єкта
const average = students.filter(
  ({ score }) => score >= LOW_SCORE && score < HIGH_SCORE
);

console.log(average); // Масив об'єктів з іменами Alex і Chris
```
