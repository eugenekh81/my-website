---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Властивості та атрибути

Під час побудови DOM-дерева, деякі стандартні HTML-атрибути стають властивостями елементів. Подивимося на декілька властивостей, які часто використовуються.

- `value` - містить поточний текстовий контент елементів форм.
- `checked` - зберігає стан чекбокса або радіокнопки.
- `name` - зберігає значення, вказане в HTML-атрибуті `name`.
- `src` - шлях до зображення тегу `<img>`.

<CP src='https://codepen.io/goit-academy/embed/poeLbbd?height=265&theme-id=dark&default-tab=js,result' />

## Властивість `textContent`

`elem.textContent` повертає текстовий контент всередині елемента. Доступний для читання і запису. Неважливо, що буде передано в `textContent`, дані завжди будуть записані як текст.

<CP src='https://codepen.io/goit-academy/embed/wvJmWqd?height=265&theme-id=dark&default-tab=js,result' />

## Властивість `classList`

У властивості `classList` зберігається об'єкт з методами для роботи з класами елемента.

- `elem.classList.contains(cls)` - повертає `true` або `false`, залежно від наявності класу `cls` в елемента.
- `elem.classList.add(cls)` - додає клас `cls` до списку класів елемента.
- `elem.classList.remove(cls)` - видаляє клас `cls` зі списку класів елемента.
- `elem.classList.toggle(cls)` - якщо відсутній клас `cls`, то додає його, якщо - присутній, навпаки - видаляє.
- `elem.classList.replace(oldClass, newClass)` - замінює існуючий клас `oldClass` на вказаний `newClass`.

<CP src='https://codepen.io/goit-academy/embed/qBroNyW?height=265&theme-id=dark&default-tab=js,result' />

## Властивість `style`

Використовується для читання та зміни інлайнових стилів. Повертає об'єкт `CSSStyleDeclaration`, який містить список усіх властивостей, визначених тільки у вбудованих стилях елемента, а не увесь CSS. Під час запису властивості записуються в camelCase, тобто `background-color` перетворюється на `element.style.backgroundColor` тощо.

```js
const button = document.querySelector('.btn');

button.style.backgroundColor = 'teal';
button.style.fontSize = '24px';
button.style.textAlign = 'center';

console.log(button.style); // inline styles object
```

:::tip Цікаво
На практиці стилізація елементів виконується шляхом додавання CSS-класів. Властивість `style` використовується для додавання будь-яких динамічних стилів, наприклад, під час анімації.
:::

## Атрибути

DOM-елементам відповідають HTML-теги, які містять текстові атрибути. Доступ до атрибутів здійснюється за допомогою стандартних методів. Ці методи працюють зі значенням, яке знаходиться в HTML.

- `elem.hasAttribute(name)` - перевіряє наявність атрибута, повертає `true` або `false`.
- `elem.getAttribute(name)` - отримує значення атрибута і повертає його.
- `elem.setAttribute(name, value)` - встановлює атрибут.
- `elem.removeAttribute(name)` - видаляє атрибут.
- `elem.attributes` - властивість, що повертає об'єкт усіх атрибутів елемента.

<CP src='https://codepen.io/goit-academy/embed/VwpXjga?height=265&theme-id=dark&default-tab=js,result' />

## `data-атрибути`

Дозволяють додати до тегу довільний атрибут і отримати його значення в JavaScript. Цю можливість використовують для того, щоб спростити написання коду, наприклад, зв'язати дані і розмітку за унікальним ідентифікатором, вказати тип дії кнопки тощо.

```js
<button type="button" data-action="save">Save</button>
<button type="button" data-action="close">Close</button>
```

Для отримання значення `data-атрибута` використовується властивість `dataset`, після якого стоїть ім'я атрибута. Тобто `data-` відкидається, а інша частина імені записується як ім'я властивості об'єкта.

```js
const saveBtn = document.querySelector('button[data-action="save"]');
console.log(saveBtn.dataset.action); // "save"

const closeBtn = document.querySelector('button[data-action="close"]');
console.log(closeBtn.dataset.action); // "close"
```

<CP src='https://codepen.io/goit-academy/embed/vYxRXYg?height=265&theme-id=dark&default-tab=js,result' />
