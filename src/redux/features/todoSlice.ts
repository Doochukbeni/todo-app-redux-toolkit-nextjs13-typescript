import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const LOCAL_STORAGE_KEY = "todos";

interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
  isArchived: boolean;
}

const getTodoFromLocalstorage = (): Todo[] => {
  if (typeof localStorage !== "undefined") {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedData) {
      return JSON.parse(storedData) as Todo[];
    }
  }
  return [];
};

const initialState: Todo[] = getTodoFromLocalstorage();

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearTodo: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return [];
    },

    createTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: nanoid(),
        text: action.payload,
        isCompleted: false, // Set to false by default
        isArchived: false, // Set to false by default
      };

      state.push(newTodo);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },

    completeTodo: (state, action: PayloadAction<string>) => {
      const todoToComplete = state.find((todo) => todo.id === action.payload);
      if (todoToComplete) {
        todoToComplete.isCompleted = true;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
      }
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state = state.filter((todo) => todo.id !== action.payload);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
      return state;
    },

    archiveTodo: (state, action: PayloadAction<string>) => {
      const todoToArchive = state.find((todo) => todo.id === action.payload);
      if (todoToArchive) {
        todoToArchive.isArchived = true;
      }
    },
  },
});

export const { clearTodo, createTodo, completeTodo, archiveTodo, deleteTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
