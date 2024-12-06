---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Методи масиву

## Методи `split()` і `join()​`

**Метод `split(separator)` перетворює рядок в масив**, «розбиваючи» його роздільником `separator`. Якщо роздільник - це порожній рядок, то створиться масив окремих символів. Роздільником може бути один або декілька символів.

```js
const name = 'Mango';
console.log(name.split('')); // ["M", "a", "n", "g", "o"]

const message = 'JavaScript - це цікаво';
console.log(message.split(' ')); // ["JavaScript", "-", "це", "цікаво"]
```

**Метод масивів `join(separator)` об'єднує елементи масиву у рядок**. У рядку елементи будуть розділені символом або групою символів, зазначених в `separator`. Тобто ця операція протилежна методу рядків `split(separator)`.

```js
const words = ['JavaScript', 'це', 'цікаво'];
console.log(words.join('')); // "JavaScriptцецікаво"
console.log(words.join(' ')); // "JavaScript це цікаво"
console.log(words.join('-')); // "JavaScript-це-цікаво"
```

## Метод `indexOf()​`

**`indexOf(value)`** повертає перший індекс, в якому елемент зі значенням value був знайдений в масиві, або число `-1`, якщо такий елемент відсутній. Використовуйте `indexOf` тоді, коли необхідно отримати сам індекс елемента.

```js
const fruits = ['Mango', 'Orange', 'Banana', 'Kiwi'];
console.log(fruits.indexOf('Banana')); // 2
console.log(fruits.indexOf('Monkong')); // -1
```

## Метод `includes()`​

**`includes(value)`** перевіряє, чи містить масив елемент зі значенням `value` і повертає `true` або `false` відповідно. Застосування цього методу корисне в ситуаціях, коли необхідно перевірити, чи є елемент в масиві і не важлива його позиція (індекс).

```js
const fruits = ['Mango', 'Orange', 'Banana', 'Kiwi'];
console.log(fruits.includes('Orange')); // true
console.log(fruits.includes('Monkong')); // false
```

### Перевірка багатьох умов з `includes()​`

На перший погляд код наступного прикладу виглядає добре.

```js
const fruit = 'apple';

if (fruit === 'apple' || fruit === 'strawberry') {
  console.log('It is a red fruit!');
}
```

Однак, що робити, якщо у нас буде більше червоних фруктів, наприклад, ще вишня (`cherry`) або журавлина (`cranberries`)? Чи будемо ми розширювати умову за допомогою додаткових `||`?

```js
const fruit = 'apple';

if (
  fruit === 'apple' ||
  fruit === 'strawberry' ||
  fruit === 'cherry' ||
  fruit === 'cranberries'
) {
  console.log('It is a red fruit!');
}
```

Можемо переписати умову, використовуючи `includes()`, це дуже просто і масштабовано.

```js
// Виносимо варіанти в масив
const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
const fruit = 'cherry';
// Перевіряємо присутність елемента
const hasFruit = redFruits.includes(fruit);

if (hasFruit) {
  console.log(`${fruit} is a red fruit!`);
}
```

## Методи `push()` і `pop()​`

**Додають або видаляють крайні елементи масиву**. Працюють тільки з крайнім лівим і крайнім правим елементом, і не можуть вставити або видалити елемент з довільної позиції.

<Image src='/img/JS/arr-methods.jpg' alt='Методи масивів'/>

**Метод `push()` додає один або декілька елементів наприкінці масиву**, без необхідності зазначати індекси елементів, що додаються. **Повертає довжину масиву після додавання елементів**.

<Image src='/img/JS/push.png' alt='Метод push' />

```js
const numbers = [];

numbers.push(1);
console.log(numbers); // [1]

numbers.push(2);
console.log(numbers); // [1, 2]

numbers.push(3);
console.log(numbers); // [1, 2, 3]

numbers.push(4);
console.log(numbers); // [1, 2, 3, 4]

numbers.push(5);
console.log(numbers); // [1, 2, 3, 4, 5]
```

:::tip[корисно]
Метод push() може приймати один або декілька елементів, вказаних у круглих дужках через кому

```js
const numbers = [];
numbers.push(1, 2, 3, 4, 5);
console.log(numbers); // [1, 2, 3, 4, 5]
```

:::

**Метод `pop()` видаляє останній елемент з кінця масиву і повертає видалений елемент**. Якщо масив порожній, метод повертає `undefined`.

<Image src='/img/JS/pop.png' alt='Метод pop' />

```js
const numbers = [1, 2, 3, 4, 5];

console.log(numbers.pop()); //  5
console.log(numbers); // [1, 2, 3, 4]

console.log(numbers.pop()); //  4
console.log(numbers); // [1, 2, 3]

console.log(numbers.pop()); //  3
console.log(numbers); // [1, 2]

console.log(numbers.pop()); //  2
console.log(numbers); // [1]

console.log(numbers.pop()); //  1
console.log(numbers); // []
```

## Метод `slice()​`

**`slice(begin, end)` повертає новий масив, що містить копію частини вихідного масиву, не змінюючи його**. Копія створюється з `begin` і до, але не включно, `end` - індекси елементів вихідного масиву.

<Image src='/img/JS/slice.png' alt='Метод slice' />

```js
const fruits = ['Mango', 'Ajax', 'Poly', 'Kiwi'];
console.log(fruits.slice(1, 3)); // ["Ajax", "Poly"]
```

Якщо `begin` і `end` не зазначені, буде створена повна копія вихідного масиву.

