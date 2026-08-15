#!/usr/bin/env node

const { COMMIT_TYPES, formatCommitMessage } = require('../index.js');

const args = process.argv.slice(2);
if (args.includes('--help') || args.length === 0) {
  console.log("🛠️ CommitCraft CLI - Conventional Commit Generator");
  console.log("Usage: commit-craft <type> <description> [scope]");
  console.log("Available Types:", Object.keys(COMMIT_TYPES).join(', '));
  process.exit(0);
}

const [type, description, scope] = args;
try {
  const msg = formatCommitMessage({ type, description, scope });
  console.log("Generated Commit Message:");
  console.log(`\n  \x1b[32m${msg}\x1b[0m\n`);
} catch (err) {
  console.error(`❌ Error: ${err.message}`);
  process.exit(1);
}
