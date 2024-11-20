---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Контекст та useContext

Дані передаються зверху вниз через пропси, але це може бути незручно для певних глобальних даних, які потрібні багатьом компонентам на різних рівнях у додатку (локалізація, тема оформлення, стан авторизації та ін.).

<Image src='/img/React/props-context.png' alt='props-context' />

Контекст забезпечує спосіб передачі даних глибоко по дереву компонентів без необхідності явно передавати пропси в проміжні компоненти вручну на кожному рівні.

:::danger Увага
Не використовуйте контекст, щоб уникнути передачі пропсів на кілька рівнів вниз. Цей механізм призначений для вузького спектра завдань.
:::

## Функція `createContext()`

```jsx showLineNumbers
import { createContext } from 'react';

const MyContext = createContext(defaultValue);
```

- Створює об'єкт контексту, що містить пару компонентів: `<Context.Provider>` (постачальник) та `<Context.Consumer>` (споживач)
- Під час рендеру, споживач прочитає поточне значення контексту з найближчого відповідного постачальника вище у дереві компонентів
- Аргумент `defaultValue` використовується споживачем, якщо в нього немає відповідного постачальника над ним у дереві. На практиці можна не вказувати, тому що немає сенсу намагатися отримати доступ до контексту якого немає

## Компонент `<Provider>`

Дозволяє споживачам підписуватись на зміни контексту. Використовується для створення та передачі контексту.

```jsx showLineNumbers
import { createContext } from "react";
import ReactDOM from "react-dom/client";

const MyContext = createContext(defaultValue);

ReactDOM.createRoot(document.getElementById("root")).render(
  <MyContext.Provider value={/* context value */}>
    <App />
  </MyContext.Provider>
);
```

- Приймає проп `value` - значення контексту, яке буде передано нащадкам-споживачам цього контексту
- Дозволяє споживачам підписуватись на зміни контексту незалежно від глибини вкладеності
- Один провайдер може бути пов'язаний із багатьма споживачами
- Провайдери можуть бути вкладені один в одного

## Хук `useContext()`

Дозволяє отримати доступ до поточного значення контексту. Отримує поточний контекст із найближчого порівнянного `<Provider>` вище у дереві.

```jsx showLineNumbers
import { createContext, useContext } from 'react';

const MyContext = createContext();

const contextValue = useContext(MyContext);
```

- Очікує єдиний аргумент – посилання на створений контекст
- Поверне значення контексту найближчого провайдера для цього контексту вище дереві
- Щоразу, коли оновиться значення контексту, залежний компонент ре-рендерується з новим значенням

### Кастомний хук контексту

Щоразу імпортувати посилання на об'єкт контексту не зручно. Тому робиться кастомний хук для доступу до контексту.

```jsx showLineNumbers
import { createContext, useContext } from 'react';

const MyContext = createContext();

// Імпортуємо та використовуємо цей хук у компонентах
export const useMyContext = () => useContext(MyContext);
```

## Контекст користувача

Напишемо контекст для зберігання інформації про поточний стан користувача - статусу логіну та особистої інформації.

```jsx title="userContext.js" showLineNumbers
import { createContext, useContext } from 'react';

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);
```

Обертаємо провайдером все дерево компонентів. Це можна зробити у компоненті `App` або прямо в головному файлі `index.js`.

```jsx title="index.js" showLineNumbers
import { UserContext } from 'path/to/userContext.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContext.Provider value={{ username: 'Mango' }}>
    <App />
  </UserContext.Provider>
);
```

Додамо компонент меню користувача вкладений у `<App>`, у ньому будемо отримувати значення контексту та відображати ім'я користувача.

```jsx title="App.jsx" showLineNumbers
import { UserMenu } from 'path/to/UserMenu';

const App = () => {
  return (
    <div>
      <UserMenu />
    </div>
  );
};
```

Використовуємо наш кастомний хук `useUser` для доступу до значення контексту.

```jsx title="UserMenu.jsx" showLineNumbers
import { useUser } from 'path/to/userContext.js';

export const UserMenu = () => {
  const { username } = useUser();

  return (
    <div>
      <p>{username}</p>
    </div>
  );
};
```

## Кастомний компонент провайдера

Нині значення контексту не динамічне. Користувач може зареєструватися і розлогінітися, зберігатимемо це в стані компонента. Крім цього необхідні методи його зміни. Створимо кастомний компонент провайдера `<UserProvider>` в якому закриємо логіку роботи зі станом.

```jsx title="userContext.jsx" showLineNumbers
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  const logIn = () => {
    setIsLoggedIn(true);
    setUsername('Mango');
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, username, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
```

Обертаємо все дерево компонентів кастомним провайдером. Це можна зробити в компоненті App або прямо в головному файлі `index.js`.

```jsx title="index.js" showLineNumbers
import { UserProvider } from 'path/to/userContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>
);
```

У компоненті `<App>` все також рендерується компонент меню користувача.

```jsx title="App.jsx" showLineNumbers
import { UserMenu } from 'path/to/UserMenu';

const App = () => {
  return (
    <div>
      <UserMenu />
    </div>
  );
};
```

Використовуємо `useUser` для доступу до значення контексту користувача.

```jsx title="UserMenu.jsx" showLineNumbers
import { useUser } from 'path/to/userContext';

export const UserMenu = () => {
  const { isLoggedIn, username, logIn, logOut } = useUser();

  return (
    <div>
      {isLoggedIn && <p>{username}</p>}
      {isLoggedIn ? (
        <button onClick={logOut}>Log out</button>
      ) : (
        <button onClick={logIn}>Log in</button>
      )}
    </div>
  );
};
```

:::info Все разом
Результат усіх кроків побудови контексту користувача можна переглянути в живому прикладі.

<CP src='https://codesandbox.io/embed/goit-react-lesson-8-usecontext-t6ndci?fontsize=14&hidenavigation=1&theme=dark' />
:::
