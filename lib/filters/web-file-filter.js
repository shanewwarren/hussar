// In general we want to ignore any routes
// which contain common web files.  Examples
// of these files include js, css, txt, svg, etc.

var WebFileFilter = (function(){

  var _imageTypes = ['.png', '.jpg', '.jpeg', '.gif', '.bmp'];
  var _scriptTypes = ['.js'];
  var _documentTypes = ['.pdf', '.docx', '.doc', '.txt', '']

  var webFileFilter = function () {};



  return webFileFilter;

})();

module.exports.WebFileFilter = WebFileFilter;
