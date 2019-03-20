const express = require('express');
const bodyParser = require('body-parser');

const emailValidator = require("email-validator");
const isNumber = require('is-number');
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
  constructor(usrData) {
    this.username = usrData.username;
    this.password = usrData.password;
    this.email = usrData.email;
    this.fullName = usrData.fullName;
  }
  set username(to) {
    if (to) this._username = to;
    else throw new InvalidInputError();
  }
  get username() {
    return this._username;
  }
  set password(to) {
    if (to) this._password = to;
    else throw new InvalidInputError();
  }
  get password() {
    return this._password;
  }
  set email(to) {
    if (emailValidator.validate(to)) this._email = to;
    else throw new InvalidInputError();
  }
  get email() {
    return this._email;
  }
  set fullName(to) {
    if (to) this._fullName = to;
    else throw new InvalidInputError();
  }
  get fullName() {
    return this._fullName;
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

const badRegister = (res) => {
  res.send(JSON.stringify({
    suc: false
  }));
  res.end();
}

app.post("/register", (req, res) => {
  if (users.checkName(req.body)) return badRegister(res);
  try {
    users.add(new User(req.body));
  }
  catch (e) {
    return badRegister(res);
  }
  auth(req, res);
  console.log(users);
});




class Article {
  constructor(data) {
    this.name = data.name;
    this.price = data.price;
    this.weight = data.weight;
    this.stock = data.stock;
  }
  set name(to) {
    if (to) this._name = to;
    else throw new InvalidInputError();
  }
  get name() {
    return this._name;
  }
  set price(to) {
    if (isNumber(to)) this._price = to;
    else throw new InvalidInputError();
  }
  get price() {
    return this._price;
  }
  set weight(to) {
    if (isNumber(to)) this._wehight = to;
    else throw new InvalidInputError();
  }
  get weight() {
    return this._weight;
  }
  set stock(to) {
    if (isNumber(to)) this._stock = to;
    else throw new InvalidInputError();
  }
  get stock() {
    return this._stock;
  }
}

class ArticleCollecion extends Array {
  constructor(...a) {
    super(...a);
  }
  exists(artcl) {
    return !!this.ea((e) => {
      if (e.name === artcl.name) return true;
    });
  }
}

const articles = new ArticleCollecion();

const badArticle = (res) => {
  res.send(JSON.stringify({
    suc: false
  }));
  res.end();
}


app.post("/addArticle", (req, res) => {
  if (articles.exists(req.body)) return badArticle(res);
  try {
    articles.add(new Article(req.body));
  }
  catch (e) {
    return badArticle(res);
  }

  res.send(JSON.stringify({
    suc: true
  }));
  res.end();
  console.log(articles);
});
