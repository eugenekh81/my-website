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

З усіх [**властивостей, які можуть бути анімовані**](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties), рекомендується, якщо можливо, використовувати всього дві: `opacity` (прозорість) і `transform` (трансформація). Здебільшого анімація інших властивостей не суттєво вплине на продуктивність сторінки, але краще дотримуватися цього правила, щоб створювати максимально продуктивну анімацію. Вся справа в тому, як браузер малює веб-сторінку.

<img src='/img/HTML/Module--5-2/rendering-steps.jpg' alt='Як браузер рендерить елементи' style={{ marginBottom: '20px' }} />

1. **Крок JavaScript** - скрипт або якась подія, наприклад ховер або фокус, запускають анімацію стилів елемента.
1. **Крок Style** - відбувається обчислення нових стилів елементів, розраховується специфічність, конфлікти, каскадування тощо.
1. **Крок Layout** - виконується розрахунок геометрії елементів. У разі анімації властивості, яка впливає на геометрію, наприклад `margin`, браузеру доводиться обчислювати нову позицію для цілої групи елементів.
1. **Крок Painting** - відбувається малювання шарів, тому що елементи вкладені один в одного або позиціоновані, тим самим створюючи листковий пиріг.
1. **Крок Composite** - компонування всіх підготовлених шарів і малювання фінального зображення на екрані користувача.

Наприклад, якщо анімувати властивість `width`, браузеру доведеться виконати кроки `Layout > Paint > Composite`, а це досить дорога операція для продуктивності веб-сторінки.

<img src='/img/HTML/Module--5-2/animating-width.jpg' alt='Кроки для анімації властивості width' style={{ marginBottom: '20px' }} />

Анімації властивості background не впливає на геометрію елементів, тому браузеру достатньо виконати кроки `Paint > Composite`.

<img src='/img/HTML/Module--5-2/animating-background.jpg' alt='Кроки для анімації властивості background' style={{ marginBottom: '20px' }} />

Для анімації властивостей `opacity` і `transform` браузеру не потрібно розраховувати нову геометрію або перемальовувати шари, достатньо виконати тільки крок `Composite`.

<img src='/img/HTML/Module--5-2/animating-opacity-transform.jpg' alt='Кроки для анімації властивостей opacity і transform' style={{ marginBottom: '20px' }} />

:::danger[Увага]
Анімація трьох тисяч елементів - це досить ресурсомістка операція і може відображатися по-різному, залежно від потужності вашого комп'ютера.
:::

<CPN src='https://codepen.io/goit-academy/embed/gOPEzKR?height=265&theme-id=default&default-tab=result' />
