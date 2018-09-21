const Http = require('./src/core/http');
require('./src/routes/routes');

const hostname = 'https://validity-control-casa-brasil.herokuapp.com/';
const port = 8080;

Http.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/api/`);
});