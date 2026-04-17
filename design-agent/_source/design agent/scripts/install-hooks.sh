#!/bin/bash
# install-hooks.sh
# Installs the post-commit git hook for auto-changelog tracking.
# Called automatically by `pnpm install` via the prepare script.
# Can also be run manually: bash scripts/install-hooks.sh

GIT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)

if [ -z "$GIT_ROOT" ]; then
  echo "[changelog] Not a git repository — skipping hook install."
  exit 0
fi

HOOK_PATH="$GIT_ROOT/.git/hooks/post-commit"

cat > "$HOOK_PATH" << 'EOF'
#!/bin/bash
GIT_ROOT=$(git rev-parse --show-toplevel)
node "$GIT_ROOT/scripts/track-story-changes.js"
EOF

chmod +x "$HOOK_PATH"
echo "[changelog] post-commit hook installed → $HOOK_PATH"
