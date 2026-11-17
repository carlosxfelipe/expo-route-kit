#!/usr/bin/env bash
set -e

TARGET_DIR="src"

for arg in "$@"; do
  case "$arg" in
  -a | --all)
    TARGET_DIR="."
    ;;
  -h | --help)
    echo "Usage: $0 [-a|--all]"
    echo "  (default)   Format TypeScript/JavaScript files only inside src/"
    echo "  -a, --all   Format TypeScript/JavaScript files in the entire repository"
    exit 0
    ;;
  *)
    echo "Unknown option: $arg" >&2
    echo "Usage: $0 [-a|--all]" >&2
    exit 1
    ;;
  esac
done

run_prettier() {
  find "$TARGET_DIR" \( -path "*/.*" -o -path "*/node_modules" \) -prune -o \
    \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.mjs" -o -name "*.cjs" \) \
    -type f -exec "$@" --write {} +
}

# 1. Format TypeScript and JavaScript files with Prettier
if [ ! -d "$TARGET_DIR" ]; then
  echo "⚠️  Directory '$TARGET_DIR' not found. Skipping TypeScript/JavaScript formatting."
elif command -v prettier >/dev/null 2>&1; then
  echo "✨ Formatting TypeScript and JavaScript files in '$TARGET_DIR' with prettier..."
  run_prettier prettier
elif [ -x "./node_modules/.bin/prettier" ]; then
  echo "✨ Formatting TypeScript and JavaScript files in '$TARGET_DIR' with local prettier..."
  run_prettier ./node_modules/.bin/prettier
elif command -v npx >/dev/null 2>&1; then
  echo "✨ Formatting TypeScript and JavaScript files in '$TARGET_DIR' with npx prettier..."
  run_prettier npx --yes prettier
else
  echo "⚠️  Neither 'prettier' nor 'npx' found. Skipping TypeScript/JavaScript formatting."
fi

# 2. Format Shell scripts (prefers native shfmt from brew, falls back to uvx)
if command -v shfmt >/dev/null 2>&1; then
  echo "📜 Formatting shell scripts (shfmt)..."
  shopt -s globstar 2>/dev/null || true
  if shopt -q globstar 2>/dev/null; then
    shfmt -i 2 -w **/*.sh
  else
    find . -name "*.sh" -not -path "*/.*" -not -path "*/node_modules/*" -exec shfmt -i 2 -w {} +
  fi
elif command -v uvx >/dev/null 2>&1; then
  echo "📜 Formatting shell scripts (uvx shfmt-py)..."
  shopt -s globstar 2>/dev/null || true
  if shopt -q globstar 2>/dev/null; then
    uvx --from shfmt-py shfmt -i 2 -w **/*.sh
  else
    find . -name "*.sh" -not -path "*/.*" -not -path "*/node_modules/*" -exec uvx --from shfmt-py shfmt -i 2 -w {} +
  fi
else
  echo "⚠️  Neither 'shfmt' nor 'uvx' found. Install with: brew install shfmt"
fi

echo "✅ Done!"
