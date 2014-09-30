"use strict";
var assert = require("chai").assert;

var webdriver = require("selenium-webdriver");
var chrome = require("selenium-webdriver/chrome");
var chromeDriver = require("chromedriver");

var utils = require("./utils");
var port = process.env.NODE_PORT || 4000;

before(function() {
  chrome.setDefaultService(
    new chrome.ServiceBuilder(chromeDriver.path).build()
  );
});

beforeEach(function() {
  var driver = this.driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.firefox())
    .build();

  this.timeout(10000);

  driver.manage().timeouts().implicitlyWait(1000);

  return driver.get("http://localhost:" + port);
});

afterEach(function() {
  return this.driver.quit();
});

describe("Srchr", function() {

  this.timeout(5000);

  it("displays the application title", function() {
    return this.driver.findElement(webdriver.By.css("body"))
      .then(function(body) {
        return body.getText();
      }).then(function(bodyText) {
        assert.include(bodyText, "Srchr");
      });
  });

  it("reports when no results can be found", function() {
    var driver = this.driver;

    return utils.search(driver, "foobarbazbimbop")
      .then(function() {
        return driver.isElementPresent(
          webdriver.By.css("#results li.no-results")
        );
      }).then(function(isPresent) {
        assert(isPresent, "'No Results' container is present");
        return driver.findElement(webdriver.By.css("#results li.no-results"));
      }).then(function(element) {
        return element.getText();
      }).then(function(text) {
        assert.include(text, "No results found");
      });
  });

  it("gracefully handles invalid search terms", function() {
    var driver = this.driver;

    return utils.search(driver, " ")
      .then(function() {
        return driver.isElementPresent(
          webdriver.By.css("#results li.no-results")
        );
      }).then(function(isPresent) {
        assert.isTrue(isPresent);
      });
  });

  it("allows user to 'like' a search result", function() {
    var driver = this.driver;

    return utils.search(driver, "cat")
      .then(function() {
        return driver.findElement(webdriver.By.css(".like"));
      }).then(function(element) {
        return element.click();
      }).then(function() {
        return driver.wait(function() {
          return driver.isElementPresent(webdriver.By.css("#liked li"));
        });
      }).then(function() {
        return webdriver.promise.map([
          driver.findElement(webdriver.By.css("#results li h2")),
          driver.findElement(webdriver.By.css("#liked li"))
        ], function(element) {
          return element.getText();
        });
      }).then(function(elementTexts) {
        assert.equal(elementTexts[0], elementTexts[1]);
      });
  });
});
