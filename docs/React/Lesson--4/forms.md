---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Форми

## Неконтрольовані елементи

Основна мета будь-якої форми – отримати дані користувача. Для цього під час сабміту можна отримати значення полів з її властивості `elements` або, використовуючи `FormData`. Такий прийом доречно використовувати, коли дані полів форми потрібні тільки під час її сабміту.

```jsx showLineNumbers
class LoginForm extends Component {
  handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const login = form.elements.login.value;
    const password = form.elements.password.value;
    console.log(login, password);
    this.props.onSubmit({ login, password });
    form.reset();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='login' />
        <input type='password' name='password' />
        <button type='submit'>Login</button>
      </form>
    );
  }
}

ReactDOM.render(
  <LoginForm onSubmit={(values) => console.log(values)} />,
  document.getElementById('root')
);
```

## Контрольовані елементи

Якщо значення елементів форм необхідно отримати в момент зміни поля і зробити щось динамічно, вони повинні бути контрольовані. Тобто значення всіх полів повинні бути в `state`. Цей прийом роботи з елементами форм – досить простий.

<Image src='/img/React/controlled_input.jpg' alt='controlled input' />

- Поле в `state` визначає значення атрибуту `value` поля
- Події `onChange` передається метод, що змінює поле в стані

Отримуємо замкнене коло.

- Під час події `onChange` метод класу оновлює поле в стані
- Під час зміни стану відбувається ререндер
- Інпут відображається з оновленими даними

Недолік у тому, що вся форма буде повторно рендеритися під час кожної зміни будь-якого поля, але для невеликих форм – це не проблема.

```jsx showLineNumbers
class App extends Component {
  state = {
    inputValue: '',
  };

  handleChange = (evt) => {
    this.setState({ inputValue: evt.target.value });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <input type='text' value={inputValue} onChange={this.handleChange} />
    );
  }
}
```

Виходить, що не інтерфейс визначає, які у нас дані, а навпаки, – дані визначають те, що бачить користувач, оновлюючи DOM під час зміни стану компонента.

## Складні форми

Створимо форму реєстрації.

```jsx showLineNumbers
class SignUpForm extends Component {
  state = {
    login: '',
  };

  // Відповідає за оновлення стану
  handleChange = (e) => {
    this.setState({ login: e.target.value });
  };

  // Викликається під час відправлення форми
  handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(`Signed up as: ${this.state.login}`);

    // Проп, який передається формі для виклику під час сабміту
    this.props.onSubmit({ ...this.state });
  };

  render() {
    const { login } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type='text'
            placeholder='Enter login'
            value={login}
            onChange={this.handleChange}
          />
        </label>

        <button type='submit'>Sign up as {login}</button>
      </form>
    );
  }
}

ReactDOM.render(
  <SignUpForm onSubmit={(values) => console.log(values)} />,
  document.getElementById('root')
);
```

Додамо поля для `email` і `password`, а заразом використаємо дуже корисний патерн для callback-функції, що передається в `onChange`.

```jsx showLineNumbers
// Виносимо об'єкт із примітивами в константу, щоб було зручно скидати.
// Не можна використовувати, якщо в якійсь властивості стану зберігається складний тип.
const INITIAL_STATE = {
  login: '',
  email: '',
  password: '',
};

class SignUpForm extends React.Component {
  state = { ...INITIAL_STATE };

  // Для всіх інпутів створюємо один обробник
  // Розрізняти інпути будемо за атрибутом name
  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { login, email, password } = this.state;
    console.log(`Login: ${login}, Email: ${email}, Password: ${password}`);
    this.props.onSubmit({ ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { login, email, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type='text'
            placeholder='Enter login'
            name='login'
            value={login}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Email
          <input
            type='email'
            placeholder='Enter email'
            name='email'
            value={email}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Password
          <input
            type='password'
            placeholder='Enter password'
            name='password'
            value={password}
            onChange={this.handleChange}
          />
        </label>

        <button type='submit'>Sign up as {login}</button>
      </form>
    );
  }
}
```

## Генерація `id` елементів форми

Доступність (accessibility, a11y) – дуже важлива тема в сучасному вебі. HTML-атрибут `for` тегу label допомагає асистивним технологіям та іншим допоміжним інструментам. В React він представлений jsx-атрибутом `htmlFor`.

Для генерації унікальних ідентифікаторів елементів форм використовується наступний підхід: для кожного екземпляра компонента, під час його ініціалізації, створюється набір унікальних ідентифікаторів, що зберігаються на екземплярі. Таким чином, між різними формами одержуємо унікальні `id`.

