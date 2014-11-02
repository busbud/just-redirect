/**
 *
 * Busbud
 *
 * Copyright (c) 2014 Busbud. All rights reserved.
 */
'use strict';

var assert = require('chai').assert;
var supertest = require('supertest');

var app = require('../index');
var request = supertest(app);

describe('Redirects', function() {
  it('when a target exists, 301 redirects to the target', function(done) {
    request
      .get('/about/')
      .end(function (err, res) {
        assert.equal(res.headers.location, 'https://www.busbud.com/blog');
        assert.equal(res.statusCode, 301);
        done(err);
      });
  });

  it('when a target does not exist, 404s', function(done) {
    request
      .get('/noexisto/')
      .end(function (err, res) {
        assert.equal(res.statusCode, 404);
        done(err);
      });
  });
});

module.exports = {};