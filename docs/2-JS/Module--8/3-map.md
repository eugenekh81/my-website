---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CPN } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Метод `map()`

**Метод `map(callback)` використовується для трансформації масиву**. Він викликає колбек-функцію для кожного елемента вихідного масиву, а результат її роботи записує у новий масив, який і буде результатом виконання методу.

```js
массив.map((element, index, array) => {
  // Тіло колбек-функції
});
```

- Поелементо перебирає оригінальний масив.
- Не змінює оригінальний масив.
- Результат роботи колбек-функції записується у новий масив.
- Повертає новий масив однакової довжини.
- Його можна використовувати для того, щоб змінити кожен елемент масиву. Оригінальний масив використовується як еталон, на основі якого можна зробити іншу колекцію.

```js
const planets = ['Earth', 'Mars', 'Venus', 'Jupiter'];

const planetsInUpperCase = planets.map((planet) => planet.toUpperCase());
console.log(planetsInUpperCase); // ['EARTH', 'MARS', 'VENUS', 'JUPITER']

const planetsInLowerCase = planets.map((planet) => planet.toLowerCase());
console.log(planetsInLowerCase); // ['earth', 'mars', 'venus', 'jupiter']

// Оригінальний масив не змінився
console.log(planets); // ['Earth', 'Mars', 'Venus', 'Jupiter']
```

Використання анонімних стрілочних функцій з неявним поверненням суттєво скорочує «шум» оголошення колбек-функції, що робить код чистішим і простішим для сприйняття.

## Масив об'єктів

Ми вже знаємо, що повсякденне завдання - це маніпуляція масивом об'єктів. Наприклад, отримати масив значень властивості з усіх об'єктів. У нас є масив студентів, а потрібно отримати окремий масив їхніх імен.

```js
const students = [
  { name: 'John', score: 83 },
  { name: 'Alice', score: 59 },
  { name: 'Michael', score: 37 },
  { name: 'Sarah', score: 94 },
  { name: 'David', score: 64 },
];

const names = students.map((student) => student.name);
console.log(names); // ['John', 'Alice', 'Michael', 'Sarah', 'David']
```

Використовуючи метод `map()`, ми можемо перебрати масив об'єктів, і в колбек-функції повернути значення властивості кожного з них.
