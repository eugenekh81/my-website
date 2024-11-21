---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Об'єкт місцезнаходження

Кожен запис у стеку історії навігації описаний об'єктом розташування (`location`) зі стандартним набором властивостей, які зберігають повну інформацію про URL. Коли користувач натискає на посилання та переміщається за програмою, поточне місце розташування змінюється і додається новий запис історії.

```js
{
  pathname: string;
  search: string;
  hash: string;
  state: any;
  key: string;
}
```

- `pathname` - рядок, що містить частину URL від початкового `/` і до символу `?`.
- `search` - містить весь рядок запиту. Якщо параметри відсутні, значенням буде порожній рядок.
- `hash` - рядок, що містить частину URL від кінця рядка запиту та символу `#`, за яким слідує ідентифікатор фрагмента URL-адреси. Якщо ідентифікатор фрагмента відсутній, значенням буде порожній рядок.
- `state` - довільне значення, яке містить додаткову інформацію, пов'язану з розташуванням, але не відображається в URL-адресі. Задається розробником. Використовується для передачі між маршрутами.
- `key` - унікальний рядок ідентифікатор, пов'язаний із цим місцезнаходженням. Службова властивість, значення якої задається автоматично для кожного нового запису в історії навігації.

Наприклад, для такого URL об'єкт розташування буде виглядати наступним чином.

```js title="https://gomerch.it/products?name=hoodie&color=orange&maxPrice=500#agreement"
{
  "pathname": "/products",
  "search": "?name=hoodie&color=orange&maxPrice=500",
  "hash": "#agreement",
  "state": null,
  "key": "random-browser-generated-id"
}
```

## Хук `useLocation`

Повертає об'єкт розташування, що представляє поточний URL, щоразу коли ми переходимо новим маршрутом або оновлюємо частину поточного URL. Одним із застосувань може бути завдання, де необхідно виконати якийсь ефект при зміні поточного розташування. Наприклад, надіслати дані на сервіс аналітики.

```jsx title="src/component/App.jsx"
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Analytics from 'path/to/analytics-service';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    Analytics.send(location);
  }, [location]);

  return <div>...</div>;
};
```

## Властивість `location.state`

Уявіть наступний сценарій у нашому додатку магазину. Користувач знаходиться на сторінці списку продуктів та виконав пошук за назвою, нехай поточний URL буде `/products?name=hoodie`. Після цього він кликає за карткою продукту та переходить на сторінку розширеної інформації про продукт, нехай поточний URL буде `/products/h-1`.

Нам поставлено завдання додати на сторінку продукту кнопку «Назад», при натисканні на яку виконається навігація на сторінку всіх продуктів, при цьому має зберегти стан рядка запиту. Тобто, при натисканні, користувача необхідно направити не на `/products`, а в нашому випадку на `/products?name=hoodie` - той URL з якого була виконана навігація на сторінку продукту.

```js
{
  pathname: string;
  search: string;
  hash: string;
  state: any;
  key: string;
}
```

Властивість `state` об'єкта розташування дозволяє передавати довільні дані при навігації від одного маршруту до іншого. Для цього використовуємо пропс `state` компонента `Link` і передамо об'єкт із властивістю `from` - звідки прийшов юзер. Значення пропсу state не має зумовленої структури та може бути довільним, на розсуд розробника.

```jsx title="src/pages/Products.jsx"
const Products = () => {
  return (
    <Link to='/products/h-1' state={{ from: '/dashboard?name=hoodie' }}>
      Navigate to product h-1
    </Link>
  );
};
```

Значення пропсу `state` буде доступно на об'єкті розташування маршруту куди була виконана навігація. Все, що необхідно зробити, це використовувати хук `useLocation`, отримати об'єкт location і звернутися до його властивості `state`.

```jsx title="src/pages/ProductDetails.jsx" showLineNumbers
const ProductDetails = () => {
  const location = useLocation();
  console.log(location.state); // { from: "/dashboard?name=hoodie" }

  return <Link to={location.state.from}>Back to products</Link>;
};
```

Насправді не потрібно обчислювати поточний URL для формування значення власності `from`. Об'єкт `location` описує всі частини URL поточного маршруту, тому можна передати його в пропс `state`.

```jsx title="src/pages/Products.jsx" showLineNumbers
const Products = () => {
  const location = useLocation();

  return (
    <Link to='/product/h-1' state={{ from: location }}>
      Navigate to product h-1
    </Link>
  );
};
```

У властивості `location.state` буде посилання на об'єкт `location` маршруту з якого відбулася навігація. Пропсу `to` компонента `Link` можна передавати не тільки рядок, що описує `href` майбутнього посилання, але й цілий об'єкт `location`.

```jsx title="src/pages/ProductDetails.jsx"
const ProductDetails = () => {
  const location = useLocation();
  console.log(location.state);

  // /products -> products/h-1
  // { from: { pathname: "/products", search: "" } }

  // /products?name=hoodie -> products/h-1
  // { from: { pathname: "/products", search: "?name=hoodie" } }

  return <Link to={location.state.from}>Back to products</Link>;
};
```

Останнє, що необхідно врахувати, це випадок, коли користувач перейшов по збереженому раніше посиланню одного продукту в новій вкладці браузера, а не зі сторінки всіх продуктів. У такому разі значення `location.state` буде `null` і при зверненні до властивості `location.state.from` програма впаде з помилкою. Тому необхідно подбати про значення за замовчуванням для пропсу `to`.

```jsx title="src/pages/ProductDetails.jsx"
const ProductDetails = () => {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/products';

  return <Link to={backLinkHref}>Back to products</Link>;
};
```

Розберіть повний код прикладу магазину одягу з доданим функціоналом повернення зі сторінки одного товару. Змінився код компонентів [`ProductList`](https://codesandbox.io/s/goit-textbook-lesson-10-location-state-92mvqh?from-embed=&file=/src/components/ProductList.jsx) та [`ProductDetails`](https://codesandbox.io/s/goit-textbook-lesson-10-location-state-92mvqh?from-embed=&file=/src/pages/ProductDetails.jsx).

<CP src='https://codesandbox.io/embed/goit-textbook-lesson-10-location-state-92mvqh?fontsize=14&theme=dark' />
