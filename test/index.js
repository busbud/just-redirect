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
  describe('when a target exists', function() {
    it('301 redirects to the target', function(done) {
      request
        .get('/about/')
        .end(function (err, res) {
          assert.equal(res.headers.location, 'https://www.busbud.com/blog');
          assert.match(res.headers['cache-control'], /max-age=\d+/);
          assert.equal(res.statusCode, 301);
          done(err);
        });
    });

    it('301 redirects to the target, preserving the querystring', function(done) {
      request
        .get('/about/?utm=important&a=b')
        .end(function (err, res) {
          assert.equal(res.headers.location, 'https://www.busbud.com/blog?utm=important&a=b');
          assert.match(res.headers['cache-control'], /max-age=\d+/);
          assert.equal(res.statusCode, 301);
          done(err);
        });
    });

    it('(with implicit trailing slash) 301 redirects to the target, preserving the querystring', function(done) {
      request
        .get('/about?utm=important&a=b')
        .end(function (err, res) {
          assert.equal(res.headers.location, 'https://www.busbud.com/blog?utm=important&a=b');
          assert.match(res.headers['cache-control'], /max-age=\d+/);
          assert.equal(res.statusCode, 301);
          done(err);
        });
    });
  });

  it('when a target does not exist, 302 to blog homepage', function(done) {
    request
      .get('/noexisto/')
      .end(function (err, res) {
        assert.equal(res.statusCode, 302);
        assert.equal(res.headers.location, 'https://www.busbud.com/blog');
        done(err);
      });
  });
});

module.exports = {};