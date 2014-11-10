/*global describe,it*/
'use strict';
var assert = require('assert'),
  hussar = require('../lib/hussar.js');

describe('hussar node module.', function() {
  it('must be awesome', function() {
    assert( hussar .awesome(), 'awesome');
  });
});
