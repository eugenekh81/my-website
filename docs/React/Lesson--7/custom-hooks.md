---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Власні хуки

:::danger Увага
Створення власних хуків потребує досвіду роботи з хуками та React загалом. Не варто спеціально прагнути зробити у проекті власні хуки. Якщо ви явно бачите можливість повторного використання коду - добре, зробіть свій хук. В іншому випадку краще сконцентруватися на вивченні основного матеріалу та використання вбудованих React-хуків або готових хуків із бібліотек на кшталт [**`react-use`**](https://github.com/streamich/react-use).
:::

Першочергове завдання хуків - спростити повторне використання коду (логіки) для розробників. Створення власних хуків це процес отримання логіки компонентів у повторно використовувані функції. Це зробить код проекту чистішим і легше у підтримці.

Хук це просто функція, ім'я якої обов'язково починається з приставки `use`. Саме по ній React визначатиме це звичайна функція чи хук. Наприклад: `useState`, `useEffect`, `useToggle`, `useDevice`, `useImages` і так далі. Власні хуки створюються поза тілом компонента, часто навіть в окремих файлах, та можуть викликати інші хуки, так досягається просте повторне використання коду.

## Хук `useToggle`

Розглянемо приклад де у двох компонентах необхідна логіка відкриття, закриття та перемикання елемента інтерфейсу, наприклад модального вікна.

```jsx showLineNumbers
// ComponentA.jsx
const ComponentA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={openModal}>Open modal</button>
      <ModalA isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

// ComponentB.jsx
const ComponentB = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={openModal}>Open modal</button>
      <ModalB isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};
```

Створення стану та методів для відкриття/закриття модального вікна ідентично в кожному компоненті, тобто відбувається дублювання коду. Уявіть, що буде в проекті, де модальні вікна відкриваються десятки чи сотні разів. Створимо власний хук useToggle в якому приховаємо створення стану та методів роботи з ним.

```jsx title="src/hooks/useToggle.js" showLineNumbers
export const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(isOpen => !isOpen);

  return { isOpen, open, close, toggle };
};
```

::: info Сигнатура хука
Власний хук може приймати будь-які аргументи і повертати будь-що, правил немає, залежить від реалізації. У нашому випадку це об'єкт із чотирма властивостями.
:::

Тоді код із попереднього прикладу буде виглядати наступним чином.

```jsx showLineNumbers
// ComponentA.jsx
import { useToggle } from "path/to/hooks/useToggle.js";

const ComponentA = () => {
  const { isOpen, open, close } = useToggle();

  return (
    <>
      <button onClick={open}>Open modal</button>
      <ModalA isOpen={isOpen} onClose={close} />
    </>
  );
};

// ComponentB.jsx
import { useToggle } from "path/to/hooks/useToggle.js";

const ComponentB = () => {
  const { isOpen, open, close } = useToggle();

  return (
    <>
      <button onClick={open}>Open modal</button>
      <ModalB isOpen={isOpen} onClose={close} />
    </>
  );
};
```

:::info Результат

Навіть у такому простому випадку ми значно скоротили дублювання коду, структурували файли проекту, зробили компоненти чистішими та спростили майбутній рефактор компоннетів та логіки хука.

Так як хуки це звичайні функції, їм можна передавати аргументи, наприклад для початкового значення стану. Розширимо хук `useToggle` так, щоб можна було зробити модальне вікно спочатку відкритим. За замовчуванням робимо його закритим.

```jsx title="src/hooks/useToggle.js" showLineNumbers
export const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(isOpen => !isOpen);

  return { isOpen, open, close, toggle };
};
```

```jsx title="MyComponent.jsx" showLineNumbers

import { useToggle } from "path/to/hooks/useToggle.js";

const MyComponent = () => {
  const { isOpen, open, close } = useToggle(true);

  return (
    <>
      <button onClick={open}>Open modal</button>
      <Modal isOpen={isOpen} onClose={close} />
    </>
  );
};
```
:::
