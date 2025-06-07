// blacklist.js
const blacklistedTokens = new Set();

// Add token to blacklist
function blacklistToken(token) {
  blacklistedTokens.add(token);
}

// Check if token is blacklisted
function isBlacklisted(token) {
  return blacklistedTokens.has(token);
}

// Optional: Clean expired tokens manually if you store expiry info separately

module.exports = { blacklistToken, isBlacklisted };
