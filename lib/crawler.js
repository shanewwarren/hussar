var request = require('request'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter;

var Crawler = function(){

  // domain to crawl
  this.host = "";

  // where to start crawling on the domain
  this.initialPath = "/";
  this.initialPort = 80;
  this.initialProtocol = "http";

  // how often to wait before getting requesting
  // a new url.
  this.interval = 10000;

  // queue which
  this.queue = [];

  EventEmitter.call(this);

};

module.exports.Crawler = Crawler;

// Private Members & Methods
var _runIntervalID = null;
var _crawler = this;

var fetch = function(crawler){
  if(this.queue.)
};

// Public Methods
Crawler.prototype.crawl = function() {
  this.hostname = hostname;

  // clear the queue
  if(this.queue.length > 0) {
    this.queue.length = 0;
  }


  _runIntervalID = setInterval(function() {
    fetch(this); }, this.interval);

  var startingUrl = util.format("%s://%s:%s%s",
                    this.initialProtocol, this.host,
                    this.initialPort, this.initialPath);

  this.queue.push(startingUrl);
  fetch(this);
};