```jsx showLineNumbers
// Можна використовувати будь-який пакет для генерації унікальних рядків
import { nanoid } from 'nanoid';

class Form extends React.Component {
  loginInputId = nanoid();

  render() {
    return (
      <form>
        <label htmlFor={this.loginInputId}>Login</label>
        <input type='text' name='login' id={this.loginInputId} />
      </form>
    );
  }
}
```

## Чекбокси

Робота з чекбоксами – проста та зрозуміла. Чекбокс може бути всього у 2-х станах: `true` або `false`.

Особливості чекбоксів:

- Ім'я атрибута, якому передається поточне значення зі `state`. Для чекбоксів – це `checked`, і передаємо туди буль
- Під час обробки події `onChange`, для отримання значення, в об'єкті події звертаємось до властивості `event.target.checked`
- Якщо чекбокс повинен зберігати значення, його можна повісити на атрибут `value` і прочитати з об'єкта події

Додамо до нашої форми реєстрації чекбокс для підтвердження згоди користувача, і зробимо кнопку сабміту неактивною, доки неактивний чекбокс.

```jsx showLineNumbers
const INITIAL_STATE = {
  login: '',
  email: '',
  password: '',
  agreed: false,
};

class SignUpForm extends React.Component {
  state = {
    ...INITIAL_STATE,
  };

  handleChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    // Якщо тип елемента – checkbox, беремо значення checked,
    // в іншому випадку – value
    this.setState({ [name]: type === 'checkbox' ? checked : value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { login, email, password, agreed } = this.state;
    console.log(
      `Login: ${login}, Email: ${email}, Password: ${password}, Agreed: ${agreed}`
    );

    /* ... */
  };

  render() {
    const { login, email, password, agreed } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {/* ... */}
        <label>
          Agree to terms
          <input
            type='checkbox'
            checked={agreed}
            onChange={this.handleChange}
          />
        </label>

        <button type='submit' disabled={!agreed}>
          Sign up as {login}
        </button>
      </form>
    );
  }
}
```

## Радіокнопки

На відміну від звичного групування за значенням атрибуту `name`, в React радіокнопка – це лише елемент інтерфейсу, який:

- Знає, чи він вибраний
- Може попросити форму змінити виділення
- Зазвичай у радіокнопок є і атрибут `checked` і `value`. Наприклад, радіокнопка, що відповідає за вибір статі користувача

```html
<input type="radio" checked={this.state.gender === "male"} value="male"
onChage={this.handleGenderChage} />
```

Додамо групу радіокнопок у нашу форму.

```jsx showLineNumbers
// Використовуємо Enumerable, щоб не створювати антипатерн "магічні рядки"

const Gender = {
  MALE: 'male',
  FEMALE: 'female',
};

const INITIAL_STATE = {
  login: '',
  email: '',
  password: '',
  agreed: false,
  gender: null,
};

class SignUpForm extends React.Component {
  state = {
    ...INITIAL_STATE,
  };

  /*... */

  render() {
    const { login, email, password, agreed, gender } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {/* ... */}

        <section>
          <h2>Choose your gender</h2>
          <label>
            Male
            <input
              type='radio'
              checked={gender === Gender.MALE}
              name='gender'
              value={Gender.MALE}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Female
            <input
              type='radio'
              checked={gender === Gender.FEMALE}
              name='gender'
              value={Gender.FEMALE}
              onChange={this.handleChange}
            />
          </label>
        </section>

        <button type='submit' disabled={!agreed}>
          Sign up as {login}
        </button>
      </form>
    );
  }
}
```

## Селект

Все просто – є селект, є опції, у селекта є `value` та `onChange`. Додаємо вибір вікової категорії.

```jsx showLineNumbers
const INITIAL_STATE = {
  login: '',
  email: '',
  password: '',
  agreed: false,
  gender: null,
  age: '',
};

class SignUpForm extends React.Component {
  state = {
    ...INITIAL_STATE,
  };

  /* ... */

  render() {
    const { login, email, password, agreed, gender, age } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {/* ... */}

        <label>
          Choose your age
          <select name='age' value={age} onChange={this.handleChange}>
            <option value='' disabled>
              ...
            </option>
            <option value='18-25'>18-25</option>
            <option value='26-35'>26-35</option>
            <option value='36+'>36+</option>
          </select>
        </label>

        <button type='submit' disabled={!agreed}>
          Sign up as {login}
        </button>
      </form>
    );
  }
}
```

## Додаткові матеріали

- [Formik](https://jaredpalmer.com/formik)
