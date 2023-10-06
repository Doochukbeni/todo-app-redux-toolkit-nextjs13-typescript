                                               Project Title: Redux To-Do App

Description: This To-Do App is a productivity tool designed to help users organize and manage their tasks and responsibilities efficiently. this app typically allows users to create, filters task, mark task as archived and mark tasks as completed. The primary goal of this To-Do App is to help individuals stay organized, increase productivity, and ensure that important tasks are completed on time.

This todo app was a Nexjs/Reactjs challenge i was asked during one of my interviews. i was able to successfully complete the TodoApp using javascript and setting the local storage without any hydration errors.

This To-Do App was built with NextJS 13.5/ReactJS, Typescript, react-redux, redux-toolkit, localStorage, shadcn UI, Tailwindcss etc.

## Getting Started

Firstly, you need install the dependencies using the following command:

````bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install

Secondly, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## setting up the store

import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import todoReducer from "./features/todoSlice";

export const store = configureStore({
reducer: {
todos: todoReducer,
},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

<!-- since this project was built using typescript it is important to set the types on the Rootstate of the store and also the type of AppDispatch -->

<!-- the useSelector type need to be set so that typescript will know that it is referring to the rootstate -->

## setting up the redux slice

import { Todo } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

<!-- this is a global variable that define the name of this state in the local storage  -->

const LOCAL_STORAGE_KEY = "todos";

interface TodoState {
todos: Todo[];
}

<!-- setting this initial state to an empty array of type TodoState helps to define the type of the initialstate -->

const initialState: TodoState = {
todos: [],
};

export const todoSlice = createSlice({
name: "todos",
initialState,
reducers: {
clearTodo: (state) => {
localStorage.removeItem(LOCAL_STORAGE_KEY);
return (state = initialState);
},

    setTodo: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },

    createTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: nanoid(),
        text: action.payload,
        isCompleted: false,
        isArchived: false,
      };

      state.todos.push(newTodo);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.todos));
    },

    completeTodo: (state, action: PayloadAction<string>) => {
      const isCompletedTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );

      if (isCompletedTodo) {
        isCompletedTodo.isCompleted = !isCompletedTodo.isCompleted;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.todos));
      }
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.todos));
      return state;
    },

    archiveTodo: (state, action: PayloadAction<string>) => {
      const todoArchive = state.todos.find(
        (todo) => todo.id === action.payload
      );
      if (todoArchive) {
        todoArchive.isArchived = !todoArchive.isArchived;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.todos));
      }
    },

},
});

export const {
clearTodo,
createTodo,
completeTodo,
archiveTodo,
deleteTodo,
setTodo,
} = todoSlice.actions;

export default todoSlice.reducer;

<!-- this function gets the local storage items saved in the local storage on start up and it persist the data on the page if properly handled will prevent hydration errors -->

export const getTodoFromLocalStorage = (): Todo[] => {
if (typeof localStorage !== "undefined") {
const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedData) {
      return JSON.parse(storedData) as Todo[];
    }

}
return [];
};

<!-- to use this function in the components to load data from the local storage is as easy as this. we first check for the length of the items saved in the local storage before retrieving the data from local storage -->

useEffect(() => {
const todosFromLocalStorage = getTodoFromLocalStorage();
if (todosFromLocalStorage.length > 0) {
dispatch(setTodo(todosFromLocalStorage));
}
}, [dispatch]);
