#!/usr/bin/env bash
# vercel-deploy.sh — Link a storybook variant to the oriuminc Vercel team and deploy
# Usage: bash scripts/vercel-deploy.sh [storybook|storybook-blank|storybook-tailwind]
# Prerequisites: npm install -g vercel && vercel login

set -e

TEAM="oriuminc"
VARIANT="${1:-storybook}"

case "$VARIANT" in
  storybook)
    TARGET_DIR="storybook/apps/storybook"
    ;;
  storybook-blank)
    TARGET_DIR="storybook-blank"
    ;;
  storybook-tailwind)
    TARGET_DIR="storybook-tailwind"
    ;;
  *)
    echo "Unknown variant: $VARIANT"
    echo "Usage: bash scripts/vercel-deploy.sh [storybook|storybook-blank|storybook-tailwind]"
    exit 1
    ;;
esac

echo ""
echo "Orium Design Docs — Vercel Deploy"
echo "=================================="
echo "Variant: $VARIANT → $TARGET_DIR"
echo ""

# Check vercel CLI is installed
if ! command -v vercel &>/dev/null; then
  echo "Error: Vercel CLI not found. Install it first:"
  echo "  npm install -g vercel"
  exit 1
fi

# Check the user is logged in
if ! vercel whoami &>/dev/null; then
  echo "Not logged in. Running: vercel login"
  vercel login
fi

echo "Linking project to oriuminc team..."
cd "$TARGET_DIR"

vercel link --scope "$TEAM" --yes

echo ""
echo "Deploying to production..."
vercel --prod --scope "$TEAM"

echo ""
echo "Done. Your Storybook ($VARIANT) is live on Vercel."
echo "Future pushes to main will auto-deploy if GitHub integration is enabled."
