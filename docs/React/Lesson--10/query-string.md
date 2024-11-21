---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Рядок запиту

Рядок запиту та його параметри це фундаментальний аспект Інтернету, оскільки він дозволяє передавати стан програми через URL-адресу. Рядок запиту додається до основного URL, починається символом `?` і містить один або більше параметрів у форматі «ключ-значення» розділених символом `&`.

```
https://gomerch.it/products?name=hoodie&color=orange&maxPrice=500
```

Такий рядок запиту містить три параметри та їх значення: назва продукту, колір та максимальну ціну. При переході на цю URL, користувач побачить відповідний, фільтрований список продуктів.

Розглянемо роботу з рядком запиту та його параметрами на прикладі каталогу продуктів, за яким користувач може виконати пошук за назвою та бачити відфільтрований список збігів.

<Image src='/img/React/query-string.png' alt='Gamestore app UI' />

Використання локального стану через хук `useState` добре для одного користувача, але погано для спільної роботи з іншими користувачами. Якщо стан програми знаходиться в URL, ним можна поділитися з іншими користувачами. Наприклад, коли користувач шукає продукти, значення пошуку додається до URL як параметр рядка запиту (`/products?name=hoodie`). Інший користувач, який отримав це посилання, побачить той же фільтрований список продуктів на своїй сторінці, тому що всі дані, необхідні додатку для правильного відображення інтерфейсу, що знаходяться прямо в URL.

## Вилучення параметрів

Для читання та зміни рядка запиту у React Router є хук `useSearchParams`, який є невеликою обгорткою над вбудованим у браузер класом `URLSearchParams`.

```
const [searchParams, setSearchParams] = useSearchParams();
```

Він повертає масив із двох значень: об'єкт параметрів рядка запиту (примірник `URLSearchParams`) для поточного URL та функцію оновлення рядка запиту. Для отримання значень параметрів є метод `URLSearchParams.get(key)`, який чекає на ім'я параметра і повертає його значення або `null` якщо у рядку запиту немає такого параметра.

```jsx title="src/pages/Products.jsx"
import { useSearchParams } from 'react-router-dom';

const Products = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const color = searchParams.get('color');
  const maxPrice = searchParams.get('maxPrice');

  return (
    <div>
      <p>Name: {name}</p>
      <p>Color: {color}</p>
      <p>Maximum price: {maxPrice}</p>
    </div>
  );
};
```

### Тип значень

Метод `get()` завжди поверне рядок незалежно від значення параметра, яке вказано у рядку запиту. Наприклад, для такого рядка запиту `?name=hoodie&maxPrice=500&inStock=true` ми отримаємо такі значення параметрів.

```js showLineNumbers
const [searchParams] = useSearchParams();

const name = searchParams.get('name');
console.log(name, typeof name); // "hoodie", string

const maxPrice = searchParams.get('maxPrice');
console.log(maxPrice, typeof maxPrice); // "500", string

const inStock = searchParams.get('inStock');
console.log(inStock, typeof inStock); // "true", string
```

:::info Приведення типів
Якщо параметри це числа чи булі, для отримання значення правильного типу потрібно виконати приведення типів. Це можна зробити вбудованими класами `Number(value)` та `Boolean(value)`.
:::

### Параметри як об'єкт

Якщо рядок запиту містить кілька параметрів, постійно використовувати метод `get()` може бути незручно. Ось простий спосіб перетворити екземпляр класу `URLSearchParams` у звичайний об'єкт із властивостями.

```jsx showLineNumbers
const [searchParams] = useSearchParams();
const params = useMemo(
  () => Object.fromEntries([...searchParams]),
  [searchParams]
);
const { name, maxPrice, inStock } = params;
```

:::info Мемоізація
Мемоізуємо операцію перетворення об'єкта параметрів, щоб отримувати посилання на новий об'єкт лише якщо зміняться параметри рядка запиту, а не при кожному рендері компоненту.
:::

## Зміна рядка запиту

Для зміни параметрів використовуємо функцію, яку useSearchParams повертає другим елементом масиву. Їй необхідно передати об'єкт нових параметрів, який повністю замінить поточний рядок запиту.

```jsx showLineNumbers
import { useSearchParams } from 'react-router-dom';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name');

  return (
    <div>
      <h1>Products</h1>
      <input
        type='text'
        value={name}
        onChange={(e) => setSearchParams({ name: e.target.value })}
      />
    </div>
  );
};
```

Розберіть повний код прикладу сторінки всіх продуктів ([`Products`](https://codesandbox.io/s/goit-textbook-lesson-10-query-string-3msb5f?from-embed=&file=/src/pages/Products.jsx)), в якому реалізовано зміну рядка запиту та фільтрацію списку. Зверніть увагу на те, як зроблено видалення параметра `name`, якщо значення поля введення це порожній рядок.

<CP src='https://codesandbox.io/embed/goit-textbook-lesson-10-query-string-3msb5f?fontsize=14&theme=dark' />

## Відстеження змін

Якщо змінюється рядок запиту, хук `useSearchParams` повертає нове значення параметрів і компонентів оновлюється, тому можна зреагувати на це і запустити ефект.

```jsx showLineNumbers
const App = () => {
  const [user, setUser] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get('username');

  useEffect(() => {
    // Тут виконуємо асинхронну операцію,
    // наприклад HTTP-запит за інформацією про користувача
    if (username === '') return;

    async function fetchUser() {
      const user = await FakeAPI.getUser(username);
      setUser(user);
    }

    fetchUser();
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams({ username: form.elements.username.value });
    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='text' name='username' />
        <button type='submit'>Search</button>
      </form>
      {user && <UserInfo user={user} />}
    </>
  );
};
```
