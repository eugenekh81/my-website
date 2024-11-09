---
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CPN } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Елемент `<datalist>`

Автозаповнення - це прийом, з яким знайомі всі користувачі. Під час введення символів у текстове поле пошукова система пропонує різні варіанти автозаповнення. Під час набору нового повідомлення електронної пошти, поштовий клієнт пропонує список отримувачів тощо.

Елемент `<datalist>` створює список попередньо встановлених значень, які можна вибирати під час набору в пов'язаному текстовому полі. Цей список прихований і стає доступним під час отримання інпутом фокуса і набору тексту в ньому. Список, що створюється елементом `<datalist>`, зв'язується з текстовим полем за допомогою атрибута `id`. Його значення повинно збігатися зі значенням атрибута `list` тегу `<input>`.

<CPN src='https://codepen.io/goit-academy/embed/bGwxaYE?height=265&theme-id=dark&default-tab=html,result' />

Елементи `<option>` також можуть мати атрибут `value`. Це корисно, якщо текст опції та значення не збігаються. Наприклад, користувач може не знати скорочення штату в США. У випадному меню він побачить список штатів та їх скорочень, а вибираючи опції, текстове поле буде заповнено лише значенням опції.

<CPN src='https://codepen.io/goit-academy/embed/zYKJpjj?height=265&theme-id=dark&default-tab=html,result' />
