---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Псевдокласи стану

Селектори стану використовуються для застосування стилів до інтерактивних елементів за певної події, наприклад, у разі наведення курсору на посилання або фокусування з клавіатури.

Псевдоклас визначає конкретний стан елемента і прикріплений до селектора тегу, класу тощо. Пробілу між селектором і псевдокласом немає, щоб показати, що вони пов'язані один з одним. Якщо додати пробіл, то псевдоклас застосується до всіх елементів в документі.

```css
селектор:псевдоклас {
  /* Властивості */
}
```

## Псевдоклас `:hover`

Активується, коли курсор миші знаходиться в межах елемента, наприклад, при наведенні миші на посилання або будь-який інший елемент.

```html
<p>
  Хорошу шпаргалку з тегів можна знайти
  <a class="link" href="https://htmlreference.io">за посиланням</a>.
</p>
```

Псевдокласи можна застосовувати до будь-яких селекторів, і навіть контекстних.

```html
<ul class="social-links">
  <li><a class="link" href="https://twitter.com">Twitter</a></li>
  <li><a class="link" href="https://www.instagram.com">Instagram</a></li>
  <li><a class="link" href="https://www.facebook.com">Facebook</a></li>
</ul>
```

Додамо посиланню всередині списку базовий стиль і стиль наведення.

```css
.social-links .link {
  color: teal;
}
/* highlight-start */
.social-links .link:hover {
/* highlight-end */
  color: tomato;
}
```

:::tip[Корисно]
Такий селектор читається як «При ховері по елементам з класом `link`, які знаходяться всередині елемента з класом `social-links`». Тобто читаються селектори справа наліво.
:::

## Псевдоклас `:focus`

Активується, коли інтерактивний елемент (посилання, кнопка, поле форми) отримує фокус під час навігації по сторінці клавіатурою (клавішею `Tab`).

```html
<ul class="social-links">
  <li><a class="link" href="https://twitter.com">Twitter</a></li>
  <li><a class="link" href="https://www.instagram.com">Instagram</a></li>
  <li><a class="link" href="https://www.facebook.com">Facebook</a></li>
</ul>
```

Додамо посиланню всередині списку базовий стиль і стиль фокусу.

```css
.social-links .link {
  color: teal;
}
/* highlight-start */
.social-links .link:focus {
/* highlight-end */
  color: orange;
}
```

Для того щоб врахувати наведення і фокусування, варто стилізувати відразу обидва стани. Це робиться простим переліченням селекторів.

```css
.social-links .link {
  color: teal;
}

/* Два і більше селекторів розділяються комою */
/* highlight-start */
.social-links .link:hover,
.social-links .link:focus {
  /* highlight-end */
  color: orange;
}
```

## Псевдоклас `:active`

Відбувається під час активації елемента. Наприклад, посилання стає активним, якщо навести на нього курсор і клацнути мишкою. Незважаючи на те, що активним може стати практично будь-який елемент, псевдоклас :active використовується в основному для посилань і кнопок.

```html
<ul class="social-links">
  <li><a class="link" href="https://twitter.com">Twitter</a></li>
  <li><a class="link" href="https://www.instagram.com">Instagram</a></li>
  <li><a class="link" href="https://www.facebook.com">Facebook</a></li>
</ul>
```

```css
.social-links .link {
  color: teal;
}

.social-links .link:hover,
.social-links .link:focus {
  color: orange;
}
/* highlight-start */
.social-links .link:active {
  /* highlight-end */
  color: red;
}
```

## Псевдоклас `:visited`

Цей псевдоклас активується на посиланнях, які вже були відвідані. За замовчуванням посилання відображаються синіми і після відвідування стають фіолетовими.

```html
<ul class="social-links">
  <li><a href="https://twitter.com" class="link">Twitter</a></li>
  <li><a href="https://www.instagram.com" class="link">Instagram</a></li>
  <li><a href="https://www.facebook.com" class="link">Facebook</a></li>
</ul>
```

```css
.social-links .link {
  color: teal;
}

.social-links .link:hover,
.social-links .link:focus {
  color: orange;
}

.social-links .link:active {
  color: red;
}
/* highlight-start */
.social-links .link:visited {
  /* highlight-end */
  color: green;
}
```


## Ховер і таблиці

Псевдоклас `:hover` не обов'язково повинен застосовуватися до посилань, його можна додавати і до інших елементів документа. Наприклад, до рядків або клітинок таблиці, щоб вони змінювали колір фону під час наведення курсору миші.

```html
<table class="schedule">
  <thead>
    <tr>
      <th>Номер</th>
      <th>Маршрут</th>
      <th>Час у дорозі</th>
    </tr>
  </thead>

  <tbody class="schedule-body">
    <tr>
      <td>433</td>
      <td>Київ - Ковель</td>
      <td>5 годин</td>
    </tr>
    <tr>
      <td>701</td>
      <td>Харків - Дніпро</td>
      <td>7 годин</td>
    </tr>
    <tr>
      <td>258</td>
      <td>Львів - Одеса</td>
      <td>4 годин</td>
    </tr>
  </tbody>
</table>
```

Додамо базове оформлення таблиці і стилі для ховера по рядках.

```css
/* highlight-start */
.schedule-body > tr:hover {
  background-color: tomato;
  color: white;
}
  /* highlight-end */
/* Оформлення таблиці */
.schedule {
  border-collapse: collapse;
}

.schedule th,
.schedule td {
  padding: 8px;
  border: 1px solid #212121;
}
```

Ось робочий приклад.

<CodePenSnippet src='https://codepen.io/goit-academy/embed/wvWwRxg?height=265&theme-id=default&default-tab=css,result' />

## Властивість `cursor`

Встановлює тип вказівника миші, коли він знаходиться в межах елемента. Вид курсору залежить від операційної системи і її налаштувань. Міняти тип курсору просто так - погана ідея, це тільки заплутає користувача, коли, замість звичної руки або лупи, він побачить щось інше. Здебільшого краще залишити все як є.

Наводьте мишкою на текст (значення властивості) і курсор буде змінювати свій вигляд.

<CodePenSnippet src='https://codepen.io/goit-academy/embed/WNryoZK?height=265&theme-id=default&default-tab=result' />
