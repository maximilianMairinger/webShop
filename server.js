const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.listen(3001, () => {
  console.log("listening");
});


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static("public"));


app.post("/test123", (req, res) => {
  console.log(req.body);
  res.send('{"hello": "works"}');
  res.end();
});
