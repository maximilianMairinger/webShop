const express = require('express');
const bodyParser = require('body-parser');
require('xrray')(Array);

const app = express();

app.listen(3001, () => {
  console.log("listening");
});


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static("public"));

class InvalidInputError extends Error {
  constructor() {
    super("Invalid input.");
  }
}

class User {
  constructor(name_usr, pw) {
    if (typeof name_usr === "object") {
      this.username = name_usr.username;
      this.password = name_usr.password;
    }
    else {
      this.username = name_usr;
      this.password = pw;
    }
  }
  set username(to) {
    if (to !== undefined) this._username = to;
    else throw new InvalidInputError();
  }
  get username() {
    return this._username;
  }
  set password(to) {
    if (to !== undefined) this._password = to;
    else throw new InvalidInputError();
  }
  get password() {
    return this._password;
  }
  check(usr) {
    return (this.username === usr.username && this.password === usr.password);
  }
  checkName(usr) {
    return (this.username === usr.username);
  }
}

class UserCollecion extends Array {
  constructor(...a) {
    super(...a);
  }
  check(usr) {
    return !!this.ea((e) => {
      if (e.check(usr)) return true;
    });
  }
  checkName(usr) {
    return !!this.ea((e) => {
      if (e.checkName(usr)) return true;
    });
  }
}

const users = new UserCollecion();



function auth(req, res) {
  res.send(JSON.stringify({
    suc: users.check(req.body)
  }));
  res.end();
}

app.post("/auth", (req, res) => {
  auth(req, res);
});


app.post("/register", (req, res) => {
  if (users.checkName(req.body)) {
    res.send(JSON.stringify({
      suc: false
    }));
    res.end();
    return;
  }
  try {
    users.add(new User(req.body));
  }
  catch (e) {
    console.log("Bad");
  }
  auth(req, res);
  console.log(users);
});
