"use strict";
var webdriver = require("selenium-webdriver");

/**
 * Search for a given term.
 *
 * @argument {WebDriver} driver
 * @argument {String} query
 *
 * @returns {Promise} Eventual value to be resolved when the search operation
 *                    is under way.
 */
exports.search = function(driver, query) {
  return driver.findElement(webdriver.By.name("q"))
    .then(function(input) {
      return input.sendKeys(query);
    }).then(function() {
      return driver.findElement(webdriver.By.css(".btn"));
    }).then(function(button) {
      return button.click();
    }).then(function() {
      return driver.wait(function() {
        return driver.isElementPresent(webdriver.By.css("#results .searching"))
          .then(function(isPresent) {
            return !isPresent;
          });
      });
    });
};
