const sendResponse = function (res, statusCode, response) {
  res.status(statusCode);
  res.send(getResponse(response));
}

function getResponse(response) {
  if (typeof response === 'object') {
    return response;
  }
  return { msg: response };
}

module.exports = {
  sendResponse
};