"use client";
import {
  clearTodo,
  completeTodo,
  deleteTodo,
} from "@/redux/features/todoSlice";
import { useAppSelector } from "@/redux/store";
import { Todo } from "@/types";
import { Trash2 } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { ScrollArea } from "./ui/scroll-area";

interface TodoListProps {
  todoItems: Todo[];
}

const TodoList = ({ todoItems }: TodoListProps) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col w-full mt- mx-5 ml-0 rounded-md items-center bg-gradient-to-l from-slate-200 to-green-300  justify-between py-4 ">
      <ScrollArea className="h-[400px] w-full rounded-md border p-2 border-r-2 border-y-0">
        {todoItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center w-full justify-between mt-5 border-0 bg-zinc-200 rounded p-2"
          >
            <input
              type="checkbox"
              name="isCompleted"
              onClick={() => dispatch(completeTodo(item.id))}
              id="completed"
              className="h-8 w-8"
            />
            <h2 className="text-2xl font-semibold text-slate-900">
              {item.text}
            </h2>
            <Trash2
              className="h-8 w-8 cursor-pointer hover:text-red-500 text-red-800"
              onClick={() => dispatch(deleteTodo(item.id))}
            />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default TodoList;
