---
custom_edit_url: null
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Мапи (словники)

Оголосимо кілька змінних для зберігання палітри кольорів проекту. Вони слабо пов'язані, по суті - це просто набір змінних з префіксом `color` для зазначення того, що вони зберігають колір.

```css title="_colors.scss"
$color-primary: #8e3329;
$color-accent: #d98328;
$color-secondary: #5a1321;
$color-foreground: #191919;
$color-background: #e9e9e9;
```

Мапа (словник) дозволяє зберігати набір пов'язаної інформації у форматі `термін: визначення`. Наприклад, замість декількох непов'язаних змінних, що зберігають палітру проекту, можна записати мапу кольорів. Мапа складається з імені змінної, в якій вона зберігається, і набору властивостей у форматі `ключ: значення`, розділених комами всередині пари круглих дужок.

```css title="_colors.scss"
  $colors: (
    'primary': #8e3329,
    'accent': #d98328,
    'secondary': #5a1321,
    'foreground': #191919,
    'background': #e9e9e9,
  );
```

Ім'я кольору може бути довільне - це просто назва властивості. Така мапа дозволить впорядковано і багаторазово отримувати доступ до кольорів. Для того щоб отримати значення властивості, використовується вбудована SASS-функція `map-get()`.

```
map-get(ім'я_мапи, ім'я_властивості)
```

Першим аргументом передаємо ім'я змінної, в якій знаходиться словник, другим - ім'я властивості, значення якого необхідно отримати. Ім'я властивості повинно бути рядком, тобто взяте в одинарні або подвійні лапки.

```css title="main.scss"
@import 'шлях/до/colors';

body {
  background-color: map-get($colors, 'background');
}
```

Постійно писати `map-get()` і передавати ім'я мапи незручно. Напишемо свою функцію-утиліту для простішого доступу до властивостей мапи кольорів. Цю функцію оголошуємо у тому ж файлі, де знаходиться мапа.

```css title="_colors.scss"
  $colors: (
    'primary': #8e3329,
    'accent': #d98328,
    'secondary': #5a1321,
    'foreground': #191919,
    'background': #e9e9e9,
  );

@function getColor($key) {
  @return map-get($colors, $key);
}
```

Після імпорту файлу `_colors.scss` можна використовувати функцію `getColor(ім'я_властивості)`.

```css title="main.scss"
@import 'шлях/до/colors';

.button {
  color: getColor('primary');
  background-color: getColor('background');
}
```
