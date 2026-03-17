#!/bin/zsh
# AI JOOSE FACTORY - Master E2E Synchronization Script
# Synchronizes local OpenClaw source and AijooseFactory workspace data to GitHub

set -e

OC_SOURCE="/Users/george/Mac/data/usr/projects/ai_joose_factory/.a0proj/_projects/internal/openclaw"
AJF_WORKSPACE="/Users/george/Mac/data/usr/projects/ai_joose_factory"

echo "🔄 [1/4] Syncing OpenClaw Source Code..."
cd "$OC_SOURCE"
git add .
if ! git diff-index --quiet HEAD --; then
    git commit -m "chore: sync local enhancements $(date '+%Y-%m-%d %H:%M:%S')"
fi
# Fetch and merge from upstream to stay current
git fetch upstream
git merge upstream/main --no-edit || echo "⚠️  OpenClaw upstream merge had conflicts."
git push origin main
echo "✅ OpenClaw source synced."

echo "🗄️ [2/4] Workspace Data Sync (Local Only)..."
# The repository AijooseFactory/ai_joose_factory does not exist on GitHub.
# We will still commit locally to track changes in the workspace.
cd "$AJF_WORKSPACE"
git add .
if ! git diff --cached --quiet; then
    echo "📝 Committing workspace changes..."
    git commit -m "chore: sync openclaw usage data $(date '+%Y-%m-%d %H:%M:%S')"
else
    echo "✨ No workspace changes to commit."
fi
echo "⏭️  Skipping workspace push (GitHub repo not found)."
echo "✅ Workspace data tracked locally."

echo "🏗️ [3/4] Rebuilding and Restarting Container..."
cd "$AJF_WORKSPACE/.a0proj/ajf-openclaw"
# Ensure UI is built for the container
cd "$OC_SOURCE"
CI=true pnpm run build
CI=true pnpm run ui:build
cd "$AJF_WORKSPACE/.a0proj/ajf-openclaw"
docker rm -f ajf-openclaw || true
docker compose up -d
# Re-install dependencies inside the container to match architecture
docker exec -e CI=true ajf-openclaw pnpm install --prod
docker restart ajf-openclaw
echo "✅ Container rebuilt and restarted."

echo "🚀 [4/4] Verifying Health..."
sleep 5
curl -I http://localhost:3000/ || echo "⚠️  Gateway not yet accessible at :3000"

echo "🎯 E2E Synchronization Complete."
