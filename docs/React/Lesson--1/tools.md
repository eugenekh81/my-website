---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Інструменти

Для створення React-застосунку необхідні `Node.js`, `Webpack`, `Babel`, `React` і `DevTools`. Можна написати свою Webpack-збірку або взяти будь-яку хорошу з GitHub.

## Create React App
Для навчання та маленьких/середніх проектів рекомендується використовувати утиліту від авторів `React`.

- Абстрагує всю конфігурацію, дозволяючи зосередитись на написанні коду
- Включає необхідні інструменти: `Webpack`, `Babel`, `ESLint` тощо
- Розширюється додатковими пакетами з екосистеми React
- Має функцію вилучення, яка видаляє абстракцію і відкриває конфігурацію

```
npx create-react-app ім'я_папки_проекту
```

:::info інформація
Щоб створити застосунок у поточній папці, замість імені проекту ставиться крапка. Наприклад `npx create-react-app .`. Це можна використовувати, коли був склонований репозиторій, і в його локальній версії ініціалізується застосунок.
:::

**npx** — інструмент, призначений для того, щоб допомогти стандартизувати використання npm-пакетів. Постачається з npm версії `5.2.0` та вище. `npm` спрощує встановлення та керування залежностями, розміщеними в реєстрі, a `npx` спрощує використання CLI-утиліт та інших файлів, що виконуються, без необхідності їх встановлення в систему або проект.

[Документація Create React App](https://create-react-app.dev/)

## React DevTools

В інструментах розробника можна подивитися на дерево компонентів, їх стан та пропси. Профайлер корисний під час оптимізації застосунку.

- [Devtools в Chrome Web Store](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- [Introducing the New React DevTools](https://reactjs.org/blog/2019/08/15/new-react-devtools.html)
