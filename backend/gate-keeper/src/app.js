const app = require ('./server.js')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
const cors = require('cors')
const port = 6001;
app.listen(port, () => {
  console.log("chat BFF server started");
});