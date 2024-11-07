---
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# SVG-елементи

Будь-яке векторне зображення складається з набору фігур, які представлені SVG-елементами. Коли дизайнер експортує іконку з графічного редактора, наприклад `Adobe Illustrator` або `Inkscape`, програма перетворює зображення у набір елементів і виходить SVG-файл. Розробник використовує готове SVG-зображення, не замислюючись про його зміст, але базове знайомство з елементами не буде зайвим, тому розглянемо деякі з них.

## Елемент `<svg>`

Визначає полотно, на якому можна малювати фігури. Зробимо полотно 400x300 пікселів і додамо йому вбудований стиль з outline для візуалізації меж.

```html title="index.html"
<svg width="400" height="300" style="outline: 2px dashed #2a2a2a;">
  <!-- Тут буде розмітка фігур -->
</svg>
```

<CodePenSnippet src='https://codepen.io/goit-academy/embed/rNWvZbj?height=265&theme-id=dark&default-tab=result' />

## Елемент `<rect>`

Створює прямокутну область. Намалюємо прямокутник `250x150` пікселів і додамо наступні характеристики.

- Заллємо кольором, використовуючи атрибут `fill`.
- Встановимо рамку чорного кольору шириною 4px атрибутами `stroke` і `stroke-width`.
- Задамо зміщення `20px` за вертикаллю і горизонталлю щодо верхнього лівого кута полотна атрибутами `x` і `y`.
- Додамо закруглення кутів прямокутника атрибутами `rx` (за горизонталлю) і `ry` (за вертикаллю). Якщо задати тільки одне значення, інше буде ідентичним.

```html title="index.html"
<svg width="400" height="300" style="outline: 1px solid black;">
  <rect
    width="250"
    height="150"
    fill="tomato"
    stroke="black"
    stroke-width="4"
    x="20"
    y="20"
    rx="40"
  />
</svg>
```

Намалюємо ще один прямокутник і розмістимо його в нижній правій частині полотна. Нова фігура перекриє перший прямокутник, тому що фігури розташовуються як в листковому пирозі - нижче в розмітці, значить вище в шарах на полотні.

<CodePenSnippet src='https://codepen.io/goit-academy/embed/MWKMVpW?height=265&theme-id=default&default-tab=result' />

## Елемент `<circle>`

Створює коло, радіус якого задається атрибутом `r`. Намалюємо цю фігуру розміром `100x100` пікселів, зробимо їй рамку і заллємо кольором. Вийде окружність з центром у верхньому лівому кутку, велика частина якої прихована, оскільки знаходиться за полотном.

```css
<svg width="400" height="300" style="outline: 2px dashed #2a2a2a;">
  <circle r="100" fill="tomato" stroke="#2a2a2a" stroke-width="4" />
</svg>
```

Координати центру кола на полотні задаються атрибутами `cx` (center x) і `cy` (center y).

<CodePenSnippet src='https://codepen.io/goit-academy/embed/XWXLEMX?height=265&theme-id=default&default-tab=result' />

## Елемент `<ellipse>`

Створює еліпс. Горизонтальний і вертикальний радіус задається атрибутами `rx` і `ry`. Решта атрибутів збігаються з елементом `<circle>`. Намалюємо еліпс `150x100` пікселів, зробимо йому рамку і заллємо кольором.

<CodePenSnippet src='https://codepen.io/goit-academy/embed/dyGBmvz?height=265&theme-id=default&default-tab=result' />

## Елемент `<line>`

Створює пряму лінію. Атрибути `x1` і `y1` вказують точку початку лінії, а `x2` і `y2` - її кінець. Намалюємо на полотні іконку гамбургер-меню з трьох паралельних горизонтальних ліній.

```css
<svg width="400" height="300" style="outline: 2px dashed #2a2a2a;">
  <line x1="20" y1="50" x2="380" y2="50" stroke="#2a2a2a" stroke-width="16" />
  <line x1="20" y1="80" x2="380" y2="80" stroke="#2a2a2a" stroke-width="16" />
  <line x1="20" y1="110" x2="380" y2="110" stroke="#2a2a2a" stroke-width="16" />
</svg>
```

<CodePenSnippet src='https://codepen.io/goit-academy/embed/BajgrWq?height=265&theme-id=default&default-tab=result' />

## Елемент `<polygon>`

Описує багатокутник, вид якого визначається атрибутом `points` - набором точок у вигляді координат ліній, які розділені на групи.

```html
<svg width="600" height="300" style="outline: 2px dashed #2a2a2a;">
  <polygon
    points="20,20 20,200 200,200 200,20"
    fill="orange"
    stroke="#2a2a2a"
    stroke-width="4"
  />
</svg>
```

Перша цифра групи - координата `x`, друга цифра після коми - координата `y`. Перша група цифр визначає координати початку першої лінії, друга група визначає кінець першої лінії і одночасно початок другої лінії тощо.

Полігон - це замкнута фігура, тому остання лінія, яка замикає, додається автоматично, з'єднуючи кінець останньої лінії з початком першої лінії фігури.

<CodePenSnippet src='https://codepen.io/goit-academy/embed/eYJwMWN?height=265&theme-id=default&default-tab=result' />

## Елемент `<path>`

Універсальний елемент для представлення фігур будь-якої складності. Всі SVG-іконки, експортовані дизайнером, описані цим елементом. Атрибут `d` містить набір координат і кривих, які з'єднують їх, що визначають напрямок ліній. Вручну редагувати `path` не потрібно. Іконки малюються у спеціальних редакторах, які під час експорту заповнюють `path` та інші елементи з їх атрибутами.

<CodePenSnippet src='https://codepen.io/goit-academy/embed/WNoJgQL?height=265&theme-id=dark&default-tab=html,result' />
