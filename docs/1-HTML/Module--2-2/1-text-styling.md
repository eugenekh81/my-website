---
custom_edit_url: null
hide_table_of_contents: true
---


import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Оформлення тексту

Текст - це основний контент веб-сторінок, і для його оформлення існують різноманітні CSS-властивості, які застосовуються повсякденно.

## Властивість `text-decoration`

Задає різні декоративні підкреслення та інші ефекти тексту.

```css
  text-decoration: none | underline | line-through | overline
```

Таблиця стилів від браузера встановлює більшості елементів значення `none`, тобто відключено. А ось, наприклад, у посилань за замовчуванням вказано `underline`.

```html
<h1 class="title">Iste odit similique sit</h1>
<p class="text">
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
  <span>veritatis nihil alias iste</span> odit similique sit eius optio veniam,
  impedit cumque fuga facere labore quo id necessitatibus quaerat rerum.
</p>
<a href="" class="link">Читати далі...</a>
```

```css
.text > span {
  text-decoration: line-through;
}

.link {
  text-decoration: none;
}
```

## Властивість text-transform

Управляє регістром символів у тексті, наприклад, зробити всі літери великими або малими. У розмітці текст завжди набирається відповідно до правил мови. Після чого, за допомогою `text-transform`, приводиться до потрібного вигляду, тому що все оформлення повинно бути в CSS.

```css
  text-transform: none | uppercase | lowercase | capitalize
```

Створимо розмітку меню навігації, текст пунктів якої в макеті намальований великими літерами.

```html
<ul class="site-nav">
  <li><a href="" class="link">Blog</a></li>
  <li><a href="" class="link">Workshops</a></li>
  <li><a href="" class="link">Podcasts</a></li>
  <li><a href="" class="link">About</a></li>
</ul>
```

Тепер у стилях робимо всі літери тексту посилань великими.

```css
.site-nav .link {
  text-transform: uppercase;
}
```

## Властивість `text-align`

Управляє вирівнюванням текстового вмісту елемента за горизонталлю.

```css
text-align: left | right | center | justify
```

За замовчуванням текст вирівнюється по лівому краю (значення `left`).

```html
<article class="post">
  <h1 class="post-title">Lorem ipsum dolor sit amet</h1>
  <p class="post-text align-right">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
    veritatis nihil alias iste odit similique sit eius optio veniam, impedit
    cumque fuga facere labore quo id necessitatibus quaerat rerum.
  </p>

  <p class="post-text align-justify">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
    veritatis nihil alias iste odit similique sit eius optio veniam, impedit
    cumque fuga facere labore quo id necessitatibus quaerat rerum.
  </p>
</article>
```

Центруємо текст заголовка і вирівняємо текст абзаців по правому краю і рівномірно.

```css
.post-title {
  text-align: center;
}

.align-right {
  text-align: right;
}

.align-justify {
  text-align: justify;
}
```
:::danger[Увага]
Використання значення `justify` - не найкраща ідея. Хоча текст і притискається до лівого і правого краю блоку рівномірно, його читабельність сильно падає. Все тому, що пробіли між словами стають різної ширини, а це негативно впливає на сприйняття тексту.
:::

## Властивість `text-indent`
Встановлює величину відступу першого рядка блоку тексту, наприклад абзацу. Не впливає на всі інші рядки, крім першого.

```css
text-indent: значення | відсотки | inherit
```

Значенням можуть бути будь-які одиниці довжини, наприклад пікселі (`px`). Встановлюючи значення у відсотках, відступ обчислюється залежно від ширини блоку.

```html
<article class="post">
  <h1 class="post-title">Lorem ipsum dolor sit amet</h1>
  <p class="post-text">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
    veritatis nihil alias iste odit similique sit eius optio veniam, impedit
    cumque fuga facere labore quo id necessitatibus quaerat rerum.Obcaecati
    commodi, veritatis nihil alias iste odit similique sit eius optio veniam,
    impedit cumque fuga facere labore quo id necessitatibus quaerat rerum.
  </p>
</article>
```

```css
.post-text {
  text-indent: 100px;
}
```

## Властивість line-height

