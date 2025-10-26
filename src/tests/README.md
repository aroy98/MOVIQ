# Test Suite

This folder contains all automated tests using **Vitest + React Testing Library + MSW**.

## How to run

```bash
npm i -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom msw whatwg-fetch
npm run test
npm run coverage
```

Ensure `vitest.config.ts` is at the project root and aliases `@` to `src/`.

## Structure

- `tests/setup.ts` — RTL + jest-dom + MSW bootstrapping
- `tests/mocks/*` — Mock handlers for TMDB-like endpoints
- `tests/components/*` — component-level tests
- `tests/pages/*` — page-level tests
- `tests/hooks/*` — hooks tests (API + watchlist)
- `tests/utils/*` — utility tests and helpers
