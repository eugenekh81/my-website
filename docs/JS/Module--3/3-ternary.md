---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Тернарний оператор

Тернарний оператор використовується у якості синтаксично коротшої заміни інструкції `if...else`, коли одній і тій самій змінній необхідно присвоїти різні значення за умовою.

```
<умова> ? <вираз_якщо_умова_правдива> : <вираз_якщо_умова_хибна>
```

**Працює за наступною схемою:**

- Обчислюється умова.
- Якщо умова правдива, тобто приводиться до `true`, обчислюється вираз після `?`.
- Якщо умова хибна, тобто приводиться до `false`, обчислюється вираз після `:`.
- Значення обчисленого виразу повертається у якості результату роботи тернарного оператора.

```js
let type;
const age = 20;

if (age >= 18) {
  type = "adult";
} else {
  type = "child";
}

console.log(type); // "adult"
```

Виконаємо рефакторинг, замінивши `if...else` на тернарний оператор.


```js
const age = 20;
const type = age >= 18 ? "adult" : "child";
console.log(type); // "adult"
```


Запишемо операцію пошуку більшого числа.

```js
const num1 = 5;
const num2 = 10;
let biggerNumber;

if (num1 > num2) {
  biggerNumber = num1;
} else {
  biggerNumber = num2;
}

console.log(biggerNumber); // 10
```

Код працює правильно, отримуємо більше число з двох, але це рішення здається занадто громіздким, враховуючи, наскільки проста проблема.

Використовуємо тернарний оператор.

```js
const num1 = 5;
const num2 = 10;
const biggerNumber = num1 > num2 ? num1 : num2;

console.log(biggerNumber); // 10
```

:::tip[ЦІКАВО]
Тернарний оператор повинен використовуватися у простих операціях присвоєння або повернення. Його використання для опису складних розгалужень - погана практика (антипатерн).
:::
