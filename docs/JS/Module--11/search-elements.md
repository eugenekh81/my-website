---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Пошук елементів

Отже, ми вже знаємо що DOM-елемент - це об'єкт з властивостями і методами. Саме час навчитися швидко знаходити елемент за довільним CSS-селектором. Група методів `elem.querySelector` - це сучасний стандарт для пошуку елементів. Вони дозволяють знайти елемент або групу елементів за CSS-селектором будь-якої складності.

```js
element.querySelector(selector);
```

Використовується, якщо необхідно знайти тільки один, найчастіше унікальний елемент.

- Повертає перший знайдений елемент всередині element, що відповідає CSS-селектору `selector`
- Якщо нічого не знайдено, поверне `null`

```js
element.querySelectorAll(selector);
```

Використовується, якщо необхідно знайти колекцію елементів, тобто отримати масив посилань на елементи з однаковим селектором. Наприклад, всі елементи списку з класом `menu-item`.

- Повертає псевдомасив всіх елементів всередині `element`, які відповідають CSS-селектору `selector`
- Якщо нічого не знайдено, поверне порожній масив

Відкрий цей приклад в окремому вікні і подивися логи в консолі розробника.

<CP src='https://codepen.io/goit-academy/embed/wvJmGbG?height=265&theme-id=dark&default-tab=js,result' />
