---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CPN } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Перебираючі методи масиву

В JavaScript є методи масивів, що прийшли з функціональних мов. Більшість з них - це чисті функції. Вони створюють новий масив, заповнюють його, застосовуючи до значення кожного елемента зазначену колбек-функцію, після чого повертають цей новий масив.

Усі перебираючі методи масивів мають схожий синтаксис. Вихідний масив `array`, виклик методу `method` і callback-функція `callback` як аргумент методу.

```js
array.method(callback[currentValue, index, array])
```

У більшості методів аргументами callback-функції є значення елемента `currentValue` (перший параметр), позиція елемента `index` (другий параметр) і сам вихідний масив `array` (третій параметр).

```js
array.method((item, idx, arr) => {
  // логіка, яка буде застосовуватися на кожній ітерації
});
```

Всі параметри, крім значення елемента `item`, - необов'язкові. Назви параметрів можуть бути будь-які, але є неофіційні домовленості.

```js
array.method(item => {
  // логіка, яка буде застосовуватися на кожній ітерації
});
```
