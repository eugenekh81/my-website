---
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Тінь елемента

Тінь додає елементу ефект об'ємності і відчуття висоти. Тіні бувають зовнішні і внутрішні, розмиті і плоскі, одинарні і багатошарові.

<img src='/img/HTML/Module--4-1/shadow-intro.png' alt='Тінь елемента' />

Властивість box-shadow задає елементу одну або більше тіней. За замовчуванням розмір тіні збігається з розміром елемента, а її колір відповідає кольору його тексту.

```
box-shadow: <x-offset> <y-offset> <blur> <spread> <color>
```

- `x-offset` - горизонтальне зміщення. Додатне значення зміщує тінь вправо від блоку, від'ємне - вліво. Обов'язкове значення.
- `y-offset` - вертикальне зміщення. Додатне значення зміщує тінь вниз, від'ємне - вгору. Обов'язкове значення.
- `blur` - радіус розмитості. Що більше значення, то розмитіша тінь. Необов'язкове значення.
- `spread` - радіус поширення. Додатне значення збільшує тінь, від'ємне - зменшує. Необов'язкове значення.
- `color` - колір тіні. Можна використовувати будь-який формат запису кольору. Необов'язкове значення.

<CodePenSnippet src='https://codepen.io/goit-academy/embed/PoZrRba?height=265&theme-id=default&default-tab=result' />

## Тінь з однієї сторони

Використовуючи від'ємний радіус поширення (значення `spread`), можна стиснути тінь блоку, зробивши її меншою за розмір елемента, і задати зміщення тільки з однієї сторони.

<CodePenSnippet src='https://codepen.io/goit-academy/embed/LYRdKPr?height=265&theme-id=dark&default-tab=result' />

## Внутрішня тінь

Якщо зовнішня тінь візуально піднімає елемент, то внутрішня тінь дозволяє додати ефект глибини, вдавлюючи елемент в інтерфейс. Синтаксис оголошення внутрішньої тіні аналогічний звичайній, але першим значенням необхідно вказати inset.

```
box-shadow: inset <x-offset> <y-offset> <blur> <spread> <color>
```

Зміщення, розмитість і поширення тіні відбувається всередині елемента і візуально обмежено його рамкою.

<CodePenSnippet src='https://codepen.io/goit-academy/embed/ExgEzdX?height=265&theme-id=dark&default-tab=result' />

## Багатошарова тінь
На один елемент можна додати кілька тіней, вказавши їх через кому.

```
box-shadow: <x-offset> <y-offset> <blur> <spread> <color>,
            <x-offset> <y-offset> <blur> <spread> <color>,
            <x-offset> <y-offset> <blur> <spread> <color>,
            ...
```

Виходить багатошаровий пиріг, в якому перша тінь у списку розміщується найвище, остання - найнижче. Тобто, чим раніше вказана тінь, тим вище вона у шарах, і буде візуально перекривати всі наступні. Цей підхід дозволяє зробити дуже м'які і гарні тіні.

<CodePenSnippet src='https://codepen.io/goit-academy/embed/dyGBmNR?height=265&theme-id=default&default-tab=result' />

Для наочності задамо шарам тіні з попереднього прикладу різні кольори.

<CodePenSnippet src='https://codepen.io/goit-academy/embed/ZEpxdKX?height=265&theme-id=dark&default-tab=result' />

## Декоративні ефекти

Використовуючи тіні, псевдоелементи, а також трансформації і позиціонування, яке ми розглянемо далі у курсі, можна робити дуже цікаві ефекти. Наприклад, візуально загнуті кути картки.

<CodePenSnippet src='https://codepen.io/goit-academy/embed/YzGaoLm?height=265&theme-id=dark&default-tab=result' />

## Додаткові матеріали
- [Генератор тіні](https://cssgenerator.org/box-shadow-css-generator.html)
