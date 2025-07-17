import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo, CreateTodoRequest, TodosQueryParams } from "@/types/todo";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    // Get todos with pagination
    getTodos: builder.query<Todo[], TodosQueryParams>({
      query: ({ _start = 0, _limit = 10 }) => ({
        url: "/todos",
        params: {
          _start,
          _limit,
        },
      }),
      providesTags: ["Todo"],
    }),

    // Get all todos count (for pagination)
    getAllTodosCount: builder.query<number, void>({
      query: () => "/todos",
      transformResponse: (response: Todo[]) => response.length,
    }),

    // Create a new todo
    createTodo: builder.mutation<Todo, CreateTodoRequest>({
      query: (newTodo) => ({
        url: "/todos",
        method: "POST",
        body: newTodo,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Todo"],
    }),

    // Get single todo by ID
    getTodoById: builder.query<Todo, number>({
      query: (id) => `/todos/${id}`,
      providesTags: (result, error, id) => [{ type: "Todo", id }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetAllTodosCountQuery,
  useCreateTodoMutation,
  useGetTodoByIdQuery,
} = todoApi;
