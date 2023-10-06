import { Todo } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const LOCAL_STORAGE_KEY = "todos";

interface TodoState {
  todos: Todo[];
}

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

export const getTodoFromLocalStorage = (): Todo[] => {
  if (typeof localStorage !== "undefined") {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedData) {
      return JSON.parse(storedData) as Todo[];
    }
  }
  return [];
};
