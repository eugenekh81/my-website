---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Підключення скрипту

Щоб додати скрипт на веб-сторінку, в HTML-файлі використовується тег `script`, в атрибуті `src` якого, зазначаємо посилання на зовнішній JavaScript-файл.

Щоб підключити JavaScript із зовнішнього файлу:

1. Створіть файл з розширенням '.js' і помістіть його у підпапку 'js'.
1. Вкажіть шлях до файлу скрипту в атрибуті 'src' тегу 'script'.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>JavaScript is fun!</title>
  </head>

  <body>
    <!-- контент -->
    <script src="js/script.js"></script>
  </body>
</html>
```

:::tip[ЦІКАВО]
Розміщення JavaScript файлу в папці `js` не вимагається, однак, - це хороша практика.
:::

Якщо скрипт підключений в `<head>`, рендеринг сторінки зупиняється доти, доки скрипт не завантажиться і повністю виконається. Браузер завантажує і відображає HTML поступово. Якщо він бачить тег `<script>`, без додаткових атрибутів, то спочатку виконується скрипт, і тільки потім обробляється інший код HTML-файлу. Тому, скрипт підключають перед закриваючим тегом `<body>`, після всього вмісту, як у прикладі.

## Декілька скриптів​

Підключаючи декілька JavaScript-файлів до сторінки, інтерпретатор обробляє їх у тому порядку, в якому вони зазначені в HTML-файлі.

```html
<script src="js/script-1.js"></script>
<script src="js/script-2.js"></script>
```
