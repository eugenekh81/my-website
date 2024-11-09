---
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Елемент `<form>`

Елемент `<form>` - це контейнер для групи пов'язаних елементів форми. Наприклад, форма відгуку, реєстрації, оплати замовлення в інтернет-магазині. Кожен з цих компонентів інтерфейсу складається з групи інтерактивних елементів, згрупованих формою.

```html title="index.html"
<!-- highlight-start -->
<form name="signup_form" autocomplete="on" novalidate>
  <!-- highlight-end -->
  <label>
    Email
    <input type="email" name="email" />
  </label>

  <label>
    Password
    <input type="password" name="password" />
  </label>

  <button type="submit">Submit</button>
  <!-- highlight-start -->
</form>
<!-- highligh-end -->
```

В елемента `<form>` немає обов'язкових атрибутів, тому в прикладі наведені кілька корисних необов'язкових.

- `name` - унікальне ім'я форми на поточній веб-сторінці. Використовується як на сервері, так і на клієнті під час роботи з формою. Може містити символи англійського алфавіту в будь-якому регістрі, цифри, підкреслення і тире. В імені не можна використовувати пробіл.
- `autocomplete` - визначає, чи може браузер автоматично заповнювати значення всіх елементів форми. Має всього два значення `off` і `on`. Цю поведінку можна буде змінити для кожного елемента форми.
- `novalidate` - атрибут-прапорець, не має значення. Каже браузеру не перевіряти валідність введених даних під час відправлення форми. Якщо атрибут не вказаний, виконується клієнтська валідація.

:::tip[Відправлення форми]
По кліку на `<button type="submit">` або під час натискання клавіші Enter в будь-якому полі форми, вона «відправляється», що призводить до перезавантаження поточної сторінки. Це поведінка за замовчуванням, яку можна буде змінити за допомогою JavaScript.
:::
