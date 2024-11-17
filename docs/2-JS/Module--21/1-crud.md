---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# CRUD

<Image src='/img/JS/crud.png' alt='Create, read, update and delete operations' />

Для взаємодії з ресурсами бекенду використовується чотири операції:
- **створення (`create`)**
- **читання (`read`)**
- **оновлення (`update`)**
- **видалення (`delete`)**

Для кожної з них визначений стандартний HTTP-метод.

| Method | Description |
| --- | --- |
| POST | Операція create - створити новий ресурс. |
| GET | Операція read - отримати набір ресурсів або один ресурс за ідентифікатором. |
| PUT, PATCH | Операція update - оновити ресурс за ідентифікатором. |
| DELETE | Операція delete - видалити ресурс за ідентифікатором |

Будемо робити запити до [**JSON Placeholder API**](https://jsonplaceholder.typicode.com/), який надає колекцію несправжніх постів в ресурсі `/posts`, представлених об'єктами з властивостями `id`, `author` і `body`.

## Читання
HTTP-метод `GET` використовується для отримання існуючих даних. Метод `fetch()` повинен відправити на сервер GET-запит без тіла. Бекенд, після отримання запиту, обробить його і у відповіді поверне необхідні ресурси.

Отримаємо масив усіх постів. З цією метою, звертаємося до ресурсу `/posts`, описаного в документації бекенду. Метод `fetch()` за замовчуванням робить GET-запит, тому необов'язково перевизначати опції запиту.

```js
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.log(error));
```

Отримаємо один пост за ідентифікатором (властивість `id`), додавши його до ресурсу `/posts/:postId`. Остання частина цього шляху називається динамічний параметр і в документації описується як `/ресурс/:параметр`. Ресурс не змінюється - це шлях до цілої колекції, а значення параметра змінюється для кожного її елемента.

```js
// Change this number to fetch different post
const postId = 1;

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  .then(response => response.json())
  .then(post => console.log(post))
  .catch(error => console.log(error));
```

## Створення

Метод `POST` використовується для додавання нового ресурсу. Метод `fetch()` повинен відправити POST-запит на сервер, в тілі якого буде об'єкт з полями `author` і `body`, ідентифікатор буде автоматично створений базою даних. Результатом такого запиту буде об'єкт, доданий в базу даних.

```js
const postToAdd = {
  author: "Mango",
  body: "CRUD is awesome",
};

const options = {
  method: "POST",
  body: JSON.stringify(postToAdd),
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};

fetch("https://jsonplaceholder.typicode.com/posts", options)
  .then(response => response.json())
  .then(post => console.log(post))
  .catch(error => console.log(error));
```

Робимо запит на створення поста, звертаючись до ресурсу `/posts`, але у налаштуваннях методу `fetch()` змінюємо HTTP-метод на `POST`. Таким чином, бекенд знає, що потрібно не прочитати вже існуючий, а створити новий ресурс в цій колекції.

Тіло запиту повинно бути рядком, тому що протокол HTTP передає усе як текст. При передачі складних типів даних, їх обов'язково необхідно привести до рядка методом `JSON.stringify()`. Не забуваємо вказати заголовок `Content-Type`, який уточнює для бекенду тип переданих даних.

У відповідь, якщо все добре, отримаємо JSON з доданим `id`. Ідентифікатор буде унікальним для кожного об'єкта.

```js
{
  "id": 1,
  "author": "Mango",
  "content": "CRUD is awesome"
}
```

## Оновлення

Методи `PUT` і `PATCH` використовуються для оновлення існуючих даних. Який метод використовувати, буде написано в документації бекенду. Метод `fetch()` повинен відправити на сервер запит, в тілі якого необхідно вказати об'єкт з полями для зміни. Шлях вказує, в якій колекції і який елемент ми хочемо оновити. Бекенд, після отримання запиту, обробить його і у відповіді поверне оновлений ресурс.

```js
// Change value of id property to update different post
const postToUpdate = {
  id: 1,
  body: "CRUD is really awesome",
};

const options = {
  method: "PATCH",
  body: JSON.stringify(postToUpdate),
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};

fetch(`https://jsonplaceholder.typicode.com/posts/${postToUpdate.id}`, options)
  .then(response => response.json())
  .then(post => console.log(post))
  .catch(error => console.log("ERROR" + error));
```

У відповідь, якщо все добре, отримаємо оновлений об'єкт.

```js
{
  id: 1,
  author: 'Mango',
  content: 'CRUD is really awesome',
}
```

:::tip Цікаво
Метод `PATCH` заміняє в існуючому ресурсі значення, передані в тілі запиту властивостей. Метод `PUT` повністю заміняє ресурс.
:::

## Видалення

Метод `DELETE` використовується для видалення існуючих даних. Метод `fetch()` повинен відправити на сервер DELETE-запит без тіла. Шлях вказує, в якій колекції і який елемент ми хочемо видалити. Бекенд, після отримання запиту, обробить його, видалить ресурс з колекції і у відповіді поверне статус результату.

```js
const postIdToDelete = 1;

fetch(`https://jsonplaceholder.typicode.com/posts/${postIdToDelete}`, {
  method: "DELETE",
})
  .then(() => console.log("Post deleted"))
  .catch(error => console.log("Error:", error));
```
