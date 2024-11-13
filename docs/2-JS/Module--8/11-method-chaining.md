---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CPN } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Ланцюжки методів

У нас є масив об'єктів з іменами, балами і відвідуваними предметами кожного студента.

```js
const students = [
  { name: 'John', score: 83, courses: ['mathematics', 'physics'] },
  { name: 'Alex', score: 59, courses: ['computer science', 'mathematics'] },
  { name: 'Julia', score: 37, courses: ['physics', 'biology'] },
  { name: 'Kate', score: 94, courses: ['literature', 'computer science'] },
];
```

Необхідно отримати масив їхніх імен, відсортованих за зростанням балів за тест. З цією метою ми відсортуємо копію масиву методом `sort()`, після чого методом `map()` створимо масив значень властивості `name` з відсортованого масиву.

```js
const sortedByAscendingScore = [...students].sort((a, b) => a.score - b.score);
const names = sortedByAscendingScore.map((student) => student.name);

console.log(names); // ['Julia', 'Alex', 'John', 'Kate']
```

Проблема в тому, що у нас з'являються проміжні змінні після кожної операції, крім фінальної. Змінна `sortedByAscendingScore` - зайва і необхідна тільки для зберігання проміжного результату.

Позбутися таких «мертвих» змінних можна за допомогою групування викликів методів у ланцюжку. Кожний наступний метод буде виконуватися на основі результату роботи попереднього.

```js
const names = [...students]
  .sort((a, b) => a.score - b.score)
  .map((student) => student.name);

console.log(names); // ['Julia', 'Alex', 'John', 'Kate']
```

1. Робимо копію вихідного масиву перед сортуванням.
1. На копії викликаємо метод `sort()`.
1. До результату роботи методу `sort()` застосовуємо метод `map()`.
1. Змінній names присвоюється результат роботи методу `map()`.

Отримаємо масив унікальних відвідуваних предметів, відсортований за алфавітом.

```js
const uniqueSortedCourses = students
  .flatMap((student) => student.courses)
  .filter((course, index, array) => array.indexOf(course) === index)
  .sort((a, b) => a.localeCompare(b));

console.log(uniqueSortedCourses); // ['biology', 'computer science', 'literature', 'mathematics', 'physics']
```

1. На вихідному масиві викликаємо `flatMap()` і робимо розгладжений масив усіх курсів.
1. До результату методу `flatMap()` застосовуємо метод `filter()` для фільтрації унікальних елементів.
1. На результаті методу `filter()` викликаємо `sort()`.
1. Змінній uniqueSortedCourses присвоюється результат роботи методу `sort()`.

Ланцюжок методів може бути довільної довжини, але, зазвичай, не більше 2-3 операцій. По-перше, перебираючі методи використовуються для порівняно простих операцій над колекцією. По-друге, виклик кожного наступного методу - це додаткове перебирання масиву, що за великої кількості, може позначитися на продуктивності.
