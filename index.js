const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(express.static('client/dist'));
// 2. serve index.html if it doesn't recognize the route
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  // console.log(res);
});
// else {
//   app.use(express.static('client/dist'));
//   // 2. serve index.html if it doesn't recognize the route
//   const path = require('path');
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
//     console.log(path.resolve(__dirname, 'client', 'dist', 'index.html'));
//   });
// }
const PORT = process.env.PORT || 5000;
// heroku has the ability to inject environment variables
// this statement says 'look at our current environment, and set
// PORT equal to the environment's port variable'
app.listen(PORT);
