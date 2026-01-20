# GEMINI.md - Best Practices & Coding Standards

Reference this document before every major feature implementation to ensure consistency and quality.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: JavaScript (ES6+)
- **State Management**: React Hooks (`useState`, `useReducer`, `useContext`) - Avoid external libraries unless necessary.
- **Data Fetching**: Native `fetch` with caching or React Query (if installed).
- **PWA**: Native Next.js manifest + service worker (Turbopack compatible)

---

## Feature Development Workflow

Follow this structured plan for every new feature:

### 1. Research Phase
- **Read the latest documentation** for the dependencies and tech stack involved.
- **Verify dependency health**: Check npm/GitHub for last publish date, open issues, and maintenance activity. Avoid unmaintained packages.
- **Confirm compatibility**: Ensure dependencies work with Next.js 16 and Turbopack.
- When in doubt, prefer native solutions over third-party packages.

### 2. Implementation Phase
- Follow the **Coding Standards** below.
- Use best practices from official docs (Next.js, React, Tailwind).
- Keep components small, focused, and reusable.
- Write clean, readable code with meaningful names.

### 3. Verification Phase
- **Lint check**: Run `npm run lint` and fix all warnings/errors.
- **Build check**: Run `npm run build` to ensure the project compiles successfully.
- Test the feature manually in the browser.

---

## Coding Standards

### 1. Component Structure
- Use **Functional Components** with named exports.
- **Colocation**: Keep related styles, tests, and sub-components close to the feature.
- **Props**: Destructure props in the function signature.

### 2. Styling (Tailwind CSS)
- **Utility-First**: Use utility classes for 90% of styling.
- **`cn` Utility**: Always use the `cn` (`clsx` + `tailwind-merge`) helper for conditional class names.
  ```javascript
  // Good
  <div className={cn("p-4 rounded-xl", isActive ? "bg-blue-500" : "bg-slate-900")}>
  ```
- **Mobile-First**: Default styles are mobile; use `md:`, `lg:` for larger screens.

### 3. State Management
- **URL as State**: For shareable state (filters, views, search), use `useSearchParams` instead of `useState`.
- **Suspense Boundary**: Always wrap components using `useSearchParams` in a `<Suspense>` boundary.
- **Server > Client**: Prefer Server Components for data fetching. Use Client Components (`"use client"`) only for interactivity.

### 4. Performance
- **Images**: Use `next/image` for all bitmaps.
- **Dynamic Imports**: Use `next/dynamic` for heavy client components.
- **Memoization**: Use `useMemo` and `useCallback` for expensive calculations or reference stability in dependency arrays.

### 5. Accessibility
- **Semantic HTML**: Use `<main>`, `<header>`, `<nav>`, `<button>` appropriately.
- **ARIA**: Add specific `aria-labels` for icon-only buttons.