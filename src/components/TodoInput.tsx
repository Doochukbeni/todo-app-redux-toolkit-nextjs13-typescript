"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
interface TodoInputProps {
  addTodo: (event: string) => void;
}

const TodoInput = ({ addTodo }: TodoInputProps) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      addTodo(value);
      localStorage.setItem("value", value);
      console.log(value);
      setValue("");
    } catch (error) {
      const [value, setValue] = useState("");
      console.log("form submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="bg-slate-400 flex" onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
        placeholder="what do you want to do ?"
        className="text-slate-800 focus:outline-none p-3 border-none h-10 w-full "
      />
      <Button disabled={loading} className="rounded-none">
        Add
      </Button>
    </form>
  );
};

export default TodoInput;
