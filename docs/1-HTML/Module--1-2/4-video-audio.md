---
custom_edit_url: null
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Відео та аудіо

До HTML5 розмітка відео і аудіо була складним завданням. В сучасному стандарті додали нові теги для розмітки медіаконтенту з підтримкою різних форматів, вбудованими елементами управління тощо.

## Відео

Для розмітки відеоконтенту використовується парний тег `<video>`.

```html
<video
  src="http://techslides.com/demos/sample-videos/small.webm"
  poster="https://images.pexels.com/photos/595804/pexels-photo-595804.jpeg?w=640"
  width="640"
  controls
  autoplay
  loop
  preload="auto"
></video>
```

Розберемо атрибути.

- `src` - вказує адресу відеофайлу
- `poster` - адреса зображення, яке використовується як постер, якщо відео завантажене або ще не відтворюється
- `width` і `height` - задають висоту і ширину як у зображення
- `controls` - атрибут-прапорець, якщо присутній, додаються елементи управління відео
- `autoplay` - атрибут-прапорець, якщо присутній, відтворення відео починається як тільки воно доступне
- `loop` - атрибут-прапорець, якщо присутній, відео буде повторюватися в циклі

Атрибут `preload` вказує режим попереднього завантаження відео. Його значення впливає на те, яка інформація буде завантажена. Значення за замовчуванням залежить від браузера, в якому була відкрита веб-сторінка.

- `none` - не завантажувати відео заздалегідь
- `metadata` - завантажити службову інформацію (тривалість тощо)
- `auto` - заздалегідь завантажувати всі відео

## Формати відео

Завантажувати лише один формат відеофайлу недостатньо, деякі браузери можуть його не підтримувати, і користувач не зможе подивитися відео. Існує декілька популярних відеоформатів, які необхідно надати браузеру на вибір: `webm`, `mp4` і `ogg`.

Для цього прибираємо атрибут `src` у тегу `<video>` і додаємо новий тег `<source>` для кожного формату. В атрибуті `src` вказуємо адресу відеофайлу, а в атрибуті `type` - формат відео. Браузер вибере зі списку перший, який він підтримує і завантажить його, проігнорувавши інші.

```html
<video
  poster="https://images.pexels.com/photos/595804/pexels-photo-595804.jpeg?w=640"
  width="640"
  controls
>
  <source
    src="http://techslides.com/demos/sample-videos/small.webm"
    type="video/webm"
  />
  <source
    src="http://techslides.com/demos/sample-videos/small.mp4"
    type="video/mp4"
  />
  <source
    src="http://techslides.com/demos/sample-videos/small.ogg"
    type="video/ogg"
  />
</video>
```

:::tip[цікаво]
Конвертація відео і аудіо в необхідні формати - це завдання автора контенту, контент-менеджера або, у крайньому разі - розробника.
:::

## Аудіо

Для розмітки аудіоконтенту використовується парний тег `<audio>`. Його використання дуже схоже на `<video>`, але можна задати менше атрибутів.

```html
<audio src="song.mp3" controls autoplay loop preload="auto"></audio>
```

Розберемо атрибути.

- `src` - вказує адресу аудіофайлу
- `controls` - атрибут-прапорець, якщо присутній, додаються елементи управління аудіо
- `autoplay` - атрибут-прапорець, якщо присутній, відтворення аудіо починається як тільки воно доступне
- `loop` - атрибут-прапорець, якщо присутній, аудіо буде повторюватися в циклі

Атрибут `preload` вказує режим попереднього завантаження аудіофайлу. Його значення впливає на те, яка інформація буде завантажена. Значення за замовчуванням залежить від браузера, в якому була відкрита веб-сторінка.

- `none` - не завантажувати аудіо заздалегідь
- `metadata` - завантажити службову інформацію (тривалість тощо)
- `auto` - заздалегідь завантажувати увесь аудіофайл

## Формати аудіо

Аудіо має кращу ситуацію з підтримкою форматів в браузері. Всі сучасні браузери гарантовано підтримують один з двох форматів: `mp3` або `ogg`.

Подібно до відео, видаляємо атрибут `src` і використовуємо тег `<source>` з атрибутами `src` і `type`.

```html
<audio controls>
  <source src="song.mp3" type="audio/mpeg" />
  <source src="song.ogg" type="audio/ogg" />
</audio>
```

## Підтримка старих браузерів

Якщо браузер дуже старий і не підтримує HTML5 медіаконтент, потрібно сказати про це користувачеві. Для цього, всередині тегів `<video>` або `<audio>`, після всіх тегів `<source>` додамо рядок тексту, який браузер відобразить, якщо не підтримує медіаконтент.

```html
<video
  poster="https://images.pexels.com/photos/595804/pexels-photo-595804.jpeg?w=640"
  width="640"
  controls
>
  <source
    src="http://techslides.com/demos/sample-videos/small.webm"
    type="video/webm"
  />
  <source
    src="http://techslides.com/demos/sample-videos/small.mp4"
    type="video/mp4"
  />
  <source
    src="http://techslides.com/demos/sample-videos/small.ogg"
    type="video/ogg"
  />

  <!-- highlight-start -->
  Your browser does not support the <code>video</code> element.
  <!-- highlight-end -->
</video>

<audio controls>
  <source src="song.mp3" type="audio/mpeg" />
  <source src="song.ogg" type="audio/ogg" />

  <!-- highlight-start -->
  Your browser does not support the <code>audio</code> element.
  <!-- highlight-end -->
</audio>
```
