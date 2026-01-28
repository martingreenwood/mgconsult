# Laravel Forge deploy script for martingreenwood.com (Vue/Vite SPA)
# Uses $FORGE_SITE_BRANCH when run from Forge
cd /home/forge/martingreenwood.com

# Ensure we're on the right branch and pull latest
git fetch origin

# Clean up dist directory if it exists (no longer tracked in git)
rm -rf dist

git reset --hard "origin/${FORGE_SITE_BRANCH:-main}"

# Use project Node version if nvm is available
if [[ -s ~/.nvm/nvm.sh ]]; then
  source ~/.nvm/nvm.sh
  nvm use 2>/dev/null || nvm use default
fi

# Install deps from lockfile (reproducible, faster than npm install)
npm ci

# Build the Vite app (outputs to dist/)
npm run build

# Optional: touch a deploy timestamp for cache busting / sanity checks
# date -Iseconds > /home/forge/martingreenwood.com/dist/.deployed
