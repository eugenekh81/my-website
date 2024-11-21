---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Програмна навігація

React Router дозволяє виконати навігацію не тільки при натисканні на `Link`, але й щодо певної дії користувача, події чи ефекту. Наприклад, при натискання на кнопку, після відправлення форми, за результатом HTTP-запиту і тому подібне. Наприклад використовуємо процес логіна користувача в додаток. Після надсилання форми на сторінці логіну ми виконуємо навігацію на сторінку профілю користувача, але тільки якщо HTTP-запит був успішним.

Перший спосіб це хук `useNavigate`. Він надає нам функцію `navigate` якій під час виклику передаємо шлях, куди необхідно виконати навігацію. Цей спосіб імперативний, але більш гнучкий і вимагає менше коду.

```jsx title="src/pages/Login.jsx" showLineNumbers
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async values => {
    const response = await FakeAPI.login(values);
    if (response.success) {
      navigate("/profile", { replace: true });
    }
  };

  return (
    <div>
      <h1>Login page</h1>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};
```

:::info Об'єкт параметрів
Зверніть увагу на другий, необов'язковий аргумент функції `navigate` - це об'єкт параметрів. Властивість `replace`, за замовчуванням `false`, контролює як буде додано новий запис на стек історії. Повернемося до аналогії зі стопкою паперів. За замовчуванням новий аркуш буде додано на гору стопки, що ніяк не вплине на решту листів. Якщо вказати значення `true`, то новий лист підмінить собою найвищий. Це використовується досить рідко, наприклад при логіні, щоб користувач не зміг повернутися кнопкою «назад» на сторінку логіна після входу, адже він уже в системі і робити йому там нічого.
:::

Другий спосіб це компонент `Navigate` - обгортка над хуком `useNavigate`. Він виконує навігацію у момент рендеру. Шлях для навігації та необов'язкові параметри передаються окремими пропсами. Такий спосіб більш декларативний, але менш гнучкий і вимагає більше коду.

```jsx title="src/pages/Login.jsx" showLineNumbers
import { Navigate, useState } from "react-router-dom";

export const Login = () => {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleSubmit = async values => {
    const response = await FakeAPI.login(values);
    setIsLoginSuccess(response.success);
  };

  if (isLoginSuccess) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div>
      <h1>Login page</h1>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};
```

:::info Що краще?
Який спосіб використовувати залежить тільки від ваших уподобань та вимог поставленого завдання. В одному випадку вам буде зручно використовувати декларативний `Navigate`, в іншому – імперативний `useNavigate`.
:::
