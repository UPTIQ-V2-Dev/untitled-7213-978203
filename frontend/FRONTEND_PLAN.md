# Simple Todo App - Technical Implementation Plan

## Tech Stack
- React 19 + TypeScript
- Vite build tool
- Tailwind CSS v4
- Shadcn/UI components
- React Router DOM
- React Query for API state management
- Axios for API calls

## Page-by-Page Implementation Plan

### 1. Authentication Pages
**Components:**
- `src/pages/LoginPage.tsx` - User login interface
- `src/pages/SignupPage.tsx` - User registration interface
- `src/components/auth/LoginForm.tsx` - Login form component
- `src/components/auth/SignupForm.tsx` - Registration form component

**Utils & Services:**
- `src/services/auth.ts` - Authentication API calls
- `src/hooks/useAuth.ts` - Authentication hooks

**API Endpoints:**
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Refresh token
- `POST /auth/logout` - User logout

### 2. Layout & Navigation
**Components:**
- `src/components/layout/AppLayout.tsx` - Main app layout wrapper
- `src/components/navigation/Navbar.tsx` - Top navigation bar
- `src/components/navigation/Sidebar.tsx` - Side navigation (mobile)

### 3. Todo Dashboard Page (`/`)
**Components:**
- `src/pages/TodosPage.tsx` - Main todos dashboard
- `src/components/todos/TodoList.tsx` - List of todos
- `src/components/todos/TodoItem.tsx` - Individual todo item
- `src/components/todos/TodoForm.tsx` - Add/Edit todo form
- `src/components/todos/TodoFilters.tsx` - Filter todos by status
- `src/components/todos/TodoStats.tsx` - Todo statistics overview

**Utils & Services:**
- `src/hooks/useTodos.ts` - Custom hook for todo data
- `src/services/todoService.ts` - Todo API calls
- `src/utils/todoUtils.ts` - Todo utilities

**API Endpoints:**
- `GET /api/todos` - Fetch user todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PATCH /api/todos/:id/complete` - Toggle todo completion

### 4. Todo Categories Management
**Components:**
- `src/pages/CategoriesPage.tsx` - Manage todo categories
- `src/components/categories/CategoryList.tsx` - List of categories
- `src/components/categories/CategoryForm.tsx` - Add/Edit category form

**API Endpoints:**
- `GET /api/categories` - Fetch user categories
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### 5. Common Components
**Shared UI Components:**
- `src/components/common/Loading.tsx` - Loading spinner
- `src/components/common/ErrorBoundary.tsx` - Error handling
- `src/components/common/ConfirmDialog.tsx` - Confirmation dialogs
- `src/components/common/ProtectedRoute.tsx` - Route protection

### 6. Types & Models
**Type Definitions:**
- `src/types/todo.ts` - Todo data models
- `src/types/category.ts` - Category data models
- `src/types/api.ts` - API response types
- `src/types/user.ts` - User and auth types (already exists)

### 7. State Management & Utils
**Hooks & Utilities:**
- `src/hooks/useAuth.ts` - Authentication logic
- `src/hooks/useTodos.ts` - Todo management
- `src/utils/constants.ts` - App constants
- `src/services/storage.ts` - Local storage utilities

### 8. Routing Setup
**Router Configuration:**
- Update `src/App.tsx` with React Router setup
- Define routes for all pages (login, todos, categories)
- Add protected routes
- Add 404 page handling

## Implementation Order
1. ✅ Update frontend plan for todo app
2. 🔄 Implement login page and authentication
3. Create todo types and API services
4. Create basic todo dashboard with CRUD operations
5. Implement todo categories management
6. Add todo filters and search functionality
7. Polish UI/UX and add loading states
8. Add error handling and edge cases
9. Implement protected routes and auth guards