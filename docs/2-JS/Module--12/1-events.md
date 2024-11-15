---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Події

Подія - це сигнал від браузера про те, що на веб-сторінці щось відбулося. Події використовуються для реакції на дії користувача і виконання коду, пов'язаного з певною подією. Існує багато видів подій: миші, клавіатури, елементів форм, завантаження зображень, буфера обміну, зміни стадії CSS анімації або переходу, зміни розмірів вікна та багато інших.

Одна дія може викликати декілька подій. Наприклад, клік викликає спочатку `mousedown`, а потім `mouseup` і `click`. У тих випадках, коли одна дія генерує декілька подій, їхній порядок фіксований. Тобто обробники викликаються у порядку `mousedown → mouseup → click`.

Для того, щоб елемент реагував на дії користувача, до нього необхідно додати слухача (обробника) події. Тобто функцію, яка буде викликана, щойно подія відбулася.

## Метод `addEventListener()`

Додає слухача події на елемент.

```js
element.addEventListener(event, handler, options);
```

- `event` - ім'я події, рядок, наприклад `"click"`.
- `handler` - колбек-функція, яка буде викликана під час настання події.
- `options` - необов'язковий об'єкт параметрів з розширеними налаштуваннями.

```js
const button = document.querySelector('.my-button');

button.addEventListener('click', () => {
  console.log('Button was clicked');
});
```

Для колбека можна (і бажано) використовувати окрему функцію і передавати на неї посилання. Іменована функція підвищує читабельність коду.

```js
const button = document.querySelector('.my-button');

const handleClick = () => {
  console.log('Button was clicked');
};

button.addEventListener('click', handleClick);
```

На одному елементі може бути будь-яка кількість обробників подій, навіть подій одного типу. Колбек-функції будуть викликатися у порядку їх реєстрації в коді.

<CP src='https://codepen.io/goit-academy/embed/QWpxOvE?height=265&theme-id=dark&default-tab=js,result' />

## Метод `removeEventListener()`

Видаляє слухача події з елемента. Аргументи аналогічні методу `addEventListener()`.

```js
element.removeEventListener(event, handler, options);
```

Для видалення потрібно передати посилання саме на ту колбек-функцію, яка була призначена в `addEventListener()`. У такому разі, для колбеків використовують окрему функцію і передають її за ім'ям (посиланням).

<CP src='https://codepen.io/goit-academy/embed/vYxrWpw?height=265&theme-id=dark&default-tab=js,result' />

## Ключове слово `this`

Якщо колбеком буде функція, яка використовує `this`, за замовчуванням контекст всередині неї буде посилатися на DOM-елемент, на якому висить слухач.

```js
const alex = {
  username: 'Alex',
  showUsername() {
    console.log(this);
    console.log(`My username is: ${this.username}`);
  },
};

const btn = document.querySelector('.js-btn');

// ✅ Працює
mango.showUsername();

// ❌ this буде посилатися на button, якщо використовувати showUsername як callback
btn.addEventListener('click', alex.showUsername); // не працює

// ✅ Не забувайте прив'язувати контекст методів об'єкта
btn.addEventListener('click', alex.showUsername.bind(alex));
```

