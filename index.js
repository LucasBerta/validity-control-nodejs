const Http = require('./src/core/http');
require('./src/routes/routes');

// const hostname = 'https://validity-control-casa-brasil.herokuapp.com/';
const port = process.env.PORT || 3000;;

Http.listen(port, () => {
  console.log(`Server running at port ${port}`);
});