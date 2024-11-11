---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Розгалуження

Розгалуження використовуються для виконання різноманітного коду, залежно від умови. Принцип роботи простий - результат умови приводиться до буля `true` або `false`, після чого потік програми спрямовується в ту або іншу гілку.

## Інструкція `if​`

<Image src='/img/JS/Module--1/if.svg' alt='Інструкція IF' />

```js
if (умова) {
  // тіло if
}
```

Вхідні дані, які приводяться до буля, називаються умовою. Умова ставиться після оператора `if` в круглих дужках. Якщо умова приводиться до `true`, то виконується код у фігурних дужках тіла `if`.

```js
let cost = 0;
const subscription = 'pro';

if (subscription === 'pro') {
  cost = 100;
}

console.log(cost); // 100
```

Якщо умова приводиться до `false`, код у фігурних дужках буде пропущений.

```js
let cost = 0;
const subscription = 'free';

if (subscription === 'pro') {
  cost = 100;
}

console.log(cost); // 0
```

## Інструкція `if...else​`

<Image src='/img/JS/Module--1/if-else.svg' alt='Інструкція IF...ELSE' />

```js
if (умова) {
  // тіло if
} else {
  // тіло else
}
```

Розширює синтаксис `if` таким чином, що якщо умова приводиться до `false`, виконається код у фігурних дужках після оператора `else`.

```js
let cost;
const subscription = 'free';

if (subscription === 'pro') {
  cost = 100;
} else {
  cost = 0;
}

console.log(cost); // 0
```

Якщо умова приводиться до `true`, тіло блока `else` ігнорується.

```js
let cost;
const subscription = 'pro';

if (subscription === 'pro') {
  cost = 100;
} else {
  cost = 0;
}

console.log(cost); // 100
```

## Інструкція `else...if​`

<Image src='/img/JS/Module--1/else-if.svg' alt='Інструкція ELSE...IF' />

Конструкція `if...else` може перевірити і зреагувати на виконання або невиконання лише однієї умови.

Блок `else...if` дозволяє додати після `else` ще один оператор `if` з умовою. В кінці ланцюжка може бути класичний блок `else`, який виконається лише у тому випадку, якщо жодна умова не приведеться до true.

```js
let cost;
const subscription = 'premium';

if (subscription === 'free') {
  cost = 0;
} else if (subscription === 'pro') {
  cost = 100;
} else if (subscription === 'premium') {
  cost = 500;
} else {
  console.log('Invalid subscription type');
}

console.log(cost); // 500
```

При першому `true` перевірки припиняться і виконається лише один сценарій, який відповідає цьому `true`. Тому, такий запис варто читати як: **шукаю перший збіг умови, ігнорую все інше**.
