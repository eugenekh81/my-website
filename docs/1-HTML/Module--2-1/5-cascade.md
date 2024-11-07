---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Каскад стилів

**Каскадування** - це механізм, який керує кінцевими значеннями властивостей елемента, якщо до нього застосовується кілька CSS-правил.

- Якщо до елемента застосовується кілька правил, їх властивості комбінуються
- Якщо правила містять однакові властивості з різними значеннями, то вони конфліктують

```css
/* Яким буде колір тексту абзаців? */
p {
  color: blue;
  background-color: orange;
}

p {
  color: teal;
}
```

Для того щоб зібрати фінальні стилі елемента і вирішити конфлікти значень властивостей, браузер використовує два механізми: **специфічність** і **наслідування**.

## Специфічність селектора

Для кожного CSS-правила браузер обчислює специфічність (вагу) селектора. Якщо до елементу потрібно застосувати властивості з різних правил, та існують конфліктуючі (однакові) властивості, використовується значення властивості з правила з найбільш високою специфічністю селектора.

Значення специфічності складається з чотирьох рангів, важливість яких збільшується справа наліво.

<Image src='/img/HTML/Module--2-1/specificity.svg' />

### Селектори 4-го рангу

Кожен селектор елемента і псевдоелемента додає одиницю до четвертого рангу.

```html
<article>
  <h1>Lorem ipsum dolor sit amet</h1>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
    veritatis nihil alias iste odit similique sit eius optio veniam, impedit
    cumque fuga facere labore quo id necessitatibus quaerat rerum.
  </p>
  <a href="">Читати далі...</a>
</article>
```

Колір тексту абзацу буде помаранчевим, тому що специфічність другого правила вище.

```css
/* Специфічність - 0 0 0 1 */
p {
  color: green;
}

/* ✅ Специфічність - 0 0 0 2 */
article > p {
  color: orange;
}
```

### Селектори 3-го рангу

Кожен селектор класу, атрибута і псевдокласу додає одиницю до третього рангу.

```html
<article class="post">
  <h1 class="post-title">Lorem ipsum dolor sit amet</h1>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
    veritatis nihil alias iste odit similique sit eius optio veniam, impedit
    cumque fuga facere labore quo id necessitatibus quaerat rerum.
  </p>
  <a href="" class="post-link">Читати далі...</a>
</article>
```

Колір тексту заголовка буде помаранчевим, бо специфічність третього правила вище.

```css
/* Специфічність - 0 0 1 0 */
.post-title {
  color: green;
}

/* Специфічність - 0 0 1 1 */
.post > h1 {
  color: red;
}

/* ✅ Специфічність - 0 0 2 0 */
.post > .post-title {
  color: orange;
}
```

Колір тексту посилання буде коричневим, тому що специфічність п'ятого правила вище.

```css
/* Специфічність - 0 0 0 1 */
a {
  color: green;
}

/* Специфічність - 0 0 1 0 */
.post-link {
  color: orange;
}

/* Специфічність - 0 0 1 1 */
a.post-link {
  color: blue;
}

/* Специфічність - 0 0 2 0 */
.post > .post-link {
  color: red;
}

/* ✅ Специфічність - 0 0 2 1 */
.post > a.post-link {
  color: brown;
}
```

### Селектори 2-го рангу

Кожен селектор ідентифікатора додає одиниць до другого рангу.

```html
<article class="post">
  <h1 class="post-title" id="title">Lorem ipsum dolor sit amet</h1>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
    veritatis nihil alias iste odit similique sit eius optio veniam, impedit
    cumque fuga facere labore quo id necessitatibus quaerat rerum.
  </p>
  <a href="" class="post-link">Читати далі...</a>
</article>
```

Колір тексту заголовка буде помаранчевим, бо специфічність другого правила вище.

```css
/* Специфічність - 0 0 1 0 */
.post-title {
  color: green;
}

/* ✅ Специфічність - 0 1 0 0 */
#title {
  color: orange;
}
```

