#!/bin/bash
# Double-click to commit and push the site title/positioning changes.
# Safe to delete this file after the push succeeds.

# Run from this script's own folder (the repo root)
cd "$(dirname "$0")" || exit 1

echo "Repo: $(pwd)"
echo

# Clear any stranded lock from an earlier blocked commit
if [ -f .git/index.lock ]; then
  echo "Removing stale .git/index.lock"
  rm -f .git/index.lock
fi

# Stage new and modified files under src and public (not this script or .claude)
git add -A -- src public

echo
echo "About to commit and push these changes:"
git status --short
echo

git commit -m "Publish Friction essay; make Genie article tool-agnostic"

echo
echo "Pushing to origin/main..."
git push

echo
echo "Done. You can close this window."
read -n 1 -s -r -p "Press any key to exit."
