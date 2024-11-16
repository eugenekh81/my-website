---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Веб-сховище

Щоразу, коли ви змінюєте тему кольорів між світлою і темною, переглядаєте відео, додаєте товар у корзину, відкриваєте або закриваєте сайдбар, популярні веб-застосунки запам'ятовують стан інтерфейсу і у наступному відвідуванні відновлюють його.

За замовчуванням стан інтерфейсу зберігається в пам'яті вкладки браузера і втрачається після закриття веб-застосунку. Щоб уникнути цього, необхідно десь зберегти дані про стан інтерфейсу між відвідуваннями сторінки. На допомогу приходить зберігання інформації про стан веб-застосунку на комп'ютері користувача.

## Web Storage API

Веб-сховище складається з локального сховища (`localStorage`) і сховища сеансів (`sessionStorage`). Забезпечує спосіб зберігання даних інтуїтивно зрозумілим чином у вигляді пар `ключ:значення`. Технічно у веб-сховище можна записати тільки рядки, але це не проблема, якщо використовувати методи класу JSON для перетворення складних типів. У веб-сховище не записують методи об'єктів або функції, тільки дані.

**Локальне сховище (`localStorage`)** - унікальне для кожного веб-застосунку і буде однаковим на декількох вкладках, в яких він (веб-застосунок) запущений. Дані в локальному сховищі не видаляються, навіть після закриття браузера або вимкнення комп'ютера. Щоб їх видалити, необхідно використовувати JavaScript.

**Сховище сеансів (`sessionStorage`)** схоже на локальне - воно також унікальне для кожного веб-застосунку, але час життя збережених даних обмежений сесією вкладки браузера. Щойно користувач закриває вкладку або браузер, дані очищаються. На практиці сховище сеансів використовується значно рідше.

:::tip Цікаво
У веб-сховищі не зберігають паролі, номери банківських карт і подібну конфіденційну інформацію. Якщо шкідливий скрипт отримає доступ до веб-сторінки, він без проблем прочитає ці дані.
:::

## Локальне сховище

Дозволяє зберігати дані без закінчення терміну дії у форматі пар `ключ:значення` на комп'ютері користувача і читати їх при повторному відвідуванні сторінки. Локальне сховище і сховище сесії - це частина браузера, тому вони доступні як властивості об'єкта `window`, мають однаковий набір властивостей і методів, і відрізняються тільки поведінкою.

- `setItem(key, value)` - створює новий, або оновлює вже існуючий запис у сховищі
- `getItem(key)` - повертає зі сховища значення з ключем `key`
- `removeItem(key)` - видаляє зі сховища запис з ключем `key`
- `clear()` - повністю очищає всі записи сховища
- `length`- кількість записів у сховищі

### Збереження

Використовуючи метод `setItem(key, value)`, можна додати новий запис у вигляді пари `ключ:значення`:

```js
localStorage.setItem("ui-theme", "light");
localStorage.setItem("sidebar", "expanded");
localStorage.setItem("notification-level", "mute");
```

Якщо необхідно зберегти щось, крім рядка, наприклад, масив або об'єкт, необхідно перетворити їх у рядок методом `JSON.stringify()`:

```js
const settings = {
theme: "dark",
isAuthenticated: true,
options: [1, 2, 3],
};

localStorage.setItem("settings", JSON.stringify(settings));
```

### Читання
Метод `getItem(key)` дозволяє прочитати зі сховища запис з ключем `key`. Якщо у сховищі відсутній запис з таким ключем, метод повертає `null`. Якщо значення - це звичайний рядок, немає потреби його парсити:

```js
localStorage.setItem("ui-theme", "dark");

const theme = localStorage.getItem("ui-theme");
console.log(theme); // "dark"
```

В іншому випадку, необхідно розпарсити значення методом `JSON.parse()`, щоб отримати валідні дані:

```js
const settings = {
theme: "dark",
isAuthenticated: true,
options: [1, 2, 3],
};

localStorage.setItem("settings", JSON.stringify(settings));

const savedSettings = localStorage.getItem("settings");
const parsedSettings = JSON.parse(savedSettings);
console.log(parsedSettings); // settings object
```

:::tip Корисно
Не забувайте використовувати конструкцію `try...catch` з методом `JSON.parse()`, щоб уникнути «падіння» скрипту, якщо раптом прочитали невалідний JSON.
:::

### Видалення

Метод `removeItem(key)` видаляє зі сховища вже існуючий запис з ключем `key`:

```js
localStorage.setItem("ui-theme", "dark");
console.log(localStorage.getItem("ui-theme")); // "dark"

localStorage.removeItem("ui-theme");
console.log(localStorage.getItem("ui-theme")); // null
```

### Очищення сховища

Операція повного очищення сховища - небезпечна, оскільки може порушити записи, зроблені іншими розробниками проекту. Проте, якщо ви хочете повністю очистити сховище, потрібно викликати метод `clear()`:

```js
localStorage.setItem("ui-theme", "light");
localStorage.setItem("sidebar", "expanded");
localStorage.setItem("notification-level", "mute");
console.log(localStorage.getItem("ui-theme")); // "light"
console.log(localStorage.getItem("sidebar")); // "expanded"
console.log(localStorage.getItem("notification-level")); // "mute"

localStorage.clear();
console.log(localStorage.getItem("ui-theme")); // null
console.log(localStorage.getItem("sidebar")); // null
console.log(localStorage.getItem("notification-level")); // null
```

## Зберігаємо повідомлення

Створимо форму для введення повідомлення і будемо зберігати його в `localStorage` по сабміту. Змінюйте значення текстового поля і натискайте кнопку «Save». Текст в полі виведення зміниться на введений. Перезавантажте сторінку, і ви побачите той самий текст, хоча нічого ще не вводили. При завантаженні сторінки ми беремо з `localStorage` останнє збережене значення. Спочатку такий запис у сховищі відсутній, тому буде виведений порожній рядок.

<CP src='https://codepen.io/goit-academy/embed/XWMozzv?height=265&theme-id=dark&default-tab=js,result' />

Подивитися вміст веб-сховища можна в інструментах розробника на вкладці `Application`. Там само ви можете вручну видаляти і додавати записи. На практиці це використовується під час розробки та налагодження роботи застосунку.

<img src='/img/js/localstorage.png' alt='Сховище у інструментах розробника' />

## Сервіс для localStorage
Для того, щоб скоротити кількість повторюваного коду при роботі з веб-сховищем, можна написати сервіс зі стандартними методами, наприклад, `save` і `load`. Вони будуть абстрагувати повторюваний код перевірки помилок парса і подібну рутину.

```js title="storage.js"
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

export default {
  save,
  load,
};
```

Тепер ми можемо безпечно додавати і читати записи з локального сховища. Спробуйте самостійно дописати метод `remove(key)` для видалення запису, аналогічно `load(key)` і `save(key, value)`.
