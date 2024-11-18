---
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Image } from '@site/src/components/Image';
import { CodePenSnippet } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Векторна графіка

<Image src='/img/HTML/Module--4-2/raster-vs-vector.png' alt='' />

**SVG (Scalable Vector Graphics)** - формат графіки і мова для опису векторних зображень. Всередині файл не бінарний, а звичайний текст (XML), що описує об'єкти, їх ефекти і поведінку.

Векторна графіка має ряд переваг.

- **Масштабування** - на відміну від растрової графіки, SVG не втрачає якість при масштабуванні.
- **Розмір файлу** - векторні зображення важать набагато менше растрових, якщо використовуються для іконок або іншої абстрактної графіки. Використання вектора для фотореалістичних зображень навпаки призводить до величезного розміру файлу.
- **Динамічність** - за допомогою CSS і JavaScript можна змінювати параметри векторного зображення, наприклад колір або рамки.
