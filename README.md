# Mocker · UI Prototype Gallery

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646cff.svg)](https://vitejs.dev)

**Mocker** is a modern, static visual gallery for full-screen React UI prototypes. Browse application screens (Auth, Dashboards, CRM, Analytics, Mobile screens) inside interactive device frames with pan & zoom capabilities—just like browsing a Figma Community board or Storybook workspace.

---

## Key Features

- 🖼️ **Full-Screen Prototype Viewer**: Every prototype is rendered inside interactive device frames (iPhone/Android, Tablet, Desktop) with pan & zoom capabilities.
- ⚡ **Dynamic Prototype Registry**: A built-in Node file watcher (`scripts/watcher.ts`) automatically scans `src/prototypes/**/*.tsx`, parses JSDoc front-matter metadata, and registers components live via Vite HMR.
- 🌳 **Storybook-Inspired Navigation**: Collapsible tree navigation grouped by device type, category, and prototype.
- 🔍 **Client-Side Fuzzy Search**: Instantly filter prototypes by title, category, or tags.
- 🌓 **Theme Mode Support**: Seamless toggle between refined light and dark theme modes with persistent preference.
- 🛡️ **Runtime Isolation**: Integrated React `ErrorBoundary` prevents individual prototype component bugs from crashing the gallery SPA.
- 🛠️ **Scaffold Utility**: Interactive CLI tool (`npm run create:prototype`) to generate scaffolded prototype components instantly.

---

## Quickstart

### Prerequisites
- **Node.js**: `v18+` (v20 recommended)
- **npm**: `v9+`

### Installation

```bash
# Clone repository
git clone https://github.com/aldiand/mocker.git
cd mocker

# Install dependencies
npm install

# Start development server & watcher
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Adding a Prototype

Mocker automatically registers any React component placed under `src/prototypes/**/*.tsx`.

### 1. Using the Interactive Scaffold CLI

Run the interactive prompt:
```bash
npm run create:prototype
```

Or pass CLI arguments directly:
```bash
npx tsx scripts/create-prototype.ts --title="Sales Overview" --device=desktop --category="CRM" --tags="sales, analytics"
```

### 2. Manual Front-Matter Specification

Place a `.tsx` file anywhere inside `src/prototypes/` (e.g. `src/prototypes/desktop/crm/Overview.tsx`) and add a JSDoc front-matter header at the top:

```tsx
/**
 * title: Sales Overview
 * category: CRM / Sales
 * device: desktop
 * tags: crm, sales, overview
 * order: 1
 */

export default function Overview() {
  return (
    <div className="h-full w-full bg-background p-6 text-foreground">
      <h1 className="text-xl font-bold">Sales Overview</h1>
    </div>
  );
}
```

#### Supported Front-Matter Properties:

| Field | Type | Description | Default |
|---|---|---|---|
| `title` | `string` | Human-readable title displayed in gallery & viewer | Formatted filename |
| `category` | `string` | Nested category path (e.g. `Auth`, `CRM / Sales`) | Derived from folder structure |
| `device` | `mobile` \| `tablet` \| `desktop` | Viewport device frame to render inside | Inferred from parent folder |
| `tags` | `string` (comma-separated) | Tags for search indexing | `[]` |
| `order` | `number` | Display sort index in sidebar & grid | `0` |

---

## Project Structure

```
mocker/
├── .github/
│   ├── workflows/ci.yml       # GitHub Actions CI pipeline
│   ├── ISSUE_TEMPLATE/        # Bug report & feature request templates
│   └── PULL_REQUEST_TEMPLATE  # Pull request template
├── scripts/
│   ├── watcher.ts             # Front-matter scanner & registry generator
│   └── create-prototype.ts    # Interactive scaffold CLI tool
├── src/
│   ├── components/
│   │   ├── common/            # ErrorBoundary, BrandWordmark, SearchBar, ThemeToggle
│   │   ├── gallery/           # PrototypeCard, CoverThumbnail
│   │   ├── sidebar/           # Sidebar, SidebarTree
│   │   ├── ui/                # Button, Input, Tooltip, Badge
│   │   └── viewer/            # DeviceFrame, ViewerCanvas, ViewerToolbar, MetaPanel
│   ├── generated/
│   │   └── prototypes.json    # Auto-generated prototype registry (gitignored)
│   ├── layouts/               # Shell layout
│   ├── pages/                 # GalleryPage, ViewerPage
│   ├── prototypes/            # React prototype screens (Mobile, Tablet, Desktop)
│   ├── registry/              # Dynamic loader & prototype lookup helpers
│   ├── theme/                 # ThemeProvider & Zustand UI store
│   ├── types.ts               # Core TypeScript definitions
│   └── main.tsx               # SPA Entrypoint
├── eslint.config.js           # ESLint v9 Flat Config
├── vitest.config.ts           # Vitest test configuration
├── vite.config.ts             # Vite build configuration
└── package.json
```

---

## NPM Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs Vite dev server and `scripts/watcher.ts` concurrently with HMR |
| `npm run build:registry` | Regenerates `src/generated/prototypes.json` once |
| `npm run build` | Generates registry, checks TypeScript types, and builds production bundle |
| `npm run preview` | Previews production build locally on port 4173 |
| `npm run typecheck` | Runs `tsc --noEmit` type verification |
| `npm run lint` | Lints codebase using ESLint v9 Flat Config |
| `npm run test` | Runs Vitest unit test suite |
| `npm run create:prototype` | Interactive CLI to scaffold a new prototype component |

---

## Deployment & Static Hosting

Mocker builds to pure static HTML, JS, and CSS files requiring no backend or API server.

### Building for Production

```bash
npm run build
```

This generates the static production bundle in the `dist/` directory.

### Serving the Static Bundle

You can deploy the contents of the `dist/` directory to any static web host or server:

- **Static Web Servers** (Nginx, Apache, Caddy): Point document root to `dist/` and configure SPA fallback to `index.html`.
- **Cloud Object Storage** (AWS S3, Google Cloud Storage, Cloudflare R2): Upload `dist/` files and enable website hosting.
- **Node Static Server**:
  ```bash
  npx serve dist -s
  ```

---

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting pull requests.

---

## License

This project is licensed under the [MIT License](LICENSE).
