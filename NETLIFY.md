# Netlify Deploy Notes

This document records the configuration required to deploy **Expo Route Kit** as a static web preview on Netlify.

## Why it failed with "Page not found"

By default, the Expo SDK 58 template configures `"web": { "output": "server" }` in `app.json`. In `"server"` mode, `npx expo export -p web` splits the output into `dist/client` and `dist/server` without a root `dist/index.html`, which causes Netlify static hosting to return `404 Page not found`.

Additionally, client-side routes handled by Expo Router (`/login`, `/explore`, `/profile`) need a SPA fallback rule so direct URLs and page refreshes resolve to `index.html`.

## Required configuration

1. **`app.json`** — set `expo.web.output` to `"single"` (SPA static export):

   ```json
   "web": {
     "output": "single",
     "favicon": "./assets/images/favicon.png"
   }
   ```

2. **`netlify.toml`** — configure the build command, publish directory, and SPA redirect at the project root:

   ```toml
   [build]
     command = "npx expo export -p web"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

## Local verification

To verify the generated static output locally before pushing:

```bash
npx expo export -p web
```

The `dist/` directory should contain `index.html`, `_expo/`, `assets/`, `favicon.ico`, and `metadata.json`.
