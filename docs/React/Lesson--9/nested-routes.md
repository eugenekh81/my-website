---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Вкладені маршрути

Вкладені маршрути дозволяють описувати логіку «підсторінок», тобто якийсь URL по якому крім батьківського компонента цілої сторінки буде відображатися ще якийсь дочірній, вкладений компонент.

Наприклад, нам необхідно щоб на `/about/mission`, `/about/team` та `/about/reviews` крім контенту сторінки «Про нас» відображалася ще якась додаткова, більш специфічна інформація. Нехай це буде кілька різноманітних компонентів: стаття про місію нашої компанії, галерея з інформацією про співробітників та відгуки користувачів.

```jsx showLineNumbers
// ❌ Неправильно
<Route path="/about" element={<About />} />
<Route path="/about/mission" element={<Mission />} />
<Route path="/about/team" element={<Team />} />
<Route path="/about/reviews" element={<Reviews />} />
```

Якщо описати маршрути так, то отримаємо чотири незалежні сторінки. На `/about` буде відображатися лише сторінка інформації, а, наприклад, на `about/team` галерея співробітників, це не те, що нам потрібно. Використовуємо синтаксис оголошення вкладеного маршруту, компонент якого відображатиметься всередині батьківської сторінки.

```jsx showLineNumbers
// ✅ Правильно
<Route path="/about" element={<About />}>
  <Route path="mission" element={<Mission />} />
  <Route path="team" element={<Team />} />
  <Route path="reviews" element={<Reviews />} />
</Route>
```

Зверніть увагу на кілька особливостей:

- Ми декларативно вклали дочірні маршрути всередину батьківського `<Route>`. Саме такий синтаксис вказує на вкладений маршрут, компонент якого буде відображатися десь усередині батьківського компонента
- Значення пропсу `path` у вкладеного маршруту вказується відносно батьківського, саме тому ми передали значення `path="mission"`, а не повний шлях `path="/about/mission"`
Відносні шляхи записуються без провідного символу `/`, тобто `path="mission"`, а не `path="/mission"`. Якщо додати слеш, то ми навпаки створимо окремий маршрут `/mission` та зламаємо логіку маршрутизації.

Повна конфігурація маршрутів нашої програми виглядатиме так.

```jsx title="App.jsx" showLineNumbers
import { Routes, Route, Link } from "react-router-dom";
import Home from "path/to/pages/Home";
import About from "path/to/pages/About";
import Products from "path/to/pages/Products";
import NotFound from "path/to/pages/NotFound";
import ProductDetails from "path/to/pages/ProductDetails";
import Mission from "path/to/components/Mission";
import Team from "path/to/components/Team";
import Reviews from "path/to/components/Reviews";

export const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}>
          <Route path="mission" element={<Mission />} />
          <Route path="team" element={<Team />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
```

Останнє, що обов'язково необхідно зробити, це вказати де саме в компоненті батьківського маршруту `<About>` ми хочемо рендерувати дочірні маршрути. Для цього у React Router є компонент `<Outlet>`.

```jsx title="src/pages/About.jsx" showLineNumbers
import { Link, Outlet } from "react-router-dom";

export const About = () => {
  return (
    <div>
      <h1>About page</h1>
      <ul>
        <li>
          <Link to="mission">Read about our mission</Link>
        </li>
        <li>
          <Link to="team">Get to know the team</Link>
        </li>
        <li>
          <Link to="reviews">Go through the reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};
```

Якщо поточний URL в адресному рядку браузера збігається зі значенням пропсу path вкладеного маршруту, `<Outlet>` відрендерить його компонент, інакше він рендерить `null` та не впливає на розмітку батьківського компонента.

:::info Відносні посилання
Зверніть увагу на значення пропсу to компонента `<Link>`. Так само, як і `path` вкладеного маршруту, значення пропсу to вкладених посилань вказується відносно поточного URL. Компонент `<About>` рендерується на адресу `/about`, тому посилання з `to="mission"` буде вести на `/about/mission`. Якщо необхідно зробити посилання на іншу сторінку, тоді вказуйте шлях повністю, наприклад `to="/products"`.
:::

Розберіть код доповненого прикладу програми магазину, в якому використовується весь матеріал, який ми з вами розібрали до цього моменту.

<CP src='https://codesandbox.io/embed/goit-textbook-lesson-9-nested-routes-2hui2h?fontsize=14&theme=dark' />
