---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Асинхронні операції

Досі ми працювали з локальними даними, що зберігаються в пам'яті вкладки браузера або локального сховища. На практиці переважна більшість даних програми зберігається в базі даних на бекенді та будь-які операції над ними виконуються за допомогою HTTP-запитів.

<Image src='/img/Redux/client-server-architecture.png' alt='Website client-server architecture' />

HTTP-запити це асинхронні операції, які представлені промісами, тому їх можна розбити на три складові: процес запиту (`pending`), успішне завершення запиту (`fulfilled`) та завершення запиту з помилкою (`rejected`). Цей шаблон застосуємо до будь-яких запитів читання, створення, видалення та оновлення.


<Image src='/img/Redux/request-states.png' alt='HTTP request pending, fulfilled and rejected states' />

