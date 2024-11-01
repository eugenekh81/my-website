---
custom_edit_url: null
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Властивості шрифту

## Властивість `font-size`

Задає розмір шрифту елемента в абсолютних або відносних одиницях виміру. Поки що обмежимося абсолютними одиницями - `px` (пікселями).

```html
<p class="text">
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
  veritatis nihil alias iste odit similique sit eius optio veniam, impedit
  cumque fuga facere labore quo id necessitatibus quaerat rerum.
</p>
```

За замовчуванням розмір шрифту абзаців, який встановлений в таблиці стилів браузера, дорівнює `16px`.

```css
.text {
  font-size: 20px;
}
```

## Властивість `font-weight`

Контролює товщину накреслення (жирність, вага) літер шрифту. Значення властивості можна задавати набором зарезервованих слів або цифрами від `100` до `900` з кроком `100`, які задають ступінь товщини гліфа від тонкого `100` до товстого `900`.

<Image src="/img/HTML/Module--2-2/font-weight.png" alt='Діапазон ваги шрифту' />

```css
font-weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
```

Ключові слова прив'язані до цифр, наприклад `normal` - це `400`, а `bold` - це `700`. У розробці використовуються тільки цифри, завдяки можливості задати однаково точну вагу у всіх браузерах.

```html
<h1 class="title">Iste odit similique sit</h1>
<p class="text">
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
  veritatis nihil alias iste odit similique sit eius optio veniam, impedit
  cumque fuga facere labore quo id necessitatibus quaerat rerum.
</p>
```

За замовчуванням вага шрифту абзаців, який встановлений в таблиці стилів браузера, дорівнює `400`, а вага заголовків - `700`.

```css
/* Поміняємо місцями жирність тексту заголовка і абзацу */
.title {
  font-weight: 400;
}

.text {
  font-weight: 700;
}
```

## Властивість `font-style`

Задає накреслення тексту, наприклад можна зробити текст похилим.

```css
font-style: normal | italic | oblique | initial | inherit;
```

З усіх значень використовують тільки два.

- `normal` - значення за замовчуванням у більшості тегів
- `italic` - текст з курсивом (нахилом)

```html
<h1 сlass="title">Iste odit similique sit</h1>
<p class="text">
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
  veritatis nihil alias iste odit similique sit eius optio veniam, impedit
  cumque fuga facere labore quo id necessitatibus quaerat rerum.
</p>
```

Зробимо текст заголовка похилим.

```css
.title {
  font-style: italic;
}
```

## Властивість `font-family`

**Шрифт** — це набір друкарських літер, цифр і спеціальних знаків певного стилю для набору тексту.

Шрифти ділять на кілька основних груп (сімейств): шрифти із зарубками (serif), шрифти без зарубок (sans-serif), моноширинні (monospace), декоративні та рукописні. MacOS, Linux і Windows містять набір стандартних шрифтів з кожного сімейства. За замовчуванням, якщо жоден інший шрифт не заданий, браузер використовує `Times New Roman` з сімейства із зарубками (serif).

Подивитися, яким шрифтом відображений текст елемента, можна в інструментах розробника на вкладці `Computed`.

<img src='/img/HTML/Module--2-2/rendered-font.png' alt='Шрифт' />

Властивість `font-family` задає шрифт тексту елемента. Через кому можна перерахувати довільну кількість шрифтів, які браузер, в порядку зліва направо, спробує знайти в системі користувача і застосувати перший знайдений.

```css
body {
  font-family: 'Helvetica Neue', 'Roboto', 'Verdana', 'Tahoma', sans-serif;
}
```

В кінці списку завжди вказується сімейство шрифтів на той випадок, якщо жодного перерахованого шрифту не знайдено. Тоді застосується стандартний шрифт з цього сімейства, який є в системі користувача.