### Селектори 1-го рангу

Вбудовані стилі додають одиницю до першого рангу, мають найвищу специфічність, і їх неможливо перевизначити через CSS.

```html
<!-- Специфічність такого стилю - 1 0 0 0 -->
<p style="color: green;">
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
  veritatis nihil alias iste odit similique sit eius optio veniam, impedit
  cumque fuga facere labore quo id necessitatibus quaerat rerum.
</p>
```

### Однакова специфічність

Якщо специфічність однакова, перемагає правило, розташоване нижче в коді.

```css
/* Три селектори елемента з однаковою специфічністю */
a {
  color: teal;
}

a {
  color: brown;
}

/* Оскільки це правило стоїть нижче, до всіх посилань застосується помаранчевий колір тексту */
a {
  color: orange;
}
```

### Уникаємо специфічності

Якщо селектор виглядає як `A > B > C + X Y`, варто задуматися. Чим простіший селектор, тим менше проблем зі специфічністю. Візьміть собі за правило використовувати селектори класу. Атрибут `class` не тільки допомагає уникнути проблем зі специфічністю, але й підвищує читабельність HTML-розмітки.

Перший підхід - це присвоєння класу загальному блоку-батькові та використання селекторів дитини і нащадка.

```html
<article class="post">
  <h1>Lorem ipsum dolor sit amet</h1>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
    veritatis nihil alias iste odit similique sit eius optio veniam, impedit
    cumque fuga facere labore quo id necessitatibus quaerat rerum.
  </p>
  <a href="">Читати далі...</a>
</article>
```

Такий CSS добре працює, коли розмітка проста. Але зі зростанням складності розмітки блоку, зручна стилізація по селекторам тегу стає неможливою. Наприклад, якщо в пості буде 5 посилань, а не одне, точково вибрати якесь посилання не вийде або селектор буде занадто складний.

```css
.post {
  /* Стилі статті */
}

.post > h1 {
  /* Стилі заголовка */
}

.post > p {
  /* Стилі тексту */
}

.post > a {
  /* Стилі посилання */
}

.post > a:hover {
  /* Стилі посилання при ховері */
}
```

Другий підхід - це додавання описових класів блоку-батькові і тегами всередині нього.

```html
<article class="post">
  <h1 class="title">Lorem ipsum dolor sit amet</h1>
  <p class="text">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
    veritatis nihil alias iste odit similique sit eius optio veniam, impedit
    cumque fuga facere labore quo id necessitatibus quaerat rerum.
  </p>
  <a class="link" href="">Читати далі...</a>
</article>
```

Такий CSS непогано масштабується і підтримується. Це відправна точка для написання хорошого CSS. Проте, з ростом складності розмітки можуть бути невеликі проблеми зі специфічністю.

```css
.post {
  /* Стилі статті */
}

.post > .title {
  /* Стилі заголовка */
}

.post > .text {
  /* Стилі тексту */
}

.post > .link {
  /* Стилі посилання */
}

.post > .link:hover {
  /* Стилі посилання при ховері */
}
```

Третій підхід полягає у встановленні дуже специфічних класів блоку-батькові та кожному тегу всередині нього за принципом `імя_батька-імя_дитини`.

```html
<article class="post">
  <h1 class="post-title">Lorem ipsum dolor sit amet</h1>
  <p class="post-text">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
    veritatis nihil alias iste odit similique sit eius optio veniam, impedit
    cumque fuga facere labore quo id necessitatibus quaerat rerum.
  </p>
  <a href="" class="post-link">Читати далі...</a>
</article>
```

За такого підходу використовуються прості селектори класу, не потрібно думати про специфічність. Такий CSS добре масштабується і підтримується. В сучасній розробці під час написання стилів використовуються варіації цього підходу

