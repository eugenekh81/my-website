---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Нормалізація стилів

Стилі елементів можуть відрізнятись між браузерами. Для того, щоб привести їх до стандартного вигляду, необхідно додати набір правил, що виправляє відмінності у стилях елементів між браузерами, наскільки це можливо.

У Create React App вбудована можливість використовувати [PostCSS Normalize](https://github.com/csstools/postcss-normalize) - суміш кількох популярних таблиць стилів ([normalize.css](https://github.com/csstools/normalize.css) та [sanitize.css](https://github.com/csstools/sanitize.css)) з найкращими практиками нормалізації. Все, що необхідно зробити - це додати директиву `@import-normalize`; у будь-якому місці файлу стилів або CSS-модуля. Повторюючі імпорти будуть автоматично видалені, тому достатньо додати директиву до одного файлу стилів, наприклад `index.css`.

```css title="src/index.css" showLineNumbers
@import-normalize;

/* Решта стилів файлів */
```

:::info Налаштування VSCode
Якщо у VSCode ви бачите попередження `«Unknown at rule @import-normalize css(unknownAtRules)»`, змініть у редакторі значення налаштування `css.lint.unknownAtRules` на `ignore`.
:::

Залишилось імпортувати файл стилів `index.css` з підключеною нормалізацією в JavaScript модуль, наприклад в кореневий файл програми `index.js` або у файл компонента `App.js`.

```jsx title="src/index.js" showLineNumbers
import "./index.css";

/* Решта коду файлу */
```

Крім стандартизації зовнішнього вигляду елементів може бути корисно скинути або додати деякі глобальні стилі елементів. Наприклад, відступи списків та заголовків, стилі зображень, стилі елемента `<body>` і тому подібне. Буде логічно зробити це в тому ж файлі, в якому додавалася нормалізація.

```css title="src/index.css" showLineNumbers
@import-normalize;
body {
  font-family: sans-serif;
  line-height: 1.5;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}

ul,
ol {
  margin: 0;
  padding: 0;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}
```
