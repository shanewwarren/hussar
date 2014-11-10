/*global describe,it*/
'use strict';
var assert = require('assert'),
  nock = require('nock'),
  robots = require('../../lib/filters/robots-filter.js');


describe('RobotsFilter', function() {
  it('must disallow reddit robots.txt rule: Disallow: /comments/*/*/c*', function(done) {

    // mock the response from http://www.reddit.com/robots.txt
    var scope = nock('http://www.reddit.com')
                .get('/robots.txt')
                .replyWithFile(200, __dirname + '/../../fixtures/robots/reddit-robots.txt');

    var robotsFilter = new robots.RobotsFilter('www.reddit.com', false, 'test-user-agent');
    robotsFilter.initialize(function(err){
      assert.ifError(err);

      var filter = robotsFilter.filter('http://www.reddit.com/r/HamsterGifs/comments/2do4g1/hamster_licks_album/cjrddqq');
      assert.equal(filter, true, "Should now allow this url to be crawled.");
      done();
    });
  });
});