```css
.post {
  /* Стилі статті */
}

.post-title {
  /* Стилі заголовка */
}

.post-text {
  /* Стилі тексту */
}

.post-link {
  /* Стилі посилання */
}

.post-link:hover {
  /* Стилі посилання при ховері */
}
```

:::tip[Корисно]
Не варто обмежувати себе у виборі лише одного підходу. Усі три методи іменування розмітки класами і написання стилів можна використовувати разом, залежно від ситуації.
:::

### Ключове слово !important

Специфічність правила можна підвищити за допомогою ключового слова `!important`, додавши його після значення властивості.

```html
<p class="text" id="text-id">
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
  veritatis nihil alias iste odit similique sit eius optio veniam, impedit
  cumque fuga facere labore quo id necessitatibus quaerat rerum.
</p>
```

Значення такої властивості приорітетніше від усіх інших, і колір тексту абзацу буде помаранчевий.

```css
p {
  color: orange !important;
}

p#text-id.text {
  color: blue;
}
```

:::danger[Увага]
Вкрай не рекомендується використовувати !important в сучасній розробці. Єдиний оптимальний випадок - це перевизначення значення властивості, якщо відсутній прямий доступ до файлу зі стилями, наприклад стиль з бібліотеки.
:::

## Наслідування властивостей

Генетичне наслідування звично бачити в житті. Наприклад, у високих батьків найчастіше високі діти, часто передається колір волосся тощо. Дещо подібне існує і в CSS. Якщо встановити зелений колір тексту батькові, то, якщо будь-яке правило не перевизначить це значення, колір тексту всіх його нащадків також буде зеленим.

Наслідування - це механізм, за допомогою якого значення певних властивостей передаються від предка його нащадкам. Наслідуються переважно властивості оформлення тексту, наприклад колір. Це зручно, оскільки не потрібно ставити повторювані стилі для кожного нащадка окремо.

```html
<article class="post">
  <h1>Популярне за цей місяць</h1>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
    veritatis nihil alias iste odit similique sit eius optio veniam, impedit
    cumque fuga facere labore quo id necessitatibus quaerat rerum.
  </p>
  <a href="">Читати далі...</a>
</article>
```

Зробимо весь текст посту зеленого кольору.

```css
.post {
  color: green;
}
```

В інструментах розробника, на вкладці `Styles` внизу побачимо наслідування для абзацу і заголовка.

<img src="/img/HTML/Module--2-1/inheritance.png" />

В житті не всі атрибути батьків передаються дітям. Те саме і в CSS, що не кожна властивість за замовчуванням наслідується нащадками. Фактично, якби всі властивості були успадковані, ефект був би аналогічний відсутності наслідування взагалі, і довелося б написати дуже багато CSS для скидання стилів наслідуваних від батька, щоб перевизначити цю поведінку.

### Винятки

Не всі елементи наслідують значення властивостей від предків. Наприклад, посилання не наслідує колір тексту.

```html
<article class="post">
  <h1>Популярне за цей місяць</h1>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati commodi,
    veritatis nihil alias iste odit similique sit eius optio veniam, impedit
    cumque fuga facere labore quo id necessitatibus quaerat rerum.
  </p>
  <a href="" class="post-link">Читати далі...</a>
</article>
```

Якщо необхідно, щоб у пості воно була такого ж кольору, що і весь текст, можна використовувати спеціальне значення `inherit` для властивості `color`, щоб не дублювати колір у двох місцях.

```css
.post {
  color: green;
}

/* highlight-start */
.post-link {
  color: inherit;
}
/* highlight-end */
```

:::info[Корисно]
Значення inherit говорить браузеру про те, що необхідно наслідувати значення властивості від предка. Для кольору краще використовувати значення currentColor (поточний колір).
:::

### Колір тексту сторінки

Для того щоб задати базовий (домінантний) колір тексту всього документа, створюємо правило для тегу `<body>` і додаємо властивість `color`. Цей колір буде наслідуваний усім текстовим контентом, крім посилань.

```html
body {
  color: #2a2a2a;
}
```
