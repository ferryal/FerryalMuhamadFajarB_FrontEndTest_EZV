# Todo App - Modern Task Management

A modern, responsive todo application built with Next.js 15, featuring a beautiful UI and advanced state management with Redux Toolkit Query.

## ✨ Features

- **Create and manage todos** with an intuitive interface
- **Real-time data synchronization** using RTK Query
- **Pagination support** (10 items per page)
- **Hybrid rendering strategy** combining SSR and ISR
- **Beautiful modern UI** with light theme design
- **TypeScript** for type safety
- **Responsive design** that works on all devices
- **Professional components** with shadcn/ui inspired styling

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **State Management**: Redux Toolkit Query (RTK Query)
- **Language**: TypeScript
- **Styling**: CSS Modules with CSS Variables
- **API**: JSONPlaceholder REST API
- **Rendering**: Hybrid SSR/ISR implementation
- **UI Components**: Custom components with modern design system

## 🏗️ Architecture

### Rendering Strategy

- **ISR (Incremental Static Regeneration)**: Pre-renders first 5 pages at build time with 60-second revalidation
- **SSR (Server-Side Rendering)**: Fresh data fetching for dynamic requests
- **CSR (Client-Side Rendering)**: RTK Query handles client-side updates and caching

### State Management

- **RTK Query** for server state management
- **Automatic caching** and background refetching
- **Optimistic updates** for better UX
- **Error handling** with proper fallbacks

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ezv-app-todo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout with Redux provider
│   └── page.tsx             # Main todo page with hybrid rendering
├── components/
│   ├── TodoForm.tsx         # Form component for creating todos
│   └── TodoList.tsx         # List component with pagination
├── store/
│   ├── index.ts             # Redux store configuration
│   └── api/
│       └── todoApi.ts       # RTK Query API endpoints
└── types/
    └── todo.ts              # TypeScript type definitions
```

## 🎨 Design System

The application features a modern design system with:

- **Light theme** with carefully selected color palette
- **Gradient backgrounds** for visual depth
- **Professional shadows** and rounded corners
- **Consistent spacing** using Tailwind-inspired scale
- **Focus states** for accessibility
- **Smooth animations** (200-300ms transitions)
- **Typography** using system font stack

## 🌐 API Integration

- **Base URL**: `https://jsonplaceholder.typicode.com/todos`
- **GET /todos**: Fetch todos with pagination (`_start`, `_limit`)
- **POST /todos**: Create new todos
- **Automatic retry** and error handling
- **Background refetching** for fresh data

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to [Vercel](https://vercel.com)
2. Deploy automatically with Git integration

### Other Platforms

```bash
npm run build
npm run start
```

## 🔄 Revalidation Strategy

- **Build-time**: Static generation for first 5 pages
- **Runtime**: 60-second ISR revalidation
- **Client-side**: RTK Query automatic refetching
- **On-demand**: Manual refresh triggers

## 🎯 Performance Features

- **Code splitting** with Next.js automatic optimization
- **Image optimization** with Next.js Image component
- **Caching strategies** with RTK Query
- **Minimal bundle size** with tree shaking
- **Fast navigation** with prefetching

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and modern web technologies.
