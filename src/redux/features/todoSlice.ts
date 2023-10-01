import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
  isArchived: boolean;
}

const initialState: Todo[] = [];

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearTodo: () => initialState,

    createTodo: (state, action: PayloadAction<Todo>) => {
      state.push({
        id: nanoid(),
        text: action.payload.text,
        isCompleted: false, // Set to false by default
        isArchived: false, // Set to false by default
      });
    },

    completeTodo: (state, action: PayloadAction<string>) => {
      const todoToComplete = state.find((todo) => todo.id === action.payload);
      if (todoToComplete) {
        todoToComplete.isCompleted = true;
      }
    },

    archiveTodo: (state, action: PayloadAction<string>) => {
      const todoToArchive = state.find((todo) => todo.id === action.payload);
      if (todoToArchive) {
        todoToArchive.isArchived = true;
      }
    },
  },
});

export const { clearTodo, createTodo, completeTodo, archiveTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
