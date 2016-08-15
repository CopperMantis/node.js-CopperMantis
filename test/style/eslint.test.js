/**
 * Style checking as test
 */

var lint = require('mocha-eslint');

var paths = [
  'api/**/*.js',
  'config/**/*.js',
  'test/**/*.test.js'
];

// Run the tests
lint(paths);
