# 🍿 Vue TV Show Explorer

A modern, performant Vue 3 application that allows users to search, filter, and browse TV shows using the TVMaze API.

## 🚀 Features

- 🔍 Search for TV shows with debounced input
- 🎯 Filter shows by **genre** and **rating**
- 📺 Display categorized carousels for:
  - All Shows
  - Crime Shows
  - Popular Shows
- 🧠 Smart lazy-loading of content using a `useSwiperPagination` composable
- 🧪 Unit tested critical logic (pagination, filtering, etc.)
- 📦 Decoupled service layer for easy state management migrations

## ⚙️ Setup & Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm run test:unit

### 📌 Highlights

- **Chunk-based Pagination:** Improves performance by loading 10 slides at a time as the user navigates.
- **Composable Abstraction:** `useSwiperPagination` is reusable, testable, and works with dynamic data inputs.
- **Separation of Concerns:** API calls and filtering logic are isolated via a service layer (`ShowsService`, `FiltersService`).
- **Scalable Architecture:** The project is easily extendable to include more categories or migrate to different state management tools.
```

### 💡 Future Improvements

- [x] Add unit tests for UI components (e.g., search input)
- [x] Enhance mobile responsiveness
- [x] Implement skeleton loading states for better UX
- [x] Support internationalization (i18n)

## 🛠 Tech Stack

- **Vue 3 + `<script setup>`**
- **Pinia** (through custom service layer)
- **Vitest** + `vi.mock()` for testing
- **PrimeVue** (UI components like buttons, inputs)
- **Swiper.js** for responsive carousels
- **TVMaze API** as the content provider
