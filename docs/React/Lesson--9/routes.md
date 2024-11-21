---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Компоненти `<Route>` та `<Routes>`
Компонент `<Route>` дозволяє пов'язати певний URL з деяким компонентом. Наприклад, якщо ми хочемо відображати компонент `<About>` коли користувач переходить шляхом `/about`, необхідно буде описати такий маршрут.

```jsx
<Route path="/about" element={<About />} />
```

Значенням пропсу `element` може бути будь-який валідний JSX, але на практиці використовують лише компоненти.

:::info Як це працює
Компонент `<Route>` завжди щось рендерить. Те, що зазначено у пропсі `element` якщо його `path` збігається з поточним значенням сегмента `pathname` в адресному рядку браузера, або `null`, якщо не збігається.
:::

Маршрутів може бути довільна кількість, як мінімум по одному на кожну сторінку програми. Припустимо ми створюємо додаток магазину одягу, тому опишемо маршрути трьох сторінок.

```jsx title="App.jsx" showLineNumbers
import { Routes, Route } from "react-router-dom";
import Home from "path/to/pages/Home";
import About from "path/to/pages/About";
import Products from "path/to/pages/Products";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
};
```

Групу маршрутів обов'язково має обертати компонент `<Routes>`, навіть якщо маршрут лише один. Тобто `<Route>` не може використовуватися без `<Routes>`. Цей компонент виконує логіку підбору найбільш відповідного `<Route>` для поточного значення URL в адресному рядку браузера.

:::info Компоненти сторінок
Ви вже знаєте, що конвенція структури файлів програми передбачає зберігання всіх компонентів у папці `src/components`. Компонент сторінки це звичайнісінький React-компонент, який містить у собі розмітку цілої сторінки вашої програми. Для зручності та структурованості такі компоненти зберігаються окремо від усіх, у папці `src/pages`.
:::

## Сторінка помилки навігації
Що буде, якщо користувач перейде за посиланням `/non-existing-route` або будь-якому іншому, якого немає в нашому додатку? Він побачить порожню вкладку браузера, без будь-якого контенту, оскільки жоден з описаних нами `<Route>` не підійде. Для цього до кінця списку маршрутів додамо ще один `<Route>`, який збігатиметься з будь-яким URL, але він буде обраний тільки в тому випадку, якщо жоден інший маршрут не підійде.

```jsx showLineNumbers
import { Routes, Route } from "react-router-dom";
import Home from "path/to/pages/Home";
import About from "path/to/pages/About";
import Products from "path/to/pages/Products";
import NotFound from "path/to/pages/NotFound";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
```

Символ `*` у пропсі `path` буквально вказує на те, що цей маршрут може збігатися з будь-яким значенням URL. Тому якщо жоден попередній `<Route>` не підійде, останній точно відобразить користувачеві сторінку з якимось повідомленням про те, що маршруту яким він перейшов, не існує.
