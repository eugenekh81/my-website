---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CPN } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Прототипне наслідування

ООП в JavaScript побудовано на прототипному наслідуванні. Об'єкти можна організувати у ланцюжки таким чином, щоб здійснювався автоматичний пошук властивості в іншому об'єкті, не знайденої в одному об'єкті. Сполучною ланкою виступає спеціальна прихована властивість `[[Prototype]]`, яка в консолі браузера відображається як `__proto__`.

## Прототип об'єкта

Метод `Object.create(obj)` створює і повертає новий об'єкт, зв'язуючи його з об'єктом `obj`.

```js
const animal = {
  legs: 4,
};
const dog = Object.create(animal);
dog.name = "Sparky";

console.log(dog); // { name: 'Sparky', __proto__: animal }
console.log(animal.isPrototypeOf(dog)); // true
```

Об'єкт, на який вказує посилання в `__proto__`, називається **прототипом**. У нашому прикладі об'єкт `animal` - це прототип для об'єкта `dog`. Метод `isPrototypeOf()` перевіряє, чи є об'єкт `animal` `прототипом` для `dog` і чи повертає `true` або `false`.

```js
console.log(dog.hasOwnProperty("name")); // true
console.log(dog.name); // 'Манго'

console.log(dog.hasOwnProperty("legs")); // false
console.log(dog.legs); // 4
```

Звернення `dog.name` працює очевидним чином - повертає власну властивість `name` об'єкта `dog`. Звертаючись до `dog.legs`, інтерпретатор шукає властивість `legs` в об'єкті `dog`, не знаходить і продовжує пошук в об'єкті за посиланням з `dog.__ proto__`, тобто, у цьому випадку, в об'єкті `animal` - його `прототипі`.

Тобто прототип - це **резервне сховище властивостей і методів об'єкта**, автоматично використовується під час їх пошуку. Об'єкт, який виступає прототипом, може також мати свій прототип, наступний - свій, і так далі.

Пошук властивості виконується до першого збігу. Інтерпретатор шукає властивість за ім'ям в об'єкті, якщо не знаходить, то звертається до властивості `__proto__`, тобто переходить за посиланням до об'єкта-прототипу, а потім - до прототипу прототипу. Якщо інтерпретатор дійде до кінця ланцюжка і не знайде властивості з таким ім'ям, то поверне `undefined`.

:::tip Цікаво
У специфікації властивість `__proto__` позначена як `[[Prototype]]`. У цьому випадку важливі подвійні квадратні дужки, вони вказують на те, що це внутрішня, службова властивість.
:::

## Метод `hasOwnProperty()`

Після того як ми дізналися про спосіб пошуку властивостей об'єкта, повинно бути зрозуміло, чому цикл `for...in` не розрізняє властивості об'єкта і його прототипу.

```js
const animal = { eats: true };
const dog = Object.create(animal);
dog.barks = true;

for (const key in dog) {
  console.log(key); // barks, eats
}
```

Саме тому ми використовуємо метод `obj.hasOwnProperty(prop)`, який повертає `true`, якщо властивість prop належить об'єкту `obj`, а не його прототипу, інакше - `false`.

```js
const animal = {
  eats: true,
};
const dog = Object.create(animal);
dog.barks = true;

for (const key in dog) {
  if (!dog.hasOwnProperty(key)) continue;

  console.log(key); // barks
}
```

Метод `Object.keys(obj)` поверне масив тільки власних ключів об'єкта `obj`, тому, на практиці використовують саме його, а не `for...in`.

```js
const animal = {
  eats: true,
};
const dog = Object.create(animal);
dog.barks = true;

const dogKeys = Object.keys(dog);

console.log(dogKeys); // ['barks']
```
