---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Ванільний CSS

Оформлення компонента можна винести до таблиці стилів. У цьому випадку стилі кожного компонента оголошуються в окремому CSS-файлі з розширенням `.css`. Ім'я файлу складається з імені компонента та розширення. Наприклад, для компонента `Alert`, файл стилів буде називатися `Alert.css`.

```css title="src/components/Alert.css"
.alert {
  margin: 8px;
  padding: 12px 16px;
  border-radius: 4px;
  background-color: gray;
  color: white;
}
```

:::info Це звичайний CSS
Всередині файлу стилів можна написати будь-який валідний CSS код. Хорошою практикою буде писати CSS тільки для HTML-розмітки компонента до якого належить цей файл стилів.
:::

Стилі компонента імпортуються у файл оголошення, після чого CSS-класи описані у таблиці стилів доступні для використання. У React HTML-атрибуту `class` відповідає JSX-атрибут `className`, куди можна передати рядок з перерахуванням усіх класів елемента.

```jsx title="src/components/Alert.js"
import "./Alert.css";

const Alert = ({ children }) => {
  return <p className="alert">{children}</p>;
};
```

:::info Автоматизація
На стадії збирання проекту Create React App мінімізує CSS та автоматично додає вендорні префікси використовуючи [Autoprefixer](https://github.com/postcss/autoprefixer). Сучасний синтаксис та можливості CSS покриваються поліфілами для можливості підтримки старих браузерів. Тому розробнику не потрібно турбуватися про це.
:::

## Композиція класів

Додамо CSS класи для кожного типу оповіщення, щоб контролювати колір фону абзацу в залежності від значення пропсу `variant`. Для зручності назвемо класи аналогічно варіантам значення пропсу.

```css title="src/components/Alert.css" showLineNumbers
.alert {
  margin: 8px;
  padding: 12px 16px;
  border-radius: 4px;
  color: white;
}

.alert.info {
  background-color: blue;
}

.alert.success {
  background-color: green;
}

.alert.error {
  background-color: red;
}

.alert.warning {
  background-color: orange;
}
```

Додамо компоненту `Alert` два необов'язкові пропси `outlined` та `elevated`. Їх значеннями можуть бути тільки `true`, `false` або `undefined`. Якщо значення цих пропсів `true`, будемо додавати елементу `<p>` класи `is-outlined` та `is-elevated`.

```css title="src/components/Alert.css" showLineNumbers
/* Весь попередній CSS код */
.alert.is-outlined {
  outline: 1px solid black;
}

.alert.is-elevated {
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px,
    rgb(0 0 0 / 12%) 0px 1px 8px 0px;
}
```

Процес обчислення фінального значення атрибуту `className` залежить від розробника та поточного завдання. Наприклад, використовуємо масив рядків та блок `if`. Класи `alert` і якийсь із варіантів буде завжди, а класи для пропсів `elevated` та `outlined` додаємо тільки за потребою.

```jsx title="src/components/Alert.js" showLineNumbers
import "./Alert.css";

const Alert = ({ variant, outlined, elevated, children }) => {
  const classNames = ["alert", variant];
  if (outlined) classNames.push("is-outlined");
  if (elevated) classNames.push("is-elevated");
  return <p className={classNames.join(" ")}>{children}</p>;
};
```

Розберіть код живого прикладу, в якому використовується весь матеріал, який ми з вами розібрали до цього моменту.

<CP src='https://codesandbox.io/embed/goit-react-textbook-lesson-2-vanilla-css-3ikw3g?fontsize=14&hidenavigation=1&theme=dark' />

:::info Стандарту немає
Для обчислення фінального значення атрибуту className можна було використати блок `if...else`, інструкцію `switch`, тернарний оператор або будь-який інший синтаксис JavaScript, який дасть нам той же результат. Головне, щоб рядок з класами був складений правильно і не мав зайвих чи невалідних значень.
:::

## Бібліотека `clsx`

Для вирішення більшості завдань, пов'язаних з безліччю класів, що задаються згідно з певними умовами, використовують бібліотеку `clsx`. Звичайно, JavaScript надає багатий синтаксис, але здебільшого пишуться непродуктивні рішення або код, що погано читається. Бібліотека стандартизує цей процес і робить його більш зручним за рахунок продуманого синтаксису.

```bash
npm install clsx
```

Функції `clsx` можна передати список виразів як набір аргументів. Вирази що приводяться до `true`, результат яких це рядок або число, буде додано у фінальний рядок класів.

```jsx
import clsx from "clsx";

const className = clsx(
  "first",
  10,
  undefined && "second",
  true && "third",
  false ? "fourth" : "fifth"
);

console.log(className); // "first 10 third fifth"
```

Ось як виглядатиме код компонента `Alert` використовуючи бібліотеку `clsx`. Навіть у такому, відносно простому випадку, код виходить простіше і читабельніше.

```jsx title="src/components/Alert.js"
import clsx from "clsx";
import "./Alert.css";

const Alert = ({ variant, outlined, elevated, children }) => {
  return (
    <p
      className={clsx(
        "alert",
        variant,
        outlined && "is-outlined",
        elevated && "is-elevated"
      )}
    >
      {children}
    </p>
  );
};
```

Можна комбінувати варіативну та об'єктну форму функції `clsx`. Спочатку передаються класи, які будуть завжди, після чого в об'єкті налаштувань перераховуємо динамічні значення класів залежно від якихось обчислень.

```jsx title="src/components/Alert.js"
import clsx from "clsx";
import "./Alert.css";

const Alert = ({ variant, outlined, elevated, children }) => {
  return (
    <p
      className={clsx("alert", variant, {
        "is-outlined": outlined,
        "is-elevated": elevated,
      })}
    >
      {children}
    </p>
  );
};
```

Розберіть код живого прикладу, в якому використовується весь матеріал, який ми з вами розібрали до цього моменту.

<CP src='https://codesandbox.io/embed/goit-react-textbook-lesson-2-vanilla-css-clsx-tmd9ht?fontsize=14&hidenavigation=1&theme=dark' />

## Глобальний простір імен

Імпорт стилів компонента саме у файл його оголошення це просто гарна практика. Наприклад, якщо зробити імпорт стилів `Alert.css` у компоненті `App`, то нічого не зламається. В результаті імпорту весь оголошений CSS код файлу просто додається в одну загальну таблицю стилів, разом з усім іншим CSS кодом проекту з інших компонентів.

У коді прикладу буде проблема конфлікту CSS правил із селектором класу `.text`. Залежно від порядку імпорту цих двох CSS файлів у додатку фінальні стилі класу text можуть виглядати по-різному.

```css
/* FirstComponent.css */
.text {
  color: red;
  font-size: 24px;
}

/* SecondComponent.css */
.text {
  color: blue;
}
```

:::info Унікальність імен
Імена селекторів класу повинні бути унікальними у всьому додатку, щоб не було конфліктів CSS правил з однаковими селекторами у різних компонентах.
:::

## Препроцесори

Використовувати препроцесори можна, але можливість композиції компонентів робить їх менш корисними, оскільки замінює такі концепції як домішки, функції, вкладеність та інші. Не рекомендується використовувати одні й ті самі CSS-класи в різних компонентах, для цього є композиція компонентів.

Наприклад, замість використання базового CSS-класу `.button` у компонентах `<LoginButton>` та `<FollowButton>`, краще створити компонент `<Button>` зі своїми власними стилями, які можуть відображатись у кількох варіантах. Тоді компоненти `<LoginButton>` та `<FollowButton>` можуть використовувати компонент `<Button>`, а не просто CSS-клас.

```jsx
// Button.js
const Button = ({ variant, children }) => {
  // Базові стилі кнопки з кількома варіантами відображення
  return <button className={clsx("button", variant)}>{children}</button>;
};

// LoginButton.js
const LoginButton = () => {
  // Унікальна логіка кнопки логіна
  return <Button variant="primary">Login</Button>;
};

// FollowButton.js
const FollowButton = () => {
  // Унікальна логіка кнопки підписки
  return <Button variant="secondary">Follow</Button>;
};
```

Правила іменування файлів такі ж, як і для ванільного CSS, відрізняється тільки розширення, наприклад `.scss` для SASS. В іншому у препроцесорів ті ж можливості, концепції та недоліки, що і у ванільного CSS. Для того щоб додати можливість використання SASS, встановіть його компілятор у проект.

```bash
npm install sass
```

:::info Висновок
Використання ванільного CSS теж не найкращий підхід і має ряд недоліків, особливо у великих проектах.
:::

- Слабка масштабованість
- Обмежене повторне використання стилів
- Для динамічних значень необхідно використовувати вбудовані стилі
- Проблема глобального простору імен
- Необхідність використовувати якусь конвенцію іменування селекторів класу
- Відсутність автоматичного видалення коду, що не використовується
