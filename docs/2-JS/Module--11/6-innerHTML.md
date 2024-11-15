---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Властивість `innerHTML`

Ще один спосіб створити DOM-елементи і помістити їх в дерево - це використовувати рядки з тегами і дозволити браузеру зробити всю важку роботу. У такого підходу є свої плюси і мінуси.

## Читання

Властивість `innerHTML` зберігає вміст елемента, включно з тегами, у вигляді рядка. Значення, що повертається, - це завжди валідний HTML-код.

<CP src='https://codepen.io/goit-academy/embed/ZEeRegd?height=265&theme-id=dark&default-tab=js,result' />

## Зміна

Властивість `innerHTML` доступна і для читання, і для запису. Якщо записати в неї рядок з HTML-тегами, то браузер під час парсингу рядка перетворить їх у валідні елементи і додасть в DOM-дерево.

<CP src='https://codepen.io/goit-academy/embed/JjWZNKb?height=265&theme-id=dark&default-tab=js,result' />

:::tip Цікаво
Якщо у властивість innerHTML записати порожній рядок, то вміст елемента буде очищено. Це простий і швидкий спосіб видалення всього вмісту.
:::

За такого підходу, на відміну від `document.createElement()`, ми не отримуємо посилання на створений DOM-елемент. Це перший крок на шляху до шаблонізації - створення великої кількості однотипної розмітки з різними даними за наперед визначеним шаблоном. Наприклад, як у списку товарів інтернет магазину тощо.

Однотипна (шаблонна) розмітка створюється із масиву даних. Прийом полягає у перебиранні цього масиву і складанні одного рядка з HTML-тегами, який потім записуємо в innerHTML елемента.

<CP src='https://codepen.io/goit-academy/embed/qBrKmJP?height=265&theme-id=dark&default-tab=js,result' />

## Додавання

Зміна `elem.innerHTML` повністю видалить і повторно створить всі нащадки елемента `elem`. Якщо елемент спочатку не був порожній, то виникнуть додаткові витрати на серіалізацію вже існуючої розмітки, а це погано.

<CP src='https://codepen.io/goit-academy/embed/QWpxvqR?height=265&theme-id=dark&default-tab=js,result' />

:::tip Цікаво
Використовуйте властивість `elem.innerHTML` для додавання тільки тоді, коли елемент `elem` - порожній, або якщо потрібно повністю замінити його вміст.
:::

## Метод `insertAdjacentHTML()`

Сучасний метод для додавання рядка з HTML-тегами перед, після або всередину елемента. Вирішує проблему `innerHTML` з повторною серіалізацією вмісту елемента під час додавання розмітки до вже існуючої.

```js
elem.insertAdjacentHTML(position, string);
```

Аргумент `position` - це рядок, позиція щодо елемента `elem`. Приймає одне з чотирьох значень.

<Image src='/img/JS/insert-adjacent.png' alt='Варінти позиції' />

- `"beforebegin"` - перед `elem`
- `"afterbegin"` - всередині `elem`, перед усіма дітьми
- `"beforeend"` - всередині `elem`, після усіх дітей
- `"afterend"` - після `elem`

<CP src='https://codepen.io/goit-academy/embed/mdWKMOE?height=265&theme-id=dark&default-tab=js,result' />

::: Цікаво
`"beforebegin"` і `"afterend"` працюють тільки тоді, коли `elem` вже знаходиться в DOM-дереві.
:::
