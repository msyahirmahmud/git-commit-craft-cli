/**
 * Conventional Commit Formatter Engine
 */

const COMMIT_TYPES = {
  feat: "A new feature",
  fix: "A bug fix",
  docs: "Documentation changes",
  style: "Code formatting / style adjustments",
  refactor: "Code refactoring without feature/bug change",
  test: "Adding or updating unit tests",
  chore: "Build tools or repository maintenance"
};

function formatCommitMessage({ type, scope, description, isBreaking = false }) {
  if (!COMMIT_TYPES[type]) {
    throw new Error(`Invalid commit type: ${type}. Must be one of: ${Object.keys(COMMIT_TYPES).join(', ')}`);
  }
  if (!description || !description.trim()) {
    throw new Error("Commit description cannot be empty");
  }

  const scopeStr = scope && scope.trim() ? `(${scope.trim()})` : '';
  const breakingStr = isBreaking ? '!' : '';
  
  return `${type}${scopeStr}${breakingStr}: ${description.trim()}`;
}

function parseCommitMessage(commitStr) {
  const regex = /^([a-z]+)(?:\(([^)]+)\))?(!+)?: (.+)$/;
  const match = commitStr.match(regex);
  if (!match) return null;

  return {
    type: match[1],
    scope: match[2] || null,
    isBreaking: !!match[3],
    description: match[4]
  };
}

module.exports = { COMMIT_TYPES, formatCommitMessage, parseCommitMessage };
