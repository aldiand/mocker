# Contributing to Mocker

Thank you for your interest in contributing to **Mocker**! We welcome contributions from designers, developers, and open-source enthusiasts.

---

## Code of Conduct

Please review and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md) in all community interactions and contributions.

---

## How to Contribute

### 1. Adding a New UI Prototype

Mocker makes it easy to add full-screen React UI prototypes using front-matter comments.

1. **Scaffold a prototype component**:
   Run the interactive generator:
   ```bash
   npm run create:prototype
   ```
   Or pass parameters directly:
   ```bash
   npx tsx scripts/create-prototype.ts --title="Analytics Overview" --device=desktop --category="Analytics" --tags="dashboard, charts"
   ```

2. **Add JSDoc Front-Matter Metadata**:
   Each prototype file (`src/prototypes/**/*.tsx`) should start with a front-matter JSDoc comment:
   ```tsx
   /**
    * title: Analytics Overview
    * category: Analytics
    * device: desktop
    * tags: dashboard, charts, stats
    * order: 1
    */
   export default function AnalyticsOverview() {
     return (
       <div className="h-full w-full bg-background text-foreground">
         {/* Your prototype UI */}
       </div>
     );
   }
   ```

3. **Verify locally**:
   Start the local dev server and watcher:
   ```bash
   npm run dev
   ```
   The watcher will automatically detect your new file, update `src/generated/prototypes.json`, and Vite HMR will reload the gallery page.

---

## Local Development Workflow

### 1. Installation
```bash
git clone https://github.com/aldiand/mocker.git
cd mocker
npm install
```

### 2. Available Scripts
- `npm run dev`: Starts Vite dev server alongside the file watcher.
- `npm run build`: Generates the prototype registry, checks TypeScript types, and builds static production bundle.
- `npm run lint`: Runs ESLint v9 Flat Config across the codebase.
- `npm run typecheck`: Runs `tsc --noEmit` to verify TypeScript types.
- `npm run test`: Runs Vitest unit tests.
- `npm run create:prototype`: Scaffolds a new React prototype component.

---

## Pull Request Guidelines

1. **Fork & Branch**: Create a feature branch off `main` (e.g. `git checkout -b feat/new-prototype`).
2. **Quality Checks**: Ensure linting, type-checking, and tests all pass before submitting:
   ```bash
   npm run lint
   npm run typecheck
   npm run test
   npm run build
   ```
3. **Commit Messages**: Keep commit messages clear, imperative, and descriptive (e.g. `feat(prototypes): add mobile profile screen`).
4. **Submit PR**: Open a Pull Request on GitHub using the PR template.
