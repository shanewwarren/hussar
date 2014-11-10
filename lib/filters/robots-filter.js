var request = require('request');

var RobotsFilter = function(){

  var _userAgentRegex = new RegExp("User-Agent:\\s*(.*)", "i");
  var _allowRegex = new RegExp("^Allow:\\s*(.*)", "i");
  var _disallowRegex = new RegExp("^Disallow:\\s*(.*)", "i");

  var _robotsUrl = null;
  var _userAgent = null;
  var _globalRobotRules = null;
  var _specificRobotRules = null;

  var Robot = function(name) {
    this.name = name;
    this.allowed = [];
    this.disallowed = [];
  };

  var getRobotByName = function(robots, name){
    for(var index = 0; index < robots.length; index++){
      if(robots[index].name === name){
        return robots[index];
      }
    }
    return null;
  };

  var parseRobotsTxt = function(body){
    var robots = [];
    var robot = null;

    var lines = body.split('\n');
    for(var index = 0; index < lines.length; index++){
       var result = null;

       // if the line matches "use"
       result = lines[index].match(_userAgentRegex);
       if(result){
          robot = new Robot(result[1]);
          robots.push(robot);
          continue;
       }

       result = lines[index].match(_allowRegex);
       if(result){
         robot.allowed.push(result[1]);
         continue;
       }

       result = lines[index].match(_disallowRegex);
       if(result){
         robot.disallowed.push(result[1]);
         continue;
       }
    }

    return robots;
  };

  var robotsFilter = function(hostname, useSSL, userAgent){
    var protocol = useSSL ? 'https://' : 'http://';
    _robotsUrl = protocol.concat(hostname, '/robots.txt');
    _userAgent = userAgent;

    _globalRobotRules = null;
    _specificRobotRules = null;
  };

  var excludeUrl = function(robot, url){
    // for now all we care about are the disallow rules..
    var index = 0;
    for(index; index < robot.disallowed.length; index++) {

       // take the rule and convert it to a corresponding regex
       // so that we can easily match it against the route.
       var rule = escapeRegExp(robot.disallowed[index])
       rule = rule.replace(/\\\*/g, "(.*)");
       var ruleRegex = new RegExp(rule);

       if(url.match(ruleRegex)) {
         return true;
       }

    }

    return false;
  };

  var escapeRegExp = function (str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  robotsFilter.prototype.initialize = function(callback){

      var result = request({
        method: 'GET',
        url: _robotsUrl
      }, function (error, response, body) {
        if(error) {
          return callback(error);
        }

        if(response.statusCode !== 200) {
          return callback(new Error("Request failed with status code " + response.statusCode));
        }

        var robots = parseRobotsTxt(body);
        _globalRobotRules = getRobotByName(robots, "*");
        _specificRobotRules = getRobotByName(robots, this.userAgent);

        return callback(null);
      });

  };

  robotsFilter.prototype.filter = function(url) {
    if(_globalRobotRules) {
        if(excludeUrl(_globalRobotRules, url)) {
          return true;
        }
    }

    if(_specificRobotRules) {
      if(excludeUrl(_specificRobotRules, url)) {
        return true;
      }
    }

    return false;
  };



  return robotsFilter;

})();

module.exports.RobotsFilter = RobotsFilter;
