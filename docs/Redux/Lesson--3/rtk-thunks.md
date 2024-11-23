---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# createAsyncThunk

Redux Toolkit спрощує процес оголошення асинхронного генератора екшену за допомогою функції [`createAsyncThunk()`](https://redux-toolkit.js.org/api/createAsyncThunk). Першим аргументом вона приймає тип екшену, а другим функцію, яка повинна виконати HTTP-запит і повернути проміс із даними, які стануть значенням `payload`. Вона повертає асинхронний генератор екшену (операцію) при запуску якого виконається функція з кодом запиту.

```jsx title="src/redux/operations.js" showLineNumbers
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://62584f320c918296a49543e7.mockapi.io";

export const fetchTasks = createAsyncThunk("tasks/fetchAll", async () => {
  const response = await axios.get("/tasks");
  return response.data;
});
```

Функція `createAsyncThunk()` автоматично створює екшени, що представляють життєвий цикл HTTP-запиту, і відправляє їх у правильному порядку, залежно від статусу запиту. Тип створених екшенів складається з рядка, зазначеного першим аргументом (`"tasks/fetchAll"`), до якого додається постфікси `"pending"`, `"fulfilled"` або `"rejected"`, залежно від того, який стан запиту описує екшен.

- `"tasks/fetchAll/pending"` - початок запиту
- `"tasks/fetchAll/fulfilled"` - успішне завершення запиту
- `"tasks/fetchAll/rejected"` - завершення запиту з помилкою

Замінивши в нашому прикладі код оголошення операції `fetchTasks` та перезавантаживши сторінку в інструментах розробника видно, як при монтуванні компонента `App` відправляються екшени з правильними типами та `payload`.

<img src='/img/Redux/thunk-actions.png' alt='Redux DevTools with dispatched thunk actions' />

Функція `createAsyncThunk` не створює редюсер, тому що не може знати, як ми хочемо відстежувати стан завантаження, з якими даними завершиться запит та як їх правильно обробити. Тому наступним кроком буде зміна коду слайсу `tasksSlice` так, щоб він обробляв нові екшени.

```jsx title="src/redux/tasksSlice.js" showLineNumbers
import { createSlice } from "@reduxjs/toolkit";
// Імпортуємо операцію
import { fetchTasks } from "./operations";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  // Додаємо обробку зовнішніх екшенів
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, (state, action) => {})
      .addCase(fetchTasks.fulfilled, (state, action) => {})
      .addCase(fetchTasks.rejected, (state, action) => {});
  },
});

export const tasksReducer = tasksSlice.reducer;
```

Властивість `extraReducers` використовується щоб оголосити редюсери для «зовнішніх» типів екшенів, тобто тих, які не згенеровані з властивості `reducers`. Оскільки ці редюсери обробляють «зовнішні» екшени, для них не буде створено генератори екшенів в `slice.actions`, в цьому немає необхідності.

:::info Екшени операції
Генератори екшенів, які мають життєвий цикл запиту, зберігаються в об'єкті операції як властивості `pending`, `fulfilled` та `rejected`. Вони автоматично створюються за допомогою `createAction` і тому мають властивість `type` і перевизначений метод `toString()`, який повертає рядок типу екшену.
:::

Властивість `reducers` нам більше не потрібна, тому всю логіку обробки екшенів запиту переносимо до нових редюсерів.

```jsx title="src/redux/tasksSlice.js" showLineNumbers
import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "./operations";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
```

Залишилося додати обробку запиту, що завершився з помилкою. Для цього необхідно доповнити код створення операції `fetchTasks` так, щоб у випадку помилки запиту повертався проміс, який буде відхилено. Тоді на екшені помилки запиту з'явиться властивість `payload`.

```jsx title="src/redux/operations.js" showLineNumbers
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://62584f320c918296a49543e7.mockapi.io";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  // Використовуємо символ підкреслення як ім'я першого параметра,
  // тому що в цій операції він нам не потрібен
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/tasks");
      // При успішному запиті повертаємо проміс із даними
      return response.data;
    } catch (e) {
      // При помилці запиту повертаємо проміс
      // який буде відхилений з текстом помилки
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
```

Колбек функція, в якій виконується запит, називається payloadCreator і відповідає за складання значення властивості `payload`. Вона буде викликана з двома аргументами: `arg` та `thunkAPI`.

```js
payloadCreator(arg, thunkAPI)
```

- `arg` - значення, яке було передано операції під час виклику. Використовується, наприклад, для передачі ідентифікаторів об'єктів при видаленні, тексту нотаток при створенні, тощо
- `thunkAPI` - об'єкт, який передається в асинхронний генератор екшену в `redux-thunk`. Містить властивості та методи доступу до стору, відправки екшенів, а також деякі додаткові

Розберіть код живого прикладу, в якому використовується весь пройдений матеріал.

<CP src='https://codesandbox.io/embed/goit-react-textbook-lesson-13-redux-toolkit-createasyncthunk-ol6wh5?fontsize=14&hidenavigation=1&theme=dark' />
