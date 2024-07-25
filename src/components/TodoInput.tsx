"use client";

import { useState } from "react";
import { Button } from "./ui/Button";

interface TodoInputProps {
  addTodo: (input: string) => void;
}

const TodoInput = ({ addTodo }: TodoInputProps) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (value.trim() !== "") {
        addTodo(value);

        setValue("");
      }
    } catch (error) {
      console.log("form submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex mx-2 rounded" onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
        placeholder="what do you want to do ?"
        className="text-slate-700 focus:outline-none p-5 border-none h-10 w-full bg-slate-200 "
      />
      <Button disabled={loading} className="rounded-none w-max">
        Add
      </Button>
    </form>
  );
};

export default TodoInput;
