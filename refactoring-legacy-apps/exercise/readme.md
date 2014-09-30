# Test-Driven Application Refactoring

## Installation

You will need to use the command line to install the dependencies for this
project. See the section below on accessing the command line if you need help.

### Application

You will need to [install Node.js v0.8.8 or newer](http://nodejs.org) to use
this repo (you can also use a [package
manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)).
You can verify that Node is installed correctly by running `node --version`
from the command line.

Run `npm install` from the root directory of this project to install the
Node.js dependencies.

This project uses [Grunt](http://gruntjs.com) to manage its build process.
Install it by running `npm install -g grunt-cli`.

### Integration Tests

The `test/integration/` directory demonstrates how you can use Selenium to
write integration tests. You don't need them to successfully re-factor the
application, but they're a great tool to help avoid regressions.

If you'd like to run the tests, make sure [the Google Chrome
browser](https://www.google.com/chrome/browser/) is installed on your system.

## Running The Application

First, run the server with

    $ node server

Then, visit the following URL with a web browser of your choice:

    http://localhost:4000

## Running the Integration Tests

The integration tests can be run with the following command:

    $ npm test

## Working with the Command Line

Note that you may need to perform some of the required steps as an
administrator (such as installing NPM modules globally).

**Windows** Open **cmd.exe** (From the Start Menu, search for "cmd"). If you
need administrative priviledges, right-click the `cmd` name in the programs
list and select "Run as administrator".

**OS X** Open **Terminal.app** in `/Applications/Utilities`. If you need
administrative priviledges, prefix commands with `sudo` and enter your password
when prompted.

**Linux** Press `Ctrl Alt T` to open a terminal. If you need administrative
priviledges, prefix commands with `sudo` and enter your password when prompted.
