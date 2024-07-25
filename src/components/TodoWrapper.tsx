"use client";

import React, { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { AppDispatch, useAppSelector } from "@/redux/store";
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
    <div className="bg-white flex flex-col gap-5 w-[800px] h-screen">
      <div className="h-auto w-full bg-gradient-to-r from-slate-200 to-green-300 flex flex-col items-center gap-5 p-5 border-b-2 mb-5">
        <h1 className="font-bold text-3xl text-slate-900 tracking-tight">
          Todo App{" "}
        </h1>
        <p className="text-muted-foreground text-sm ">
          write down your daily task and track them as well.
        </p>
      </div>
      <TodoInput addTodo={addTodo} />

      <TodoList todoItems={todos} />
      <TodoFilters todo={todos} />

      <Button onClick={() => dispatch(clearTodo())} className="w-max mx-auto">
        clear all Todos
      </Button>
    </div>
  );
};

export default TodoWrapper;
