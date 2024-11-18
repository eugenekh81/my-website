---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Вбудовані стилі

Існує кілька способів стилізації компонентів, найпростіший, але в той же час найбільш обмежений – це вбудовані стилі. Для цього використовується атрибут `style`, який у React приймає не рядок, а об'єкт стилів.

```jsx title="src/components/App.js"
const App = () => {
  return (
    <p
      style={{
        margin: 8,
        padding: '12px 16px',
        borderRadius: 4,
        backgroundColor: 'gray',
        color: 'white',
      }}
    >
      Please update your email!
    </p>
  );
};
```

З прикладу можна виділити кілька обов'язкових правил вбудованих стилів:

- Імена властивостей, що складаються з двох і більше слів, наприклад `background-color`, обов'язково повинні бути записані в camelCase нотації (`backgroundColor`), як при зверненні до властивостей об'єкта `style` у DOM-елемента
- До числових значень більшості властивостей буде автоматично додано суфікс `px`. Якщо необхідно використовувати одиниці відмінні від `px`, або значення складається з кількох частин, воно вказується як рядок

Винесемо об'єкт стилів у змінну, щоб підвищити читабельність JSX розмітки.

```jsx title="src/components/App.js"
const alertStyles = {
  margin: 8,
  padding: '12px 16px',
  borderRadius: 4,
  backgroundColor: 'gray',
  color: 'white',
};

const App = () => {
  return (
    <>
      <p style={alertStyles}>Please update your email!</p>
      <p style={alertStyles}>There was an error during transaction!</p>
      <p style={alertStyles}>Payment received, thank you for your purchase!</p>
    </>
  );
};
```

Створимо компонент `Alert` який буде рендерувати абзац тексту та приховає у собі майбутню логіку вибору кольору фону.

```jsx title="src/components/Alert.js"
const alertStyles = {
  margin: 8,
  padding: '12px 16px',
  borderRadius: 4,
  backgroundColor: 'gray',
  color: 'white',
};

export const Alert = ({ children }) => {
  return <p style={alertStyles}>{children}</p>;
};
```

Використовуємо компонент `Alert` для рендеру декількох повідомлень.

```jsx title="src/components/App.js"
import { Alert } from './Alert';
const App = () => {
  return (
    <>
      <Alert>Please update your email!</Alert>
      <Alert>There was an error during transaction!</Alert>
      <Alert>Payment received, thank you for your purchase!</Alert>
    </>
  );
};
```

Зробимо так, щоб залежно від типу оповіщення, у компоненті `Alert` змінювався колір фону абзацу. Для цього додамо йому обов'язковий пропс `variant` з кількома можливими значеннями.

```jsx title="src/components/App.js:
import { Alert } from './Alert';

const App = () => {
  return (
    <>
      <Alert variant='info'>
        Would you like to browse our recommended products?
      </Alert>
      <Alert variant='error'>
        There was an error during your last transaction
      </Alert>
      <Alert variant='success'>
        Payment received, thank you for your purchase
      </Alert>
      <Alert variant='warning'>
        Please update your profile contact information
      </Alert>
    </>
  );
};
```

Логіку вибору кольору винесемо у функцію `getBgColor(variant)`, яка буде повертати рядок із назвою кольору залежно від значення параметра `variant`.

```jsx title="src/components/Alert.js" showLineNumbers
const alertStyles = {
  margin: 8,
  padding: '12px 16px',
  borderRadius: 4,
  color: 'white',
};

const getBgColor = (variant) => {
  switch (variant) {
    case 'info':
      return 'blue';
    case 'success':
      return 'green';
    case 'error':
      return 'red';
    case 'warning':
      return 'orange';
    default:
      throw new Error(`Unsupported variant prop value - ${variant}`);
  }
};

export const Alert = ({ variant, children }) => {
  return (
    <p style={{ ...alertStyles, backgroundColor: getBgColor(variant) }}>
      {children}
    </p>
  );
};
```

:::info Динамічні стилі
На 25-му рядку прикладу відбувається створення фінального значення атрибуту `style` - базові стилі з `alertStyles` та динамічне значення `backgroundColor` залежно від пропсу `variant`. Такий підхід застосовується у разі коли значення однієї і більше властивостей залежить від пропсів. Наприклад, якщо посилання на зображення для `background-image` передається як пропс.
:::

Розберіть код живого прикладу в якому використовується матеріал, який ми розібрали до цього моменту.

<CP src='https://codesandbox.io/embed/goit-react-textbook-lesson-2-inline-css-lqoko3?fontsize=14&hidenavigation=1&theme=dark' />

Вбудовані стилі можуть видаватися зручними через простоту використання, але вони мають ряд істотних недоліків.

- Дуже слабка масштабованість та повторне використання стилів
- Обмежені можливості (псевдокласи, псевдоелементи, адаптивні властивості)
- Погана продуктивність при відмальовуванні досить великої кількості елементів
- Відсутність зручних інструментів розробника
- Немає підтримки в популярних інструментах, наприклад `autoprefixer`

:::info Висновок
На практиці вбудовані стилі використовуються тільки для динамічно обчислюваних значень властивостей, у парі із зовнішніми таблицями стилів. В якості основного способу стилізації компонентів вбудовані стилі не використовуються в проектах та тому не рекомендуються.
:::
