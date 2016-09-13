module.exports.create = function(status, html) {
  var htmlResponse = {
    status,
    html
  }

  return htmlResponse;
}
