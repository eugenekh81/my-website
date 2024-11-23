---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Селектори
Ми з вами вже знаємо, що селектори це функції, які інкапсулюють у собі читання значень із стану Redux. У найпростішому вигляді вони очікують на поточний стан Redux та повертають необхідну його частину.

```js
const valueSelector = state => state.some.value;
```

У компонентах ми використовуємо хук `useSelector(selector)`, якому передаємо посилання на функцію селектор.

```js
const value = useSelector(valueSelector);
```

Таким чином компоненти не знають про форму стану Redux та процес обчислення необхідного їм значення. При зміні структури стану необхідно буде оновити лише селектори, компоненти не будуть порушені. Це скорочує час необхідний на рефакторинг і підвищує стресоспроможність додатку. Селектори також скорочують дублювання коду, якщо один і той же селектор використовується в кількох компонентах.

<img src='/img/Redux/selectors.png' alt='Selectors as an abstraction between components and Redux store' />

:::info Абстракція
По суті селектори це прошарок абстракції, який мінімізує зв'язок між компонентами та стором Redux.
:::
