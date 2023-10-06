"use client";

import React, { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Todo } from "@/types";
import { useDispatch } from "react-redux";
import { clearTodo, createTodo, setTodo } from "@/redux/features/todoSlice";
import { getTodoFromLocalStorage } from "@/redux/features/todoSlice";
import { Button } from "./ui/Button";
import TodoFilters from "./Todo-Filters";

const TodoWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();

  const allTodos = useAppSelector((state) => state.todos.todos);
  console.log("all todos", allTodos);

  const [todos, setTodos] = useState(allTodos);

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  const addTodo = (todo: string) => {
    dispatch(createTodo(todo));
  };

  useEffect(() => {
    const todosFromLocalStorage = getTodoFromLocalStorage();
    if (todosFromLocalStorage.length > 0) {
      dispatch(setTodo(todosFromLocalStorage));
    }
  }, [dispatch]);

  return (
    <div className="bg-indigo-500 flex flex-col gap-5 w-[800px] h-screen">
      <div className="p-4">
        <TodoInput addTodo={addTodo} />
      </div>
      <TodoList todoItems={todos} />
      <TodoFilters todo={todos} />

      <Button onClick={() => dispatch(clearTodo())} className="w-max mx-auto">
        clear all Todos
      </Button>
    </div>
  );
};

export default TodoWrapper;
