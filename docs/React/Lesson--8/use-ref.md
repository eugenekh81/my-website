---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Хук `useRef`

Рефи дозволяють отримати прямий доступ до DOM-вузлів або React-елементів із шаблону компонента. Вони використовуються якщо необхідно звернутися до імперативних методів та властивостям елемента.

- Фокус елемент під час події, виділення тексту
- Контроль програвання медіаконтенту
- Інтеграція з DOM-бібліотеками
- Доступ до DOM-властивостей, значення яких неможливо отримати по-іншому - розміри елемента, значення скрола тощо

## Створення

Рефи створюються хуком `useRef()` та прив'язані до React-елементів за допомогою атрибуту ref (скорочення від reference), який зберігатиме посилання на DOM-елемент.

```jsx showLineNumbers
import { useRef } from "react";

const App = () => {
  const btnRef = useRef();

  return <button ref={btnRef}>Button with ref</button>;
};
```

## Життєвий цикл рефа

React надає властивості current посилання на DOM-елемент коли компонент монтується та `null` при розмонтуванні, тому значення рефа доступне тільки після монтування.

```jsx showLineNumbers
import { useState, useRef } from "react";

const App = () => {
  const [value, setValue] = useState(0);
  const btnRef = useRef();

  // Буде null на першому рендері
  // і посиланням на DOM-елемент всі наступні
  console.log(btnRef.current);

  useEffect(() => {
    // Ефект виконується після монтування,
    // тому завжди буде посиланням на DOM-елемент
    console.log(btnRef.current);
  });

  const handleClick = () => {
    // Кліки будуть після монтування,
    // тому завжди буде посиланням на DOM-елемент
    console.log(btnRef.current);
  };

  return (
    <>
      <button onClick={() => setValue(value + 1)}>
        Update value to trigger re-render
      </button>
      <button ref={btnRef} onClick={handleClick}>
        Button with ref
      </button>
    </>
  );
};
```

## Відсутність реактивності

Рефи це не стан, тобто вони не реактивні, тому зміна значення рефа не впливає на оновлення компонента і не викликає ре-рендер.

```jsx showLineNumbers
import { useEffect, useRef } from "react";

const App = () => {
  const valueRef = useRef(0);

  useEffect(() => {
    // Виконається лише один раз під час монтування.
    // Наступні оновлення значення рефа не
    // викличуть оновлення компонента
    console.log(valueRef.current);
  });

  const handleClick = () => {
    valueRef.current += 1;
  };

  return <button onClick={handleClick}>Click to update ref value</button>;
};
```

:::info Початкове значення
Рефи також можна використовувати як сховище довільних значень, які не змінюються між рендерами компонента та на нього не впливають. Тому в прикладі хуку `useRef` передано початкове значення якості `current` - число `0`. Ця можливість використовується для класу завдань при створенні складніших компонентів.

```
const valueRef = useRef(0);
```
:::

## Простий відеоплеєр
Створимо компонент `Player` для програвання відео, використовуючи нативний тег `<video>`. Щоб запустити та зупинити програвання необхідно викликати методи `HTMLMediaElement.play()` та `HTMLMediaElement.pause()`, де `HTMLMediaElement` це елемент `<video>`. Використовуємо реф для отримання доступу до DOM-елементу та його методам.

```jsx title="src/Components/Player.jsx" showLineNumbers
import { useRef } from "react";

const Player = ({ source }) => {
  const playerRef = useRef();
  const play = () => playerRef.current.play();
  const pause = () => playerRef.current.pause();

  return (
    <div>
      <video ref={playerRef} src={source}>
        Sorry, your browser does not support embedded videos.
      </video>
      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
      </div>
    </div>
  );
};
```

```jsx title='/src/App.jsx' showLineNumbers
const App = () => {
  return <Player source="http://media.w3.org/2010/05/sintel/trailer.mp4" />;
};
```

## Перенаправлення рефів

При використанні рефів на компоненті, проп ref не передається автоматично. Це створює проблеми у випадку коли ми хочемо отримати ref на елемент усередині самого компонента, а не на сам компонент. Функція `forwardRef` автоматично передає пропси, отримані батьківським компонентом його дочірнім елементам.

```jsx title="/src/components/CustomButton.jsx" showLineNumbers
import { forwardRef, useRef, useEffect } from "react";

const CustomButton = forwardRef((props, ref) => (
  <button ref={ref}>{props.children}</button>
));
```
```jsx title="/src/App.jsx" showLineNumbers
const App = () => {
  const btnRef = useRef();

  useEffect(() => btnRef.current.focus(), []);

  return <CustomButton ref={btnRef}>Button with forwarded ref</CustomButton>;
};
```

Такий підхід дозволяє отримати посилання у батьківському компоненті на DOM-елемент усередині іншого компонента. Наприклад, ви створюєте галерею, так можна отримати посилання на DOM-елементи поза них і працювати з їх властивостями, наприклад використовувати метод `Element.getBoundingClientRect()` і тому подібне.
