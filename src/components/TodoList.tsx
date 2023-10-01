import { Delete, Trash, Trash2 } from "lucide-react";
import React from "react";

const TodoList = () => {
  return (
    <div className="bg-slate-300 flex w-full mx-5 ml-0 rounded-md items-center justify-between p-3">
      <input
        type="checkbox"
        name="isCompleted"
        id="completed"
        className="h-8 w-8"
      />
      <h2 className="text-2xl font-semibold text-indigo-500">
        what to do today?
      </h2>
      <Trash2 className="h-8 w-8 cursor-pointer hover:text-red-500 text-red-800" />
    </div>
  );
};

export default TodoList;
