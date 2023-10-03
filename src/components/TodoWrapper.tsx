"use client";
import React, { useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { nanoid } from "nanoid";
import { useAppSelector } from "@/redux/store";

// interface Todo {
//   id: string;
//   text: string;
//   isCompleted: boolean;
//   isEditing: boolean;
// }

const TodoWrapper = () => {
  const newTodo = useAppSelector((state) => state.todos);
  console.log(newTodo);

  const [todos, setTodos] = useState(newTodo);

  const addTodo = (todo: any) => {
    setTodos([...todos]);
  };

  return (
    <div className="bg-indigo-500 w-[800px] h-screen">
      <div className="p-4">
        <TodoInput />
      </div>
      <TodoList />
    </div>
  );
};

export default TodoWrapper;
