"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { useDispatch } from "react-redux";
import { createTodo } from "@/redux/features/todoSlice";

const TodoInput = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const onSubmit = (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!value) return;
      dispatch(createTodo(value));
      setValue("");
    } catch (error) {
      console.log("form submit error:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(value);

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
