const Http = require('./src/core/http');
require('./src/routes/routes');

const hostname = '192.168.1.107';
const port = 3000;

Http.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/api/`);
});