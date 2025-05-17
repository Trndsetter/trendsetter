#!/bin/sh

npm_run_hook () {
  script="$1"; shift
  if [ -f package.json ] && grep -q "\"$script\"" package.json; then
    pnpm run "$script" "$@"
  fi
}

