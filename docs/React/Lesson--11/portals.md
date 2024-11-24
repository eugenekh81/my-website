---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Портали

Портали надають спосіб рендеру дочірніх елементів в DOM-вузол, який знаходиться поза DOM-ієрархією батьківського компонента.

```
ReactDOM.createPortal(child, container);
```

- Першим аргументом може бути піддерево Virtual DOM будь-якої складності
- Другий аргумент – це DOM-вузол, в який буде рендеритися перший аргумент

[`Документація порталів`](https://reactjs.org/docs/portals.html)

## Використання
```jsx
const PopupWindow = () => {
  return ReactDOM.createPortal(
    <div>PopupWindow with portal</div>,
    document.querySelector("#popup-root")
  );
};
```

Типовий варіант використання порталів – коли батьківський компонент має `overflow: hidden` або `z-index`, при цьому необхідно, щоб дочірній компонент візуально "виходив" зі свого контейнера. Наприклад, модальні вікна, спливаючі підказки.

Незважаючи на те, що портал може бути будь-де в DOM-дереві, він поводиться як звичайний дочірній React-елемент. Такі речі, як пропси або контекст, працюють як і раніше, незалежно від того, чи є дочірній елемент порталом, оскільки портал все ще існує в дереві React-компонентів, незалежно від його положення в DOM-дереві.

Те саме стосується і спливання подій. Подія, створена всередині порталу, поширюватиметься до предків у React-дереві, навіть якщо вони не є предками в DOM-дереві.