```js
const fruits = ['Mango', 'Orange', 'Banana', 'Kiwi'];
console.log(fruits.slice()); // ['Mango', 'Orange', 'Banana', 'Kiwi']
```

Якщо не зазначено `end`, копіювання буде зі `start` і до кінця вихідного масиву.

```js
const fruits = ['Mango', 'Orange', 'Banana', 'Kiwi'];
console.log(fruits.slice(1)); // ['Orange', 'Banana', 'Kiwi']
console.log(fruits.slice(2)); // ['Banana', 'Kiwi']
```

Якщо значення `start` від'ємне, а `end` не зазначено - будуть скопійовані останні `start` елементи

```js
const fruits = ['Mango', 'Orange', 'Banana', 'Kiwi'];
console.log(fruits.slice(-2)); // ['Banana', 'Kiwi']
```

## Метод `splice()`

Швейцарський ніж для роботи з масивами, якщо вихідний масив необхідно змінити. Видаляє, додає і замінює елементи у довільному місці масиву.

### Видалення​

Щоб видалити елементи в масиві, передаються два аргументи.

```js
splice(position, num);
```

- `position` - вказує на позицію (індекс) першого елемента для видалення
- `num` - визначає кількість елементів, що видаляються

**Метод `splice` змінює вихідний масив і повертає масив, що містить видалені елементи**. Наприклад, у нас є масив оцінок, який містить п'ять чисел від `1` до `5`.

```js
const scores = [1, 2, 3, 4, 5];

// Видаляємо три елементи масиву, починаючи з першого елемента (індекс 0)
const deletedScores = scores.splice(0, 3);

// Тепер масив scores містить два елементи
console.log(scores); // [4, 5]

// А масив deletedScores містить три видалені елементи
console.log(deletedScores); // [1, 2, 3]
```

На зображенні показаний виклик методу `score.splice (0, 3)` з прикладу.

<Image src='/img/JS/splice-remove.png' alt='Метод splice' />

:::tip[цікаво]
На практиці, значення, що повертається (масив видалених елементів), використовується рідко. Переважно, просто необхідно видалити елементи з масиву.
:::

### Додавання

Для того, щоб додати один або декілька елементів в масив, необхідно передати три або більше аргументи, за такої умови, другий аргумент повинен дорівнювати нулю.

```js
splice(position, 0, new_element_1, new_element_2, ...)
```

- Аргумент `position` вказує початкову позицію в масиві, куди будуть вставлені нові елементи.
- Другий аргумент - це нуль, він говорить методу не видаляти елементи в місці додавання нових.
- Третій, четвертий і всі наступні аргументи - це нові елементи, які додаються в масив.

Наприклад, у нас є масив з назвами кольорів у вигляді рядків. Додамо новий колір перед елементом з індексом 2.

```js
const colors = ['red', 'green', 'blue'];

colors.splice(2, 0, 'purple');
console.log(colors); // ["red", "green", "purple", "blue"]
```

На малюнку показаний виклик методу `colors.splice(2, 0, 'purple')` з прикладу.

<Image src='/img/JS/splice-insert.png' alt='Метод splice' />

Можна додати довільну кількість елементів, передавши четвертий, п'ятий аргумент тощо.

```js
const colors = ['red', 'green', 'blue'];

colors.splice(1, 0, 'yellow', 'pink');
console.log(colors); // ["red", "yellow", "pink", "green", "blue"]
```

### Заміна

**Заміна** - це операція додавання, в якій видаляються елементи в місці додавання нових. Для цього необхідно передати мінімум три аргументи. Кількість елементів, що видаляються і додаються, може не збігатися.

```js
splice(position, num, new_element_1, new_element_2, ...)
```

- `position` - вказує на позицію (`індекс`) першого елемента для видалення
- `num` - визначає кількість елементів, що видаляються
- Третій, четвертий і всі наступні аргументи - це нові елементи, які додаються в масив.

Наприклад, у нас є масив мов програмування з чотирьох елементів.

```js
const languages = ['C', 'C++', 'Java', 'JavaScript'];

// Заміняємо елемент з індексом 1 на новий
languages.splice(1, 1, 'Python');
console.log(languages); // ["C", "Python", "Java", "JavaScript"]

// Заміняємо один елемент (з індексом 2) на декілька
languages.splice(2, 1, 'C#', 'Swift', 'Go');
console.log(languages); // ["C", "Python", "C#", "Swift", "Go", "JavaScript"]
```

На зображенні показаний виклик методу `languages.splice(1, 1, 'Python')` з прикладу.

<Image src='/img/JS/splice-replace.png' alt='Метод splice' />

## Метод `concat()`​

**Об'єднує два або більше масивів в один**. Він не змінює масив, на якому викликається, а повертає новий. Порядок аргументів методу впливає на порядок елементів нового масиву.

```js
const oldFruits = ['Mango', 'Orange', 'Banana', 'Kiwi'];
const newFruits = ['Apple', 'Pineapple'];

const allClientsWithOldFirst = oldFruits.concat(newFruits);
console.log(allClientsWithOldFirst); // ['Mango', 'Orange', 'Banana', 'Kiwi','Apple', 'Pineapple']

const allClientsWithNewFirst = newFruits.concat(oldFruits);
console.log(allClientsWithNewFirst); // ['Apple', 'Pineapple', 'Mango', 'Orange', 'Banana', 'Kiwi']

console.log(oldFruits); // ['Mango', 'Orange', 'Banana', 'Kiwi']
console.log(newFruits); // ['Apple', 'Pineapple']
```
