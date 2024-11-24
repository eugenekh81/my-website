---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Планувальник завдань

Розберіть повний приклад програми планувальника завдань, в якому додано реалізацію реєстрації, логіна, оновлення користувача, редиректи та роботу з колекцією захищених даних. У прикладі використовується повноцінний бекенд, який створює JWT для кожного користувача. За роботу з користувачем та токеном відповідає частина стану `state.auth`, розберіть слайс, операції та селектори.

<CP src='https://codesandbox.io/embed/goit-textbook-lesson-15-16-auth-final-lvri7x?fontsize=14&theme=dark' />
