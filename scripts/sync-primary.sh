#!/bin/zsh
# AI JOOSE FACTORY - OpenClaw Synchronization Script
# Local (/Users/george/Mac/data/openclaw) -> Fork -> GitHub

set -e

echo "📦 Preparing to sync local modifications..."
git add .

# Only commit if there are changes
if ! git diff-index --quiet HEAD --; then
    echo "📝 Committing local changes..."
    git commit -m "chore: sync local mods $(date '+%Y-%m-%d %H:%M:%S')"
else
    echo "✨ No local changes to commit."
fi

echo "🔄 Updating from Upstream..."
git fetch upstream
# Attempt to merge upstream/main; if it fails, the user might need to resolve conflicts manually.
git merge upstream/main --no-edit || echo "⚠️  Merge from upstream had conflicts or nothing to update."

echo "🚀 Pushing to Fork (https://github.com/AijooseFactory/openclaw)..."
git push origin main

echo "✅ Synchronization complete."
