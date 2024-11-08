---
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CPN } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# CSS-переходи

CSS-переходи дозволяють анімувати зміну значення властивості з плином часу, керуючи швидкістю цього переходу. Зміна властивостей відбувається під час настання певної події, яка описується відповідним псевдокласом, наприклад `:hover`.

**Перехід завжди має тільки два стани** - початкове та кінцеве значення властивості, і вміє змінювати це значення `A > B` і `B > A` за вказаний час. Для анімацій з великою кількістю станів необхідно використовувати CSS-анімацію.

<img src='/img/HTML/Module--5-2/transition-states-uk.png' alt='Ілюстрація переходу' />

Наступні чотири властивості управляють різними параметрами переходу.

```
transition-property: <властивість>
transition-duration: <час>
transition-timing-function: <функція розподілу часу>
transition-delay: <затримка>
```

Все, що необхідно зробити - це вказати початкові значення анімованих властивостей і значення властивостей переходу, після чого під час події, наприклад `:hover`, задати нові значення властивостей, до яких ми хочемо анімувати елемент. Наведіть курсор миші на квадрат для запуску переходу.

<CPN src='https://codepen.io/goit-academy/embed/pogOBLb?height=265&theme-id=default&default-tab=result' />

:::tip[Корисно]
Пам'ятайте, під час додавання будь-яких переміщень (переходів та анімацій), вони повинні бути простими, не нав'язливими і логічними. Анімація повинна передавати смислове значення, акцентуючи увагу, не відволікаючи користувача від взаємодії з контентом.
:::

## Властивість `transition-property`

Задає властивості, до яких буде застосований ефект переходу. Значенням може бути одна властивість або список властивостей через кому. За замовчуванням значення `all` - анімуються всі можливі властивості.

```css
.box {
  background-color: teal;
  transition-property: background-color;
}

.box:hover {
  background-color: orange;
}
```

:::warning[Увага]
Список властивостей, які можуть бути анімовані в майбутньому може змінитися. Тому обов'язково необхідно вказувати властивість, яку потрібно анімувати, інакше будуть анімовані всі можливі властивості елемента, що призведе до несподіваних результатів.
:::

## Властивість `transition-duration`

Якщо тривалість переходу не вказана, то зміна значень відбудеться миттєво без анімації. Властивість `transition-duration` задає проміжок часу, протягом якого повинен відбутися перехід. Вказується в секундах, наприклад `2s` або `0.5s`, або в мілісекундах - `2000ms` і `500ms` відповідно. Якщо різні властивості мають різні значення часу переходу, то вони вказуються через кому.

```css
.box {
  background-color: teal;
  transition-property: background-color;
  /* highlight-start */
  transition-duration: 1000ms;
  /* highlight-end */
}

.box:hover {
  background-color: orange;
}
```

<CPN src='https://codepen.io/goit-academy/embed/yLexwPr?height=265&theme-id=default&default-tab=result' />

## Властивість `transition-timing-function`

Задає [**функцію розподілу часу**](https://cubic-bezier.com/#.17,.67,.83,.67), яка описує швидкість переходу властивості від одного значення до іншого за час, вказаний в transition-duration, тобто поведінка анімації.

```css
.box {
  background-color: teal;
  transition-property: background-color;
  transition-duration: 1000ms;
  /* highlight-start */
  transition-timing-function: linear;
  /* highlight-end */
}

.box:hover {
  background-color: orange;
}
```

В CSS існує кілька ключових слів для опису базових функцій Безьє. За замовчуванням використовується значення `ease` - перехід починається повільно, швидко прискорюється, а потім знову сповільнюється в кінці. Решта ключових слів: linear, `ease-in`, `ease-out`, і `ease-in-out`.

<CPN src='https://codepen.io/goit-academy/embed/JjGaVXy?height=265&theme-id=default&default-tab=result' />

## Властивість `transition-delay`

Затримка, після якої почнеться анімація переходу. Використовується для побудови сценаріїв - послідовності переходів різних елементів. За замовчуванням задано значення `0s`.

У прикладі встановлена затримка `500ms`. Наведіть курсор миші на квадрат, і перехід почнеться тільки через півсекунди після цієї події.

<CPN src='https://codepen.io/goit-academy/embed/WNrgWKQ?height=265&theme-id=default&default-tab=css,result' />

## Короткий запис переходу

Всі властивості переходу можна об'єднати в одну збірну властивість transition.

```
transition: [property] [duration] [timing-function] [delay]
```

Якщо анімується кілька властивостей, то набір значень для кожного з них розділяється комою. Необхідно обов'язково вказати властивість і час переходу, функцію часу і затримку можна не вказувати, тоді для них будуть використані значення за замовчуванням.

```
transition: background-color 500ms linear, transform 500ms ease-in-out;
```

<CPN src='https://codepen.io/goit-academy/embed/QWyVPzN?height=265&theme-id=default&default-tab=css,result' />

## Сценарії з `transition-delay`

Напишемо простий сценарій переходу кольору фону і обертання блоку. Спочатку блок повинен змінити колір, і тільки після цього почати обертатися. Все, що необхідно зробити, - це вказати перехід обертання, почекати стільки часу, скільки займе анімація зміни кольору фону.

```
transition: background-color 500ms linear, transform 500ms ease-in-out 500ms;
```

<CPN src='https://codepen.io/goit-academy/embed/qBbMwGM?height=265&theme-id=default&default-tab=css,result' />
