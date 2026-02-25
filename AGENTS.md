# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Folivm is an AI-native, local-first desktop document editor built with **Tauri 2** (Rust backend + React/TypeScript frontend via Vite). It is a single application, not a monorepo. There are no databases, Docker containers, or backend servers.

### Development commands

Standard commands are defined in `package.json` and `src-tauri/tauri.conf.json`:

| Command | Purpose |
|---|---|
| `npm install` | Install JS dependencies |
| `npm run dev` | Vite dev server only (port 1420) |
| `npm run tauri dev` | Full app: Vite + Rust backend |
| `npx tsc --noEmit` | TypeScript type-check (lint) |
| `cargo check` | Rust type-check (in `src-tauri/`) |
| `cargo build` | Rust full build (in `src-tauri/`) |

### Non-obvious caveats for Cloud VMs

1. **Rust toolchain**: The default Rust version on some VMs (1.83) is too old. The `zbus` crate requires `edition2024`, which needs **Rust >= 1.85**. Run `rustup update stable && rustup default stable` if `cargo check` fails with an `edition2024` error.

2. **XDG desktop portal for file dialogs**: The `rfd` crate (native file picker) uses the XDG desktop portal on Linux. Without a running dbus session and portal services, file dialogs silently fail. Before launching the Tauri app, start these services:

   ```bash
   eval $(dbus-launch --sh-syntax)
   /usr/libexec/xdg-desktop-portal &
   sleep 1
   /usr/libexec/xdg-desktop-portal-gtk &
   sleep 1
   ```

   Then export `DBUS_SESSION_BUS_ADDRESS` in the shell where `npm run tauri dev` is executed.

3. **Tauri system dependencies**: The following Ubuntu packages must be installed for the Tauri 2 build:
   `libwebkit2gtk-4.1-dev`, `libgtk-3-dev`, `libayatana-appindicator3-dev`, `librsvg2-dev`, `libssl-dev`, `libsoup-3.0-dev`, `libjavascriptcoregtk-4.1-dev`, `build-essential`, `pkg-config`.

4. **Pre-existing TypeScript error**: `WindowChrome.tsx` has a type error related to the `asChild` prop on `DropdownMenuTrigger` (Radix UI). This is a pre-existing issue in the codebase and does not prevent the app from running (Vite/esbuild does not enforce `tsc` checks at runtime).

5. **No ESLint config**: The project has no ESLint configuration. Linting is limited to `npx tsc --noEmit` for TypeScript and `cargo check`/`cargo clippy` for Rust.

6. **No automated tests**: The project does not have any test framework or test files configured.

7. **EGL warnings**: `libEGL warning: DRI3 error` messages are expected on Cloud VMs without GPU acceleration. The WebKit rendering still works correctly via software rendering.
