"use client";
import React, { useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { nanoid } from "nanoid";

interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
  isEditing: boolean;
}

const TodoWrapper = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: any) => {
    setTodos([
      ...todos,
      { id: nanoid(), text: todo, isCompleted: false, isEditing: false },
    ]);
  };
  console.log(todos);

  return (
    <div className="bg-indigo-500 w-[800px] h-screen">
      <div className="p-4">
        <TodoInput addTodo={addTodo} />
      </div>
      <TodoList />
    </div>
  );
};

export default TodoWrapper;
