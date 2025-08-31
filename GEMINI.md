# Project: Tab Keeper Prime

This document provides a comprehensive overview of the "Tab Keeper Prime" project, its structure, and development conventions to serve as a guide for AI-driven development.

## Project Overview

Tab Keeper Prime is a web application built to help users manage and organize browser tabs or links. It is developed using a modern frontend stack, including:

-   **Framework:** React
-   **Build Tool:** Vite
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **UI Components:** shadcn/ui, built on top of Radix UI primitives.
-   **Routing:** React Router DOM
-   **Data Fetching:** TanStack React Query

The project follows a standard component-based architecture with a clear separation of concerns into pages, components, hooks, and utility functions.

## Building and Running

All necessary commands are defined in the `package.json` file.

### Development

To run the application in a local development environment with hot-reloading:

```bash
npm run dev
```

### Building for Production

To create an optimized production build of the application:

```bash
npm run build
```

### Linting

To check the codebase for linting errors and style issues:

```bash
npm run lint
```

### Previewing the Production Build

To serve the production build locally for previewing:

```bash
npm run preview
```

## Development Conventions

### Project Structure

The project is organized into the following key directories:

-   `src/`: Contains all the application's source code.
    -   `components/`: Reusable React components.
        -   `ui/`: Components provided by shadcn/ui.
    -   `hooks/`: Custom React hooks for shared logic (e.g., `useLocalStorage`).
    -   `lib/`: Utility functions.
    -   `pages/`: Top-level components that correspond to application routes.
    -   `types/`: TypeScript type definitions.
-   `public/`: Static assets that are publicly accessible.

### UI and Styling

-   The UI is constructed using **shadcn/ui** components, which are highly customizable and accessible.
-   Styling is handled primarily with **Tailwind CSS**. Utility classes are preferred for styling components directly in the JSX.
-   The `tailwind.config.ts` file defines the project's design system, including colors, spacing, and fonts.

### State Management

-   For server state and data fetching, the project uses **TanStack React Query**.
-   For local, client-side state, React's built-in state management (`useState`, `useReducer`) is used. The `useLocalStorage` hook indicates that some state is persisted in the browser's local storage.
