# 🔍 Omni Search Dashboard

<img width="1920" height="916" alt="Omni Search Dashboard — Main View" src="https://github.com/user-attachments/assets/e61b710d-4a64-4ece-81a7-c9a240c19158" />

🔗 **[Live Application (SPA / RTK Query Deploy)](https://omni-search-dashboard.netlify.app)**

**Omni Search Dashboard** is a sophisticated video game discovery platform powered by the [RAWG API](https://rawg.io/apidocs). Originally built as a Vite SPA with React class components, it was progressively evolved across **6 consecutive RS School tasks** into a fully server-rendered **Next.js 16** application with internationalization, Redux Toolkit state management, server-side CSV generation, and comprehensive test coverage.

This project is not just a search interface — it is an architectural case study in **incremental migration**: from class components to hooks, from manual fetch to RTK Query, and from client-side SPA to server-rendered Next.js with React Server Components.

> 📋 **RS School React Course:** [rs.school/courses/reactjs](https://rs.school/courses/reactjs)
> 💡 **Note on Current Version:** The current default branch (`main`) and live deployment intentionally run the **`api-queries` (SPA)** version of the app for optimal client-side performance and smooth UX. The final `nextjs-ssr` migration is preserved as an open Pull Request for architectural review.

-----

## 📖 Project Evolution

The application was built and refined across **6 sequential tasks**, each introducing new concepts, patterns, and architectural improvements. Every task has its own dedicated branch and Pull Request preserved in the repository.

| # | Task | Pull Request / Branch | Key Concepts |
|:--|:-----|:----------------------|:-------------|
| 1 | [Class Components](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/class-components.md) | [PR #1 (`class-components`)](https://github.com/FierceSloth/omni-search-dashboard/pull/1) | React class components, lifecycle methods, RAWG API integration, localStorage persistence, Error Boundary, loading states |
| 2 | [Unit Testing](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/tests.md) | [PR #2 (`unit-testing`)](https://github.com/FierceSloth/omni-search-dashboard/pull/2) | Vitest + React Testing Library, behavior-focused testing, API mocking, ≥80% statement coverage |
| 3 | [Routing & Hooks](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/functional-routing.md) | [PR #3 (`hooks-and-routing`)](https://github.com/FierceSloth/omni-search-dashboard/pull/3) | Functional components refactor, React Router, pagination with URL sync, master-detail split view, About & 404 pages |
| 4 | [State Management](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/state-management.md) | [PR #4 (`app-state-management`)](https://github.com/FierceSloth/omni-search-dashboard/pull/4) | Redux Toolkit, Context API (theme), card selection with checkboxes, sticky flyout, CSV download via native Blob API |
| 5 | [API Queries](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/queries.md) | [PR #5 (`api-queries`)](https://github.com/FierceSloth/omni-search-dashboard/pull/5) | RTK Query, data caching, configurable cache TTL, manual cache invalidation, MSW integration for tests |
| 6 | [Next.js SSR](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/nextjs-ssr-ssg.md) | [PR #6 (`nextjs-ssr`)](https://github.com/FierceSloth/omni-search-dashboard/pull/6) | Vite → Next.js migration, React Server Components, Server Actions, next-intl (EN/RU), next/image, file-based routing, SSG for About page |

-----

## 🏗️ Technical Architecture

The project follows **Feature-Sliced Design (FSD)** — a modern architectural methodology that enforces strict unidirectional dependency flow between layers.

```
src/
├── app/          → Global setup: Redux store, providers (Store, Theme), design tokens, SCSS variables
├── pages/        → Page compositions: MainPage, AboutPage, NotFoundPage
├── widgets/      → Complex UI blocks: GamesDiscovery, GameDetails, SelectedFlyout
├── features/     → Interactive scenarios: CardSelection, ThemeSwitcher, LanguageSwitcher, RefreshData
├── entities/     → Domain models: Game (DTO → Entity mapping, types, mocks)
└── shared/       → Reusable UI kit (15 components), i18n config, utilities, constants, test helpers

app/              → Next.js App Router: file-based routing, locale layouts, server components
├── [locale]/     → Locale-scoped routes (EN, RU)
│   ├── page.tsx  → Main search + detail view (Server Component)
│   ├── about/    → Statically generated About page (SSG)
│   └── layout.tsx → Provider tree: NextIntl → Redux → Theme
├── layout.tsx    → Root HTML shell + Google Fonts (Manrope)
└── not-found.tsx → Global 404 handler
```

### Architectural Highlights

- **Server-First Data Fetching** — Both `GamesDiscoveryWidget` and `GameDetailsWidget` are **async React Server Components** that fetch data directly from the RAWG API at request time. No client-side fetch waterfalls.
- **Server Actions** — Search form submission (`submitSearch`) and CSV generation (`generateCsvAction`) are implemented as Next.js Server Actions with `'use server'` directive.
- **DTO → Entity Mapping** — Raw API responses (`IGameCardDTO`, `IGameDetailsDTO`) are transformed into clean UI entities (`IGameCardEntity`, `IGameDetailsEntity`) via a dedicated `gameMapper` at the entities layer, keeping API contract changes isolated from the UI.
- **Redux for Client State Only** — Redux Toolkit manages only client-side concerns (card selection state), while all data fetching is handled by server components. This is a deliberate architectural choice after the migration from RTK Query (used in the `api-queries` branch) to server components.
- **Theme via Context API** — A custom `ThemeProvider` using React Context manages light/dark theme state, toggling `data-theme` attribute on `document.documentElement` for CSS variable switching.
- **Localized Navigation** — All links use `next-intl`'s `createNavigation` wrapper (`Link`, `useRouter`, `usePathname`, `redirect`), ensuring locale prefixes (`/en/...`, `/ru/...`) are automatically handled.
- **FSD + Next.js Coexistence** — A root `pages/` directory (containing only a README) forces Next.js to treat it as the Pages Router root, preventing `src/pages/` (FSD layer) from being misinterpreted as file-based routes.

-----

## ✨ Key Features

### 🎮 Game Discovery & Search

- **Server-Side Search** — Search queries are submitted via a Server Action that redirects to `/?query=...&page=1`, triggering a fresh server-side render with filtered results from the RAWG API.
- **Paginated Results** — URL-synchronized pagination (`?page=N`) with server-rendered page controls.
- **LocalStorage Persistence** — Search terms are saved to localStorage and automatically restored on subsequent visits.
- **Empty State Handling** — Localized messages when no results match the search query.

### 🃏 Master-Detail Split View

- **Split Layout** — Clicking a game card opens a detail panel alongside the search results, without losing scroll position or navigation state.
- **Server-Rendered Details** — The detail panel (`GameDetailsWidget`) is a Server Component that fetches game details (description, developer, genres, rating, website) on the server.
- **Close Control** — A close button returns to the list-only view while preserving current page and search query in the URL.

### ✅ Card Selection & CSV Export

- **Checkbox Selection** — Each game card has an independent checkbox for multi-selection. Clicking the checkbox only toggles selection without opening the detail view.
- **Persistent Across Pages** — Selections are stored in Redux and persist across pagination and search changes within the session.
- **Sticky Flyout** — A bottom-anchored flyout appears when ≥1 item is selected, displaying the count with pluralization support.
- **Server-Side CSV Generation** — The "Download" button triggers a Server Action that generates CSV on the server (ID, Title, Description, Badge, Info, URL) and initiates a client-side download via native `Blob` + `URL.createObjectURL` APIs. Filename reflects item count (e.g., `3_items.csv`).
- **Bulk Clear** — "Clear" button deselects all items at once.

### 🌗 Theme Switching

- **Light & Dark Modes** — Full theme support via CSS custom properties (`--bg-color`, `--text-primary`, `--surface-1`, `--border-subtle`, `--glow-active`, etc.).
- **Context API Implementation** — Theme state managed by React Context, not Redux — a deliberate separation of UI personalization from application state.
- **Ambient Light Effect** — A subtle radial gradient `ambientLight` element adds depth to the background in both themes.

### 🌍 Internationalization

- **2 Languages** — Full English and Russian localization via `next-intl`.
- **Server + Client Translation** — Server components use `getTranslations()`, client components use `useTranslations()`.
- **Locale-Aware Routing** — Path-prefix strategy (`/en/...`, `/ru/...`) with automatic default locale detection.
- **ICU Message Format** — Pluralization support in translations (e.g., `{count, plural, =1 {Item selected} other {Items selected}}`).

### ⚡ Manual Cache Refresh

- **Refresh Button** — A floating toolbar button triggers `router.refresh()` to revalidate all server components and refetch fresh data from the RAWG API.

### 🛡️ Error Handling

- **Error Boundary** — A class-based Error Boundary wraps the application, catching render errors and displaying a fallback UI with a retry option.
- **Async State Renderer** — A reusable component that handles empty states with configurable fallback nodes.
- **Server Error Handling** — Failed API responses (`!response.ok`) throw errors caught by Next.js error boundaries.

### 📄 About Page (SSG)

- **Statically Generated** — The About page is a fully server-rendered static page with `generateStaticParams` for both locales.
- **Author Information** — Displays project description, FSD architecture overview, tech stack tags, and creator info with links to GitHub and RS School.

### 🚫 Custom 404 Page

- **Localized Error Page** — A styled 404 page with a clear message and a navigation link back to the home page.

-----

## 🧪 Testing

Comprehensive test suite covering all architectural layers using **Vitest**, **React Testing Library**, and **MSW (Mock Service Worker)**.

### Coverage Configuration

```json
{
  "thresholds": {
    "statements": 80,
    "branches": 50,
    "functions": 50,
    "lines": 50
  }
}
```

### What's Tested

- **UI Components** — All 15 shared UI components (Button, Card, CardPreview, CardDetail, SearchForm, Pagination, Loader, ErrorBoundary, ErrorMessage, ErrorTrigger, Header, Tag, Checkbox, IconButton, AsyncStateRenderer)
- **Features** — Theme switching, card selection checkbox, language switcher, refresh button
- **Widgets** — GamesDiscovery and GameDetails rendering with mocked API responses via MSW
- **Redux** — Card selection slice (toggle, clear) and memoized selectors
- **Context** — Theme provider and `useTheme` hook lifecycle
- **Utilities** — Date formatting, CSV generation/escape, counter formatting
- **Entity Mapping** — `gameMapper` DTO→Entity transformations and edge cases

### Test Infrastructure

- **MSW Handlers** — Mock API handlers for RAWG endpoints (`/api/games`, `/api/games/:id`) in `src/shared/api/msw/`
- **Render with Providers** — Custom `renderWithProviders` utility wrapping components in Redux + i18n + Theme providers
- **Next.js Mocking** — `next/navigation` mocked via Vitest alias for `useRouter`, `useSearchParams`, `usePathname`
- **SVG Mocking** — Custom Vite plugin that stubs SVG imports as null-rendering components

-----

## 🎨 Design System

The application uses a cohesive design system built on CSS custom properties and SCSS Modules:

### Design Tokens

| Token | Dark Mode | Light Mode |
|:------|:----------|:-----------|
| `--bg-color` | `#000000` | `#f9f9fb` |
| `--text-primary` | `#ffffff` | `#111113` |
| `--surface-1` | `rgba(20, 20, 20, 0.6)` | `rgba(255, 255, 255, 0.75)` |
| `--border-glass` | `rgba(255, 255, 255, 0.15)` | `rgba(0, 0, 0, 0.15)` |
| `--glow-active` | `0 0 30px rgba(255, 255, 255, 0.15)` | `0 16px 36px rgba(0, 0, 0, 0.08)` |

### Typography

- **Display Font:** Didot / Bodoni MT / Times New Roman (serif) — for headers
- **UI Font:** [Manrope](https://fonts.google.com/specimen/Manrope) (sans-serif, Latin + Cyrillic) — for body text

### Responsive Breakpoints

| Breakpoint | Width |
|:-----------|:------|
| Large | `≤ 1200px` |
| Medium | `≤ 992px` |
| Small | `≤ 768px` |
| Mobile | `≤ 480px` |

### UI Kit (15 Components)

| Component | Description |
|:----------|:------------|
| `Button` | Primary action button with variants |
| `Card` | Base card composition component |
| `CardPreview` | Game card with image, title, badge, rating, and action slot |
| `CardDetail` | Detailed view with description, metadata, tags, and external link |
| `SearchForm` | Search input with SVG icon and Server Action submission |
| `Pagination` | Page navigation with current/total sync |
| `Loader` | Loading indicator component |
| `ErrorBoundary` | React class Error Boundary with fallback UI |
| `ErrorMessage` | Styled error display with icon |
| `ErrorTrigger` | Debug button to simulate application errors |
| `Header` | Page header with title, subtitle, and navigation link |
| `Tag` | Label/badge component for genres and tech tags |
| `Checkbox` | Custom checkbox for card selection |
| `IconButton` | Icon-only button (used for theme, language, refresh) |
| `AsyncStateRenderer` | Conditional renderer for empty/loaded states |

-----

## 💻 Tech Stack

| Category | Technologies |
|:---------|:------------|
| **Framework** | Next.js 16 (App Router, Webpack) |
| **Core** | React 19, TypeScript 6 |
| **State Management** | Redux Toolkit 2, React Redux 9 |
| **Theme** | React Context API (custom provider) |
| **Internationalization** | next-intl 4 (EN, RU) |
| **Styling** | SCSS Modules, CSS Custom Properties |
| **SVG** | @svgr/webpack (SVG → React components) |
| **Image Optimization** | next/image |
| **Data Source** | RAWG Video Games API |
| **Testing** | Vitest 4, React Testing Library 16, MSW 2, V8 Coverage |
| **Linting** | ESLint 9 (TypeScript strict + Unicorn plugin + Next.js), Prettier |
| **Git Flow** | Husky 9, lint-staged 16, Commitlint (Conventional Commits) |

-----

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm** v9+
- **RAWG API Key** — A free key is included in `.env.example` for reviewer convenience

### Installation

```bash
# Clone the repository
git clone https://github.com/FierceSloth/omni-search-dashboard.git

# Navigate to the project
cd omni-search-dashboard

# Install dependencies
npm install
```

### 🔑 Environment Variables

Create a `.env` file in the project root (or copy from `.env.example`):

```env
# Cache Time-To-Live in seconds
VITE_CACHE_TTL=60

# RAWG API Key (free tier)
VITE_RAWG_API_KEY=your_api_key_here
```

> 💡 A test API key is included in `.env.example` for reviewer convenience.

### Running the Application

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000` (or `http://localhost:5173` for Vite).

### Available Scripts

| Script | Description |
|:-------|:------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server (if applicable) |
| `npm run lint` | Run ESLint on source files |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format source files with Prettier |
| `npm run validate` | Full pipeline: format + lint:fix + lint |
| `npm run test` | Run Vitest in watch mode |
| `npm run test:coverage` | Run tests with V8 coverage report |

-----

## 🌳 Branch History

Each branch represents a complete, functional version of the application at a specific stage of development:

```
main
 └── class-components        ← React class components + RAWG API + Error Boundary
      └── unit-testing        ← Vitest + RTL + 80%+ coverage
           └── hooks-and-routing  ← Functional components + React Router + Pagination + Master-Detail
                └── app-state-management  ← Redux Toolkit + Theme Context + Card Selection + CSV
                     └── api-queries      ← RTK Query + Cache + MSW ⭐ (best SPA version)
                          └── nextjs-ssr  ← Next.js 16 + SSR/SSG + Server Actions + i18n
```

> ⭐ The `api-queries` branch represents the most polished SPA version with RTK Query caching, loading spinners, and the full interactive experience. It is currently deployed as the `main` version.

-----

## 📐 Code Quality

The project enforces strict code quality standards through multiple layers of automation:

- **TypeScript** — Strict mode enabled (`strict: true`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`)
- **ESLint** — Flat config with `typescript-eslint` type-checked rules, `unicorn` plugin (kebab-case filenames), `@next/eslint-plugin-next`, explicit return types, forbidden `any` and non-null assertions
- **Prettier** — 2 spaces, semicolons, single quotes, 120 char print width
- **Commitlint** — Conventional Commits enforcement (`feat`, `fix`, `refactor`, `docs`, `style`, `chore`, `init`, `test`), max 72 char headers
- **Husky** — Pre-commit hooks running `lint-staged` (Prettier + ESLint on staged files)
- **Zero `any`** — The codebase contains no TypeScript `any` types
- **Zero `ts-ignore`** — No TypeScript suppressions used anywhere
