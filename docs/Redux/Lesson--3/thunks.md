---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Операції

Розглянемо завдання, що часто зустрічається, завантаження даних, обробки індикатора завантаження та помилки виконання запиту. Оголосимо слайс списку завдань, у стані якого будемо зберігати масив завдань, прапор статусу завантаження та дані можливої помилки.

```jsx title="src/redux/tasksSlice.js" showLineNumbers
const tasksSlice = {
  name: 'tasks',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
};
```

Додамо редюсер для обробки кожного з можливих станів запиту.

```jsx title="src/redux/tasksSlice.js" showLineNumbers
const tasksSlice = {
  name: 'tasks',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // Виконається в момент старту HTTP-запиту
    fetchingInProgress(state) {},
    // Виконається якщо HTTP-запит завершився успішно
    fetchingSuccess() {},
    // Виконається якщо HTTP-запит завершився з помилкою
    fetchingError() {},
  },
};
```

У редюсерах змінюємо відповідні частини стану. Прапор завантаження `isLoading` встановлюємо в `true` на старті запиту, та `false` у будь-якому іншому випадку, тому що запит завершено. При виконанні запиту з помилкою змінюємо значення властивості `error`, записавши в нього те, що прийде в `action.payload` - інформація про помилку. У разі успішного виконання запиту, скидаємо значення помилки та записуємо в `items` отримані дані з `action.payload` - масив завдань.

```jsx title="src/redux/tasksSlice.js" showLineNumbers
const tasksSlice = {
  name: 'tasks',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchingInProgress(state) {
      state.isLoading = true;
    },
    fetchingSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    fetchingError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
};

export const { fetchingInProgress, fetchingSuccess, fetchingError } =
  tasksSlice.actions;
```

Для того, щоб при відправленні екшену виконати асинхронний код, необхідно оголосити «операцію» - асинхронний генератор екшену, в тілі якого викликаються інші, синхронні генератори екшенів. Операція не повертає екшен замість цього вона повертає іншу функцію, яка аргументом набуває вже знайомий нам `dispatch`. У тілі цієї функції можна виконувати асинхронні дії, наприклад, HTTP-запит. Для запитів використовуємо бібліотеку [`axios`](https://axios-http.com/).

```jsx title="src/redux/operations.js" showLineNumbers
import axios from 'axios';

axios.defaults.baseURL = 'https://62584f320c918296a49543e7.mockapi.io';

const fetchTasks = () => async (dispatch) => {
  try {
    const response = await axios.get('/tasks');
  } catch (e) {}
};
```

:::info Redux thunk
Можливість оголошувати асинхронні генератори екшенів та виконувати асинхронні дії надає розширення стора [`redux-thunk`](https://github.com/reduxjs/redux-thunk), яке за умовчанням включено до Redux Toolkit.
:::

Тепер усередині операції надсилаємо синхронні екшени для обробки трьох ситуацій: встановлення індикатора завантаження, отримання даних при успішному запиті та обробка помилки.

```jsx title="src/redux/operations.js" showLineNumbers
import axios from 'axios';
import {
  fetchingInProgress,
  fetchingSuccess,
  fetchingError,
} from './tasksSlice';

axios.defaults.baseURL = 'https://62584f320c918296a49543e7.mockapi.io';

export const fetchTasks = () => async (dispatch) => {
  try {
    // Індикатор завантаження
    dispatch(fetchingInProgress());
    // HTTP-запит
    const response = await axios.get('/tasks');
    // Обробка даних
    dispatch(fetchingSuccess(response.data));
  } catch (e) {
    // Обробка помилки
    dispatch(fetchingError(e.message));
  }
};
```

Далі додамо мінімальний код виклику асинхронного генератора екшену в компоненті, рендер індикатора завантаження, даних та обробку помилки.

```jsx title="src/components/App.js" showLineNumbers
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from 'redux/operations';
import { getTasks } from 'redux/selectors';

export const App = () => {
  const dispatch = useDispatch();
  // Отримуємо частини стану
  const { items, isLoading, error } = useSelector(getTasks);

  // Викликаємо операцію
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Рендерим розмітку в залежності від значень у стані
  return (
    <div>
      {isLoading && <p>Loading tasks...</p>}
      {error && <p>{error}</p>}
      <p>{items.length > 0 && JSON.stringify(items, null, 2)}</p>
    </div>
  );
};
```

Розберіть код живого прикладу. При монтуванні компонента App спочатку відображається індикатор завантаження, а через якийсь час масив завдань. Для того щоб оновити сторінку прикладу в пісочниці, натисніть кнопку оновлення в нижній частини його вікна

<CP src='https://codesandbox.io/embed/goit-react-textbook-lesson-13-redux-toolkit-thunk-gnmmsl?fontsize=14&hidenavigation=1&theme=dark' />

:::info Імітація помилки запиту
Для того щоб створити ситуацію з помилкою, змініть адресу бекенда на не валідний, додавши до нього одну будь-яку букву чи цифру, та оновіть приклад. У такому випадку спочатку з'явиться індикатор завантаження, а через якийсь час повідомлення про помилку.
:::
