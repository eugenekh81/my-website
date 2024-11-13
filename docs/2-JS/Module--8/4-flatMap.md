---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CPN } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Метод `flatMap()`

Метод `flatMap(callback)` - аналогічний методу `map()`, але застосовується у випадках, коли результат - це багатовимірний масив, який необхідно «розгладити».

```js
массив.flatMap((element, index, array) => {
  // Тіло колбек-функції
});
```

У масиві students зберігається список студентів зі списком предметів, які відвідує студент, у властивості `courses`. Кілька студентів можуть відвідувати один і той самий предмет. Необхідно скласти список всіх предметів, які відвідує ця група студентів, поки що, навіть повторюваних.

```js
const students = [
  { name: 'John', courses: ['mathematics', 'physics'] },
  { name: 'Alice', courses: ['computer science', 'mathematics'] },
  { name: 'Michael', courses: ['physics', 'biology'] },
];

students.map((student) => student.courses);
// [['mathematics', 'physics'], ['computer science', 'mathematics'], ['physics', 'biology']]

students.flatMap((student) => student.courses);
// ['mathematics', 'physics', 'computer science', 'mathematics', 'physics', 'biology'];
```

Він викликає колбек-функцію для кожного елемента вихідного масиву, а результат її роботи записує у новий масив. Відмінність від `map()` у тому, що новий масив «розгладжується» на глибину, що дорівнює одиниці (одна вкладеність). Цей розгладжений масив і є результатом роботи `flatMap()`.
