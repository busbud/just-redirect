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
  var key = uri.path().toLowerCase();
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

}).listen(PORT, '127.0.0.1');

console.log('Server running at http://127.0.0.1:' + PORT);


module.exports = server;