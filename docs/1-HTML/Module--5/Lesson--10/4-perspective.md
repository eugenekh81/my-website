---
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CPN } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Перспектива

За замовчуванням елемент рендериться у 2D-просторі та, у разі трансформацій, - по осях `X` та `Y`, наприклад `rotate`, викривляється і виглядає неприродно.

<Image src='/img/HTML/Module--5-2/perspective-intro.png' alt='перпектива' />

У прикладі елементи `div.box` повернені на `45` градусів по осях `X` та `Y`. Вони виглядають плоскими і викривленими, тому що їм не вистачає перспективи, тобто глибини сцени.

<CPN src="https://codepen.io/goit-academy/embed/pogXgQd?height=265&theme-id=default&default-tab=result" />

## Функція `perspective()`

Це ще одна функція трансформації для властивості `transform`, яка дозволяє задати перспективу одному елементу, до якого застосовується.

<CPN src="https://codepen.io/goit-academy/embed/KKVjVEy?height=265&theme-id=default&default-tab=result" />

Встановивши `perspective(400px)`, ми говоримо браузеру про необхідність рендерити `div.box` у 3D-просторі, додаючи елементу глибину сцени та об'єм. Значення `400px` - це відстань до сцени, на якій знаходиться елемент. Що менше значення, то ближче глядач до сцени і навпаки.

У разі використання відразу на декількох елементах, у кожного створюється своя сцена і перспектива, тобто глядач ніби дивиться на кожен елемент з різної точки.

<CPN src="https://codepen.io/goit-academy/embed/VweJape?height=265&theme-id=default&default-tab=result" />

## Властивість `perspective`

Дозволяє створити однакову перспективу цілій групі елементів на сцені. Ця властивість задається спільному контейнеру групи елементів (сцені), у нашому випадку - `div.scene`.

<CPN src="https://codepen.io/goit-academy/embed/NWxZNyY?height=265&theme-id=default&default-tab=result" />
