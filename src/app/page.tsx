import { Suspense } from "react";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { Todo } from "@/types/todo";

// Unified data fetching function with ISR + SSR capabilities
async function fetchTodos(
  start: number = 0,
  limit: number = 10
): Promise<Todo[]> {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${limit}`,
      {
        next: {
          revalidate: 60, // ISR: Revalidate every 60 seconds
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

interface TodosPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function TodosPage({ searchParams }: TodosPageProps) {
  // Await searchParams (Next.js 15 requirement)
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;

  // Fetch todos with hybrid ISR/SSR approach
  const initialTodos = await fetchTodos(start, itemsPerPage);
  const renderTime = new Date().toISOString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto max-w-2xl px-6 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Tasks
          </h1>
        </header>

        {/* Main Content */}
        <div className="space-y-8">
          <Suspense
            fallback={
              <div className="flex justify-center py-8">
                <svg
                  className="h-6 w-6 animate-spin text-slate-500"
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
            }
          >
            <TodoForm />
          </Suspense>

          <Suspense
            fallback={
              <div className="flex justify-center py-8">
                <svg
                  className="h-6 w-6 animate-spin text-slate-500"
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
            }
          >
            <TodoList initialTodos={initialTodos} initialPage={page} />
          </Suspense>
        </div>

        {/* Subtle Footer */}
        <footer className="mt-20 text-center">
          <div className="inline-flex items-center space-x-3 text-sm text-slate-500">
            <span className="font-medium">Page {page}</span>
            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
            <span className="font-mono text-xs">
              {renderTime.split("T")[1].split(".")[0]}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

// ISR: Generate static params for pre-building popular pages
export async function generateStaticParams() {
  // Pre-generate the first 5 pages at build time
  return Array.from({ length: 5 }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ searchParams }: TodosPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;

  return {
    title: `Todo List - Page ${page} | Hybrid ISR + SSR`,
    description: `Todo list page ${page} with hybrid rendering: ISR pre-rendering, SSR fresh data, RTK Query client updates`,
  };
}

// ISR: Enable revalidation every 60 seconds
export const revalidate = 60;
