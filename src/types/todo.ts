// Todo type definition based on jsonplaceholder.typicode.com/todos response
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Type for creating a new todo (without id since it's auto-generated)
export interface CreateTodoRequest {
  userId: number;
  title: string;
  completed: boolean;
  id: number;
}

// Response type for paginated todos
export interface TodosResponse {
  todos: Todo[];
  total: number;
  start: number;
  limit: number;
}

// Query parameters for pagination
export interface TodosQueryParams {
  _start?: number;
  _limit?: number;
}
