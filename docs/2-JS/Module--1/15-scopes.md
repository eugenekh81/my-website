---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Область видимості

Область видимості змінних (**`variable scope`**) - доступність змінних в певному місці коду.



Глобальна область видимості використовується за замовчуванням. Кожен має доступ до змінних, оголошених в ній. Наприклад, змінна `value` оголошена у глобальній області видимості, тобто поза будь-яким блоком, і доступна в будь-якому місці після оголошення.

```js
const value = 5;

if (true) {
  console.log("Block scope: ", value); // 5
}

console.log("Global scope: ", value); // 5
```

Будь-яка конструкція, яка використовує фігурні дужки **`{}`** (умови, цикли, функції тощо), створює нову **`локальну область видимості`**, і змінні, оголошені в цій області видимості, з використанням **`let`** або **`const`**, - **недоступні за межами цього блоку**.


```js
if (true) {
  const value = 5;
  console.log("Block scope: ", value); // 5
}

console.log("Global scope: ", value); // ReferenceError: value is not defined
```

Глибина вкладеності областей видимості - необмежена, і всі вони будуть працювати за одним принципом - область видимості має доступ до всіх змінних, оголошених вище по ієрархії вкладеності, але не може отримати доступ до змінних, оголошених у вкладених областях видимості.

Створимо декілька областей видимості і дамо їм імена для наочності.

<Image src='/img/JS/Module--1/scopes.jpg' alt='Області видимості' />

- Глобальна область вже присутня, створимо в ній змінну `global`
- Потім, використовуючи оператор `if`, створимо блочну область видимості `block A`
- Всередині області видимості `block A` поставимо ще один оператор `if`, який створить вкладену область видимості `block B`
- На одному рівні з `block A`, створимо область видимості `block C`, так само використовуючи оператор `if`

```js
const global = "global";

if (true) {
  const blockA = "block A";

  // Бачимо глобальну + локальну A
  console.log(global); // 'global'
  console.log(blockA); // block A

  // Змінні blockB і blockC не знайдені в доступних областях видимості.
  // Буде помилка звернення до змінної.
  console.log(blockB); // ReferenceError: blockB is not defined
  console.log(blockC); // ReferenceError: blockC is not defined

  if (true) {
    const blockB = "block B";

    // Бачимо глобальну + зовнішню A + локальну B
    console.log(global); // global
    console.log(blockA); // block A
    console.log(blockB); // block B

    // Змінна blockC не знайдена в доступних областях видимості.
    // Буде помилка звернення до змінної.
    console.log(blockC); // ReferenceError: blockC is not defined
  }
}

if (true) {
  const blockC = "block C";

  // Бачимо глобальну + локальну C
  console.log(global); // global
  console.log(blockC); // block C

  // Змінні blockA і blockB не знайдені в доступних областях видимості.
  // Буде помилка звернення до змінної.
  console.log(blockA); // ReferenceError: blockA is not defined
  console.log(blockB); // ReferenceError: blockB is not defined
}

// Бачимо лише глобальну
console.log(global); // global

// Змінні blockA, blockB і blockC не знайдені в доступних областях видимості.
// Буде помилка звернення до змінної.
console.log(blockA); // ReferenceError: blockA is not defined
console.log(blockB); // ReferenceError: blockB is not defined
console.log(blockC); // ReferenceError: blockC is not defined
```

:::tip[ЦІКАВО]
Будьте уважні у разі використання блочних областей видимості і змінних, оголошених в них. Саме ця помилка, разом із неуважністю, часто стають головним болем для початківця.
:::
