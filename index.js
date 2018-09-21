const Http = require('./src/core/http');
require('./src/routes/routes');

const hostname = window.location.hostname;
const port = window.location.port;

Http.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/api/`);
});