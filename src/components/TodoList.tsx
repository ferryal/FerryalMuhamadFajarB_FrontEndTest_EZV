"use client";

import { useState } from "react";
import { useGetTodosQuery } from "@/store/api/todoApi";
import { Todo } from "@/types/todo";

interface TodoListProps {
  initialTodos?: Todo[];
  initialPage?: number;
}

export default function TodoList({
  initialTodos,
  initialPage = 1,
}: TodoListProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 10;
  const start = (currentPage - 1) * itemsPerPage;

  const {
    data: todos,
    error,
    isLoading,
    isFetching,
  } = useGetTodosQuery({ _start: start, _limit: itemsPerPage });

  // Use RTK Query data or fall back to initial data
  const displayTodos = todos || initialTodos;

  // For simplicity, we'll assume there are 200 total todos (common in jsonplaceholder)
  // In a real app, you'd get this from a separate API call
  const totalItems = 200;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    const halfButtons = Math.floor(maxButtons / 2);

    let startPage = Math.max(1, currentPage - halfButtons);
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    return buttons;
  };

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <div className="flex items-center space-x-3">
          <svg
            className="h-5 w-5 text-red-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <span className="text-sm font-semibold text-red-800">
            Unable to load tasks
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Loading indicator */}
      {isFetching && (
        <div className="flex justify-center">
          <svg
            className="h-5 w-5 animate-spin text-slate-500"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}

      {isLoading && !displayTodos ? (
        <div className="flex justify-center py-16">
          <svg
            className="h-8 w-8 animate-spin text-slate-500"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      ) : displayTodos && displayTodos.length > 0 ? (
        <>
          {/* Todo Items */}
          <div className="space-y-4">
            {displayTodos.map((todo) => (
              <div
                key={todo.id}
                className="bg-white rounded-xl border border-slate-200 shadow-lg shadow-slate-100/50 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-0.5">
                      {todo.completed ? (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 border-2 border-emerald-300">
                          <svg
                            className="h-3 w-3 text-emerald-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-slate-300 hover:border-slate-400 transition-colors duration-200"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-base font-medium leading-relaxed ${
                          todo.completed
                            ? "text-slate-500 line-through"
                            : "text-slate-900"
                        }`}
                      >
                        {todo.title}
                      </p>
                      <div className="flex items-center space-x-3 mt-3">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          #{todo.id}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          User {todo.userId}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            todo.completed
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {todo.completed ? "Completed" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-200 pt-8">
            <div className="text-sm font-medium text-slate-600">
              Showing{" "}
              <span className="font-semibold text-slate-900">{start + 1}</span>{" "}
              to{" "}
              <span className="font-semibold text-slate-900">
                {Math.min(start + itemsPerPage, totalItems)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-900">{totalItems}</span>{" "}
              results
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-slate-200/50 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 h-10 w-10 shadow-sm"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15,18 9,12 15,6" />
                </svg>
              </button>

              {getPaginationButtons().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-slate-200/50 h-10 w-10 shadow-sm ${
                    currentPage === page
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "border border-slate-300 bg-white hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-slate-200/50 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 h-10 w-10 shadow-sm"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9,18 15,12 9,6" />
                </svg>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-slate-100 rounded-full p-4 mb-6">
            <svg
              className="h-8 w-8 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No tasks found
          </h3>
          <p className="text-sm text-slate-600 max-w-sm">
            Get started by creating your first task. It will appear here once
            added.
          </p>
        </div>
      )}
    </div>
  );
}
