const assert = require('assert');
const { test, describe } = require('node:test');
const { formatCommitMessage, parseCommitMessage } = require('../index.js');

describe('Git Commit Craft CLI Unit Tests', () => {
  test('formatCommitMessage generates valid conventional commit', () => {
    const msg = formatCommitMessage({ type: 'feat', scope: 'auth', description: 'add JWT middleware' });
    assert.strictEqual(msg, 'feat(auth): add JWT middleware');
  });

  test('formatCommitMessage supports breaking change flag', () => {
    const msg = formatCommitMessage({ type: 'fix', description: 'drop support for v1 API', isBreaking: true });
    assert.strictEqual(msg, 'fix!: drop support for v1 API');
  });

  test('parseCommitMessage extracts commit components correctly', () => {
    const parsed = parseCommitMessage('docs(readme): update installation shields badges');
    assert.notStrictEqual(parsed, null);
    assert.strictEqual(parsed.type, 'docs');
    assert.strictEqual(parsed.scope, 'readme');
    assert.strictEqual(parsed.description, 'update installation shields badges');
  });

  test('formatCommitMessage rejects invalid commit type', () => {
    assert.throws(() => {
      formatCommitMessage({ type: 'invalid_type', description: 'test' });
    }, /Invalid commit type/);
  });
});
