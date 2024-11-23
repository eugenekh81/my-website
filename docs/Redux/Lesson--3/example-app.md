---
hide_table_of_contents: true
---

import { Image } from '@site/src/components/Image';
import { CodePenSnippet as CP } from '@site/src/components/CodePenSnippet';
import { CustomTOC } from '@site/src/components/CustomTOC';

<CustomTOC toc={toc} />

# Планувальник завдань

Змінимо код нашої програми так, щоб працювати з даними від бекенда. Для цього використовуємо сервіс [`mockapi.io`](https://mockapi.io/), котрий надає візуальний інтерфейс для створення простого бекенду з базою даних. Це дозволить нам виконувати CRUD операції з масивом об'єктів.

У пісочниці ви можете взяти стартовий код програми планувальника завдань з уже готовими компонентами React та базовою логікою Redux, доповнюючи його паралельно вивченню матеріалу.

<CP src='https://codesandbox.io/embed/goit-react-textbook-lesson-13-redux-toolkit-app-starter-code-0rmpkl?fontsize=14&hidenavigation=1&theme=dark' />

## Селектори
Через те, що у нас змінилася форма стану, необхідно доповнити файл селекторів.

```jsx title="src/redux/selectors.js" showLineNumbers
export const getTasks = state => state.tasks.items;

export const getIsLoading = state => state.tasks.isLoading;

export const getError = state => state.tasks.error;

export const getStatusFilter = state => state.filters.status;
```

## Читання завдань

Операція та редюсери для читання масиву завдань у нас уже є. Доповнимо компонент App так, щоб при його монтуванні запускалася операція запиту за списком задач.

```jsx title="src/components/App.js" showLineNumbers
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks } from "redux/operations";
// Імпорти компонентів

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Layout>
      <AppBar />
      <TaskForm />
      <TaskList />
    </Layout>
  );
};
```

Після монтування компонента `App` та завершення запиту, в інтерфейсі відобразиться список завдань - компонент `TaskList`, який використовує селектори для отримання масиву завдань із стану Redux.

## Індикатор запиту

Додамо відображення індикатора запиту над списком завдань.

```jsx title="src/components/App.js" showLineNumbers
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "redux/operations";
import { getError, getIsLoading } from "redux/selectors";
// Імпорти компонентів

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Layout>
      <AppBar />
      <TaskForm />
      {isLoading && !error && <b>Request in progress...</b>}
      <TaskList />
    </Layout>
  );
};
```

## Додавання завдання
Оголосимо операцію додавання задачі, яка очікує тільки введений текст користувачем. За створення унікального ідентифікатора та додавання властивості `completed` тепер відповідатиме бекенд.

```jsx title="src/redux/operations.js" showLineNumbers
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (text, thunkAPI) => {
    try {
      const response = await axios.post("/tasks", { text });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
```

У компоненті `TaskForm` додаємо код запуску операції додавання завдання при сабміть форми.

```jsx title="src/components/TaskForm/TaskForm.js" showLineNumbers
import { useDispatch } from "react-redux";
import { addTask } from "redux/operations";

export const TaskForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    dispatch(addTask(event.target.elements.text.value));
    form.reset();
  };

  // Решта коду компонента
};
```

Додамо в слайс `tasksSlice` код обробки екшенів додавання завдання.

```jsx title="src/redux/tasksSlice.js" showLineNumbers
import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks, addTask } from "./operations";

const tasksSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(addTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    // Код решти редюсерів
  },
});
```

## Видалення завдання

Оголосимо операцію видалення, яка чекає лише на ідентифікатор видаленого завдання.

```jsx title="src/redux/operations.js" showLineNumbers
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
```

У компоненті `Task` додаємо код запуску операції видалення завдання при натисканні на кнопку видалення, і передаємо їй ідентифікатор.

```jsx title="src/components/Task/Task.js" showLineNumbers
import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { deleteTask } from "redux/operations";

export const Task = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteTask(task.id));

  return (
    <div>
      <input type="checkbox" checked={task.completed} />
      <p>{task.text}</p>
      <button onClick={handleDelete}>
        <MdClose size={24} />
      </button>
    </div>
  );
};
```

Додамо в слайс `tasksSlice` код обробки екшенів видалення завдання.

```jsx title="src/redux/tasksSlice.js" showLineNumbers
import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks, addTask, deleteTask } from "./operations";

const tasksSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(deleteTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    // Код решти редюсерів
  },
});

export const tasksReducer = tasksSlice.reducer;
```

## Переключення статусу завдання

Оголосимо операцію зміни статусу, яка чекає на весь об'єкт завдання.

```jsx title="src/redux/operations.js" showLineNumbers
export const toggleCompleted = createAsyncThunk(
  "tasks/toggleCompleted",
  async (task, thunkAPI) => {
    try {
      const response = await axios.put(`/tasks/${task.id}`, {
        completed: !task.completed,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
```
У компоненті `Task` додаємо код запуску операції зміни статусу під час кліку по чекбоксу, і передаємо їй весь об'єкт завдання.

```jsx title="src/components/TaskForm/TaskForm.js" showLineNumbers
import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { deleteTask, toggleCompleted } from "redux/operations";

export const Task = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteTask(task.id));

  const handleToggle = () => dispatch(toggleCompleted(task));

  return (
    <div>
      <input type="checkbox" checked={task.completed} onChange={handleToggle} />
      <p>{task.text}</p>
      <button onClick={handleDelete}>
        <MdClose size={24} />
      </button>
    </div>
  );
};
```

Додамо в слайс `tasksSlice` код обробки екшенів зміни статусу завдання.

```jsx title="src/redux/tasksSlice.js" showLineNumbers
import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks, addTask, deleteTask, toggleCompleted } from "./operations";

const tasksSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(toggleCompleted.pending, state => {
        state.isLoading = true;
      })
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
      })
      .addCase(toggleCompleted.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    // Код решти редюсерів
  },
});

export const tasksReducer = tasksSlice.reducer;
```

## Скорочуємо код редюсерів
Ви напевно вже звернули увагу на те, що код редюсерів, які обробляють `pending` та `rejected` екшени всіх операцій, ідентичний. Винесемо логіку цих редюсерів у функції, що допоможе нам скоротити дублювання коду.

```jsx title="src/redux/tasksSlice.js" showLineNumbers
const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, handlePending)
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, handleRejected)
      .addCase(addTask.pending, handlePending)
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addTask.rejected, handleRejected)
      .addCase(deleteTask.pending, handlePending)
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteTask.rejected, handleRejected)
      .addCase(toggleCompleted.pending, handlePending)
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
      })
      .addCase(toggleCompleted.rejected, handleRejected);
  },
});

export const tasksReducer = tasksSlice.reducer;
```

## Фінальний код
Розберіть код живого прикладу, в якому використовується весь пройдений матеріал.

<CP src='https://codesandbox.io/embed/goit-react-textbook-lesson-13-redux-toolkit-app-final-code-q4v1pb?fontsize=14&hidenavigation=1&theme=dark' />
