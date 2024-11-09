---
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Елемент `<label>`

Елемент `<label>` пов'язує опис (мітку) з інтерактивним елементом форми. Текст мітки пов'язаний з елементом не тільки візуально, але й логічно. Наприклад, скрінрідер оголосить текст мітки, коли користувач поставить фокус на пов'язаний елемент. По кліку на мітці, пов'язаний елемент автоматично отримає ефект фокуса.

Якщо елемент форми, наприклад поле введення, вкладається в `<label>`, зв'язок створюється браузером автоматично. Клік на текст «Email» або «Password» поставить фокус у відповідне поле введення.

```html title="index.html"
<form>
  <label>
    Email
    <input type="email" name="email" />
  </label>

  <label>
    Password
    <input type="password" name="password" />
  </label>

  <button type="submit">Submit</button>
</form>
```

Якщо елемент форми не вкладений в `<label>`, необхідно явно зв'язати їх за допомогою атрибута `id` елемента, що зв'язується, і атрибута `for` мітки.

<Image src='/img/HTML/Module--6-1/label-element-for-attribute.png' alt='Атрибут for' />

```html title="index.html"
<form>
  <label for="user_email">Email</label>
  <input type="email" name="email" id="user_email" />

  <label for="user_password">Password</label>
  <input type="password" name="password" id="user_password" />

  <button type="submit">Submit</button>
</form>
```
