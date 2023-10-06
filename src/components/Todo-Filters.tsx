import React from "react";
import { Button } from "./ui/Button";
import { Todo } from "@/types";

interface TodoFiltersProps {
  todo: Todo[];
}

const TodoFilters = ({ todo }: TodoFiltersProps) => {
  const filteredTodo = () => {
    const newTodo = todo.filter((item) => item.isCompleted === true);
    console.log("new Todo", newTodo);

    return newTodo;
  };

  return (
    <div className="flex items-center gap-5 ml-8 p-2">
      <Button variant={"secondary"} onClick={filteredTodo}>
        completed Todos
      </Button>
      <Button variant={"secondary"}>Archived Todos</Button>
      <Button variant={"secondary"}>All Todos</Button>
    </div>
  );
};

export default TodoFilters;
