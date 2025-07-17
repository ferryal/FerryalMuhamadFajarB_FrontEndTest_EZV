"use client";

import { useState } from "react";
import { useCreateTodoMutation } from "@/store/api/todoApi";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState(1);
  const [createTodo, { isLoading, isSuccess, isError, error }] =
    useCreateTodoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createTodo({
        title: title.trim(),
        completed: false,
        userId,
        id: userId,
      }).unwrap();

      setTitle("");
      setUserId(1);
    } catch (err) {
      console.error("Failed to create todo:", err);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg shadow-slate-100/50">
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex space-x-3">
            <div className="w-20">
              <input
                type="number"
                id="userId"
                min="1"
                value={userId}
                onChange={(e) => setUserId(Number(e.target.value))}
                className="flex h-12 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-200/50 transition-all duration-200"
                placeholder="1"
                required
              />
            </div>

            <div className="flex-1">
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="flex h-12 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-200/50 transition-all duration-200"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !title.trim()}
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 text-white text-sm font-semibold h-12 px-6 py-3 w-full hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-slate-900/10"
          >
            {isLoading ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Adding...
              </>
            ) : (
              "Add Task"
            )}
          </button>
        </form>

        {isSuccess && (
          <div className="mt-6 rounded-lg bg-emerald-50 p-4 border border-emerald-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-emerald-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-emerald-800">
                  Task added successfully!
                </p>
              </div>
            </div>
          </div>
        )}

        {isError && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 border border-red-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-red-800">
                  Failed to add task. Please try again.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
