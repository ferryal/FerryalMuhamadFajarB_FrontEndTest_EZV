import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Todo, CreateTodoRequest, TodosQueryParams } from "@/types/todo";

// RTK Query API slice for todos
export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    // Get todos with pagination
    getTodos: builder.query<Todo[], TodosQueryParams>({
      query: ({ _start, _limit }) => `todos?_start=${_start}&_limit=${_limit}`,
      providesTags: ["Todo"],
    }),

    // Get all todos for ISR
    getAllTodos: builder.query<Todo[], void>({
      query: () => "todos",
      providesTags: ["Todo"],
    }),

    // Create a new todo
    createTodo: builder.mutation<Todo, CreateTodoRequest>({
      query: (newTodo) => ({
        url: "todos",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todo"],
    }),

    // Get single todo by ID
    getTodoById: builder.query<Todo, number>({
      query: (id) => `todos/${id}`,
      providesTags: (result, error, id) => [{ type: "Todo", id }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetAllTodosQuery,
  useCreateTodoMutation,
  useGetTodoByIdQuery,
  useLazyGetTodosQuery,
} = todosApi;
