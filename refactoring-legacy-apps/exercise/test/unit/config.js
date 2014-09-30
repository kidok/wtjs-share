(function(window) {

  // Unit test domain-specific language.
  // You may choose to write your tests in the style of behavior-driven
  // development or test-driven development. Mocha refers to these different
  // test interfaces as "UIs"; you can read more about them here:
  // http://visionmedia.github.com/mocha/
  // Available options: 'tdd', 'bdd-should', and 'bdd-expect'
  var testDSL = 'tdd';

  // Each DSL calls for slightly different setup steps. This collection defines
  // the steps for each.
  var setupFns = {
    'tdd': function() {
      window.assert = chai.assert;
      mocha.setup({
        ui: 'tdd'
      });
    },
    'bdd-should': function() {
      window.should = chai.should();
      mocha.setup({
        ui: 'bdd'
      });
    },
    'bdd-expect': function() {
      window.expect = chai.expect;
      mocha.setup({
        ui: 'bdd'
      });
    }
  };

  setupFns[testDSL]();

  mocha.setup({
    globals: ['XMLHttpRequest']
  });

  require.config({
    // Interpret module names in terms of the application's base directory.
    baseUrl: '../../../www/js',
    paths: {
      templates: '../templates',
      fixtures: '../../test/fixtures',
      tests: '../../test/unit/tests',
      jquery: '../bower_components/jquery/dist/jquery',
      underscore: '../bower_components/underscore/underscore'
    },
    shim: {
      underscore: {
        exports: '_'
      }
    }
  });

  require([
    // Load the list of test files
    '../../test/unit/list_of_tests'
    ], function(listOfTests) {

      // Load the test files themselves
      require( listOfTests, function() {

        // Run the tests!
        mocha.run();
      });
  });

}(this));
