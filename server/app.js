const express = require('express');
const app = express();
app.use(express.static('client/public'))
app.listen(8080, () => {
  console.log('http://localhost:8080/');

});
