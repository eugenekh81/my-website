---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Компоненти `<Link>` та `<NavLink>`

Тепер розглянемо, як створювати посилання на різні сторінки нашої програми. Для створення навігації не можна використовувати звичайний тег `<a href="/about">`. При кліку, замість того щоб змінити URL на поточній сторінці, і дозволити маршрутизатору виконати навігацію на стороні клієнта, браузер перезавантажить сторінку.

Для створення посилань використовуються компоненти `<Link>` та `<NavLink>`. Вони рендерять тег `<a>`, але стандартна поведінка посилання змінена так, що при натисканні просто оновлюється URL в адресному рядку браузера, без перезавантаження сторінки.

```jsx showLineNumbers
<nav>
  <Link to='/'>Home</Link>
  <Link to='/about'>About</Link>
  <Link to='/products'>Products</Link>
</nav>
```

Компонент `<NavLink>` відрізняється тільки тим, що може мати додаткові стилі, якщо поточний URL збігається зі значенням пропcа `to`. За замовчуванням елементу активного посилання додається клас `active`. Це можна використовувати для її стилізації.

```jsx title="App.jsx" showLineNumbers
import { Routes, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Home from 'path/to/pages/Home';
import About from 'path/to/pages/About';
import Products from 'path/to/pages/Products';

const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: orange;
  }
`;

export const App = () => {
  return (
    <div>
      <nav>
        <StyledLink to='/' end>
          Home
        </StyledLink>
        <StyledLink to='/about'>About</StyledLink>
        <StyledLink to='/products'>Products</StyledLink>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<Products />} />
      </Routes>
    </div>
  );
};
```
