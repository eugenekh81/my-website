---
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CPN } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Анімовані властивості

Як і переходи, анімація надає веб-сторінкам динамічність, але, на відміну від переходів, анімації не потрібен обов'язковий ініціатор (подія), її можна повторити нескінченну кількість разів, і між початковим і кінцевим станами може бути будь-яка кількість проміжних станів.

<img src='/img/HTML/Module--5-2/animation-states-uk.png' alt='CSS анімація' style={{ marginBottom: '20px' }} />

## Оголошення анімації

Анімація оголошується директивою `@keyframes`, яка дозволяє описати набір **кадрів** (frames, станів) анімації, яких повинно бути як мінімум два (початковий і кінцевий).

```css
/* Ім'я повинно бути описовим, тобто, що це за анімація. */
@keyframes ім'яАнімації {
  /* Тут будуть описуватися кадри */
}
```

Кадри визначають, у який момент часу змінюються анімовані властивості, і описуються ключовими словами `from` (псевдонім `0%`) і `to` (псевдонім `100%`) або, найчастіше, у вигляді відсотків в діапазоні `0%-100%`, оскільки відсотки дозволяють вказати довільне значення.

```css
/* Ім'я повинно бути описовим, тобто, що це за анімація. */
@keyframes ім'яАнімації {
  0% {
    /* Властивості для зміни */
  }

  /* Довільна кількість проміжних кадрів */

  100% {
    /* Властивості для зміни */
  }
}
```

:::tip[Корисно]
В анімації не вказується час або елемент, до якого вона буде застосовуватися, це означає, що одну і ту саму анімацію можна використовувати повторно для різних елементів.
:::

Оголосимо анімацію для зміни кольору фону елемента в трьох точках: `0%`, `50%` і `100%`.

```css
@keyframes changeBgColor {
  0% {
    background-color: teal;
  }

  50% {
    background-color: orange;
  }

  100% {
    background-color: deepskyblue;
  }
}
```

## Властивості анімації

### `animation-name`

Щоб використовувати вже оголошену анімацію, потрібно вказати її ім'я як значення для властивості `animation-name`.

```css
.box {
  animation-name: changeBgColor;
}
```

Анімацію можна додати до селектора, тоді вона буде застосована відразу під час завантаження сторінки. Так само можна застосувати анімацію на підставі події, наприклад ховеру або фокусу, використовуючи відповідні псевдокласи.

```css
.box {
  /* Базові стилі елемента */
}

/* Додаємо анімацію по ховеру */
.box:hover {
  animation-name: changeBgColor;
}
```

### `animation-duration`

Встановлює тривалість анімації - час, за який будуть пройдені всі кадри. Задається в секундах або мілісекундах. Якщо не поставити тривалість, анімація буде миттєвою.

```css
.box {
  animation-name: changeBgColor;
  /* highlight-start */
  animation-duration: 3000ms;
  /* highlight-end */
}
```

За замовчуванням анімація відбувається один раз і фінальні значення анімованих властивостей не зберігаються, натомість елемент повертається до свого вихідного стану.

<CPN src='https://codepen.io/goit-academy/embed/eYJPRQO?height=265&theme-id=default&default-tab=css,result' />

### `animation-timing-function`

Встановлює [**`функцію розподілу часу`**](https://cubic-bezier.com/#.17,.67,.83,.67) для анімації, значення аналогічні `transition-timing-function` в CSS-переходах.

```css
.box {
  animation-name: changeBgColor;
  animation-duration: 3000ms;
  /* highlight-start */
  animation-timing-function: linear;
  /* highlight-end */
}
```

### `animation-delay`

Встановлює затримку перед початком анімації в секундах або мілісекундах.

```css
.box {
  animation-name: changeBgColor;
  animation-duration: 3000ms;
  animation-timing-function: linear;
  /* highlight-start */
  animation-delay: 1000ms;
  /* highlight-end */
}
```

### `animation-iteration-count`

Встановлює кількість повних повторень анімації.

```css
.box {
  animation-name: changeBgColor;
  animation-duration: 3000ms;
  animation-timing-function: linear;
  /* highlight-start */
  animation-iteration-count: 5;
  /* highlight-end */
}
```

Значення може бути цілим додатним числом або ключовим словом `infinite` - це зробить анімацію нескінченною.

<CPN src='https://codepen.io/goit-academy/embed/yLeRoMN?height=265&theme-id=default&default-tab=css,result' />

### `animation-direction`

Контролює напрямок відтворення анімації - від початкового до кінцевого кадру, навпаки від кінцевого кадру до початкового, або, можливо необхідно, щоб порядок чергувався на кожному повторенні.

```css
.box {
  animation-name: changeBgColor;
  animation-duration: 3000ms;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  /* highlight-start */
  animation-direction: alternate;
  /* highlight-end */
}
```

- `normal` - анімація відтворюється від початкового до кінцевого кадру, після чого відразу повертається у початковий кадр для наступного повторення (скидається до початкового стану). Це значення за замовчуванням.
- `reverse` - анімація відтворюється у зворотному напрямку, починаючи від кінцевого кадру і до початкового, після чого відразу повертається у кінцевий кадр для наступного повторення.
- `alternate` - перший раз відтворення починається від початкового і до кінцевого кадру, після чого відбувається зміна напрямку на кожному наступному повторенні.
- `alternate-reverse` - перший раз відтворення починається від кінцевого і до початкового кадру, після чого відбувається зміна напрямку на кожному наступному повторенні.

<CPN src='https://codepen.io/goit-academy/embed/zYrmEqW?height=265&theme-id=default&default-tab=result' />

### `animation-fill-mode`

Визначає, що відбувається зі стилями елемента до початку анімації і після її завершення. Тобто дозволяє вказати, чи повинні стилі анімації застосовуватися до елементу поза анімацією.

```
animation-fill-mode: none | forwards | backwards | both
```

- `none` - стилі анімації впливають на елемент тільки під час анімації. До і після анімації елемент знаходиться у своєму початковому стані. Значення за замовчуванням.
- `forwards` - стилі, застосовані в кінці анімації, залишаються на елементі після її завершення.
- `backwards` - стартові стилі анімації будуть застосовані до елемента ще до старту анімації.
- `both` - поєднує forwards і backwards, стилі застосовуються до і після анімації.

<CPN src='https://codepen.io/goit-academy/embed/jOWXoJM?height=265&theme-id=default&default-tab=result' />

### `animation-play-state`

Дозволяє призупинити відтворення анімації. За замовчуванням встановлено значення `running`. Якщо встановити значення `paused`, наприклад при `:hover`, анімація буде припинена, доки курсор миші знаходиться над елементом.

<CPN src='https://codepen.io/goit-academy/embed/gOPBoPj?height=265&theme-id=default&default-tab=css,result' />

## Властивість `animation`

Збірна властивість дозволяє коротше записати властивості анімації.

```
animation: [name] [duration] [timing-function] [delay] [iteration-count] [direction] [fill-mode] [play-state]
```

Значення необов'язкових властивостей можна пропустити або поміняти місцями. Виняток становлять властивості `duration` і `delay` - значення тривалості анімації завжди повинно зазначатися до затримки.

```css
.box {
  animation: magic 2s infinite;
}

.box {
  animation: magic 2s 0.5s ease-in-out;
}

.box {
  animation: magic 2s ease-in-out 0.5s forwards;
}

.box {
  animation: magic 2s forwards infinite ease-out 0.5s;
}

@keyframes magic {
  /* ... */
}
```
