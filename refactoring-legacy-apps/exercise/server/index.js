var path = require('path');
var express = require('express');
var _ = require('underscore')

var fakeData = require('../fake-data.json');
var baseDir = path.join(__dirname, '..', path.sep);

var app = express(express.bodyParser());
var port = +process.env.NODE_PORT > -1 ? +process.env.NODE_PORT : 4000;

app.use('/', express.static(baseDir + 'www'));

app.get('/data/search.json', function(req, res) {
  var query = req.query.q;
  var results = [];
  // Simulated latency
  var latency = 300 + Math.floor(Math.random() * 300);

  if (!query || !query.trim()) {
    console.log('Query was empty.');
  } else {
    results = _.filter(fakeData, function(item) {
      var possibles = [item.name, item.email, item.company.name];
      return _.any(possibles, function(p) {
        return p.toLowerCase().match(query.toLowerCase());
      });
    });
  }

  setTimeout(function() {
    res.end(JSON.stringify({ results : results }));
  }, latency);
});

// app.use( '/test', express.static( baseDir + 'test') );

app.listen(port);

console.log('Serving on http://localhost:' + port);
console.log('(the port number may be configured via the NODE_PORT ' +
  'environmental variable)');