Встановлює міжрядковий інтервал (інтерлін'яж, висоту рядка) тексту. За замовчуванням відстань між рядками залежить від виду шрифту і його розмірів, і визначається браузером автоматично.

```css
line-height: множник | значення | відсотки | normal | inherit
```

Значення можна задавати абсолютними або відносними одиницями і множником. Найкраще встановлювати значення за допомогою множника, тоді інтерлін'яж розраховується від поточного розміру шрифту тексту.

```html
<p class="text">
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
  veritatis nihil alias iste odit similique sit eius optio veniam, impedit
  cumque fuga facere labore quo id necessitatibus quaerat rerum.Obcaecati
  commodi, veritatis nihil alias iste odit similique sit eius optio veniam,
  impedit cumque fuga facere labore quo id necessitatibus quaerat rerum.
</p>
```
Наприклад, якщо в макеті розмір шрифту `16px`, а інтерлін'яж - `24px`, просто ділимо `24` на `16` і отримуємо множник `1.5`. Використання множника гарантує рівномірне масштабування міжрядкового інтервалу при зміні розміру тексту.
```css
.text {
  font-size: 16px;
  line-height: 1.5;
}
```

## Властивість `letter-spacing`

Визначає інтервал між символами. За замовчуванням відстань між символами встановлюється, виходячи з типу і виду шрифту, його розмірів і налаштувань операційної системи.

```css
letter-spacing: значення | normal | inherit
```

Іноді дизайнери встановлюють нестандартне значення міжсимвольної відстані, і саме для цього існує властивість `letter-spacing`.

```html
<article class="post">
  <h1 class="post-title">Lorem ipsum dolor sit amet</h1>
  <p class="post-text">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
    veritatis nihil alias iste odit similique sit eius optio veniam, impedit
    cumque fuga facere labore quo id necessitatibus quaerat rerum.Obcaecati
    commodi, veritatis nihil alias iste odit similique sit eius optio veniam,
    impedit cumque fuga facere labore quo id necessitatibus quaerat rerum.
  </p>
</article>
```

Для наочності задамо великі значення `letter-spacing` тексту заголовка і абзацу.

```css
.post-title {
  letter-spacing: 10px;
}

.post-text {
  letter-spacing: 5px;
}
```

## Властивість word-spacing

Визначає інтервал між словами. За замовчуванням відстань між словами встановлюється з огляду на тип і вид шрифту, його розмірів і налаштувань операційної системи.

```css
word-spacing: значення | normal | inherit
```

:::tip[Цікаво]
Властивість word-spacing належить до групи властивостей оформлення тексту, які застосовуються досить рідко.
:::

## Властивість text-shadow

Контролює тінь тексту, а також встановлює її параметри: колір, зміщення і радіус розмиття.

```css
text-shadow: <зміщення по x>, <зміщення по y>, <радіус розмиття>, <колір>
```

- `колір` - задається в будь-якому форматі. За замовчуванням колір тіні збігається з кольором тексту.
- `зміщення по x` - зміщення тіні за горизонталлю щодо тексту. Позитивне значення задає зміщення тіні вправо, негативне - вліво.
- `зміщення по y` - зміщення тіні за вертикаллю щодо тексту. Позитивне значення задає зміщення тіні вниз, негативне - вгору.
- `радіус розмиття` - чим більше значення, тим сильніше тінь розмивається і стає світлішою. За замовчуванням, якщо не заданий, буде дорівнювати `0`.

```html
<h1 class="title">Fusce posuere ligula elementum purus</h1>
```

Зробимо білий текст з темною тінню. Для цього встановимо зміщення по осях X і Y `2px`, радіус розмиття `4px` і чорний колір тіні.

```css
.title {
  color: #ffffff;
  text-shadow: 2px 2px 4px #000000;
}
```

## Багатошарова тінь
На один елемент можна додати кілька тіней, вказавши їх через кому. Виходить багатошаровий пиріг з тіней.

```html
<h1 class="title">Fusce posuere ligula elementum purus</h1>
```

Порядок відображення наступний - перша тінь у списку розміщується найвище, остання - найнижче. Тобто, чим раніше вказана тінь, тим вище вона у шарах, і буде візуально перекривати всі наступні.

```css
.title {
  color: #ffffff;
  text-shadow: 2px 2px 20px #ff0000, 5px 5px 5px #000000;
}
```

## Властивість `white-space`

За замовчуванням браузер ігнорує більше одного пробілу і перенесення рядка в HTML-розмітці. Властивість `white-space`, як і тег `<pre>`, але гнучкіше управляє форматуванням пробілів і перенесень тексту.

```css
white-space: normal | nowrap | pre | pre-wrap
```
