/**
 *
 * Busbud
 *
 * Copyright (c) 2014 Busbud. All rights reserved.
 */
'use strict';

var http = require('http');
var URIjs = require('URIjs');
var redirects = require('./redirects')['blog.busbud.com'];

var TWO_YEARS_IN_SECONDS = 2 * 365 * 24 * 3600;
var PORT = process.env.PORT || 3000;

var server = http.createServer(function (req, res) {
  var uri = new URIjs(req.url);
  var path = uri.path();
  // Add implicit trailing slash
  var key = (path.lastIndexOf('/') === (path.length - 1) ? path : path + '/').toLowerCase();
  var target = redirects[key];

  if (target) {
    var target_uri = new URIjs(target).query(uri.query());

    res.writeHead(301, {
      'Location': target_uri.href(),
      'Cache-Control': 'max-age=' + TWO_YEARS_IN_SECONDS
    });
    res.end('');
  }
  else {
    res.writeHead(404, {});
    res.end('');
  }

}).listen(PORT);

console.log('Server running at http://localhost:' + PORT);


module.exports = server;