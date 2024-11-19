---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Події

Для нативної події браузера в React створюється об'єкт-обгортка `SyntheticEvent Object` з ідентичним інтерфейсом. Це необхідно, щоб забезпечити крос-браузерність та оптимізувати продуктивність.

```jsx
<button onClick={event => console.log(event)}>Click me!</button>
```

- Додавання обробника подій з `EventTarget.addEventListener()` майже не використовується, за рідкісним винятком
- Пропси подій – не виняток та іменуються за допомогою camelCase. Наприклад `onClick`, `onChange`, `onSubmit`, `onMouseEnter`
- У проп події передається посилання на callback-функцію, яка буде викликана під час настання події
- Обробники подій отримують екземпляр `SyntheticEvent Object`

В React "під капотом" реалізовано делегування подій. Слухачі не додаються безпосередньо до DOM-елементів. Передача колбека – це просто реєстрація функції, яка буде викликана внутрішніми механізмами реакта під час настання події.

## Лічильник

Створимо компонент-лічильник з можливістю збільшення і зменшення значення.

```jsx showLineNumbers
import React, { Component } from "react";
import ReactDOM from "react-dom";

class Counter extends Component {
  static defaultProps = {
    step: 1,
  };

  render() {
    const { step } = this.props;

    return (
      <div>
        <span>0</span>
        <button type="button">Increment by {step}</button>
        <button type="button">Decrement by {step}</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter step={5} />, document.getElementById("root"));
```

## Анонімні колбеки

Інлайн колбеки вважаються антипатерном. Щоразу, коли компонент ререндериться, буде створена нова callback-функція. У багатьох випадках це нормально. Але, якщо callback передається як проп компонентам нижче у дереві, вони будуть знову відрендерені, оскільки прийдуть нові пропи ссилочного типу (функція). До того ж великі інлайн функції в JSX заважають читабельності розмітки компонента.

```jsx showLineNumbers
class Counter extends Component {
  /* ... */

  render() {
    const { step } = this.props;

    return (
      <div>
        <span>0</span>
        <button
          type="button"
          onClick={evt => {
            console.log("Increment button was clicked!", evt); // працює
            console.log("this.props: ", this.props); // працює
          }}
        >
          > Increment by {step}
        </button>
        <button
          type="button"
          onClick={evt => {
            console.log("Decrement button was clicked!", evt); // працює
            console.log("this.props: ", this.props); // працює
          }}
        >
          Decrement by {step}
        </button>
      </div>
    );
  }
}
```

## Кастомні методи

Найчастіше обробники подій оголошуються як методи класу, після чого jsx-атрибуту передається посилання на метод.

```jsx showLineNumbers
class Counter extends Component {
  /* ... */

  handleIncrement(evt) {
    console.log("Increment button was clicked!", evt); // працює
    console.log("this.props: ", this.props); // Error: cannot read props of undefined
  }

  handleDecrement(evt) {
    console.log("Decrement button was clicked!", evt); // працює
    console.log("this.props: ", this.props); // Error: cannot read props of undefined
  }

  render() {
    const { step } = this.props;

    return (
      <div>
        <span>0</span>
        <button type="button" onClick={this.handleIncrement}>
          Increment by {step}
        </button>
        <button type="button" onClick={this.handleDecrement}>
          Decrement by {step}
        </button>
      </div>
    );
  }
}
```

## Прив'язка контексту

Потрібно завжди пам'ятати про значення `this` у методах, що використовуються як callback-функції. В JavaScript контекст у методах класу не прив'язується за замовчуванням. Якщо забути прив'язати контекст, і передати метод як callback-функцію обробнику події, під час виклику функції `this` буде невизначений (`undefined`).

### Прив'язка під час передачі колбека

Уникайте прив'язки контексту у методі `render()`. Щоразу, коли компонент ререндериться, `Function.prototype.bind()` повертає нову функцію і передає її вниз по дереву компонентів, що призводить до повторного рендеру дочірніх компонентів. За достатньої кількості це істотно впливає на продуктивність.

```jsx showLineNumbers
// ❌ Погано
class Counter extends Component {
  /* ... */

  handleIncrement(evt) {
    // ...
  }

  handleDecrement(evt) {
    // ...
  }

  render() {
    const { step } = this.props;

    return (
      <div>
        <span>0</span>
        <button type="button" onClick={this.handleIncrement.bind(this)}>
          Increment by {step}
        </button>
        <button type="button" onClick={this.handleDecrement.bind(this)}>
          Decrement by {step}
        </button>
      </div>
    );
  }
}
```

### Прив'язка в конструкторі

Ще один спосіб прив'язати контекст – зробити це у конструкторі класу. Якщо callback-функцій багато, можете уявити, наскільки великий може вийти конструктор.

- Конструктор виконується один раз, тому `bind` викликається один раз
- Методи класу записуються у властивість prototype функції-конструктора

```jsx showLineNumbers
// ✅ Непогано
class Counter extends Component {
  /* ... */

  constructor() {
    super();
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  handleIncrement(evt) {
    // ...
  }

  handleDecrement(evt) {
    // ...
  }

  render() {
    const { step } = this.props;

    return (
      <div>
        <span>0</span>
        <button type="button" onClick={this.handleIncrement}>
          Increment by {step}
        </button>
        <button type="button" onClick={this.handleDecrement}>
          Decrement by {step}
        </button>
      </div>
    );
  }
}
```

### Публічні властивості класу

Незважаючи на те, що це рекомендований спосіб прив'язки контексту, синтаксис публічних полів класу ще не стандартизовано. Але вони вже настільки широко використовуються, що навіть якщо будуть синтаксичні зміни, транспайлер Babel все зробить за нас.

Під час оголошення публічних полів класу, вони записуються не у властивість `prototype` функції-конструктора, а в об'єкт екземпляра.

```jsx showLineNumbers
// ✅ Добре
class Counter extends Component {
  /* ... */

  handleIncrement = evt => {
    console.log("Increment button was clicked!", evt); // працює
    console.log("this.props: ", this.props); // працює
  };

  handleDecrement = evt => {
    console.log("Decrement button was clicked!", evt); // працює
    console.log("this.props: ", this.props); // працює
  };

  render() {
    const { step } = this.props;

    return (
      <div>
        <span>0</span>
        <button type="button" onClick={this.handleIncrement}>
          Increment by {step}
        </button>
        <button type="button" onClick={this.handleDecrement}>
          Decrement by {step}
        </button>
      </div>
    );
  }
}
```
