const express = require('express');
const bodyParser = require('body-parser');
const MC = require('mongodb').MongoClient;

const emailValidator = require("email-validator");
const isNumber = require('is-number');
require('xrray')(Array);

const app = express();


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
  addUser(...usrdata) {
    usrdata.ea((usr) => {
      this.add(new User(usr));
    });
  }
}

const users = new UserCollecion();

function auth(body, res) {
  res.send(JSON.stringify({
    suc: users.check(body)
  }));
  res.end();
}

app.post("/auth", ({body}, res) => {
  auth(body, res);
});

const badRegister = (res) => {
  res.send(JSON.stringify({
    suc: false
  }));
  res.end();
}

app.post("/register", ({body}, res) => {
  if (users.checkName(body)) return badRegister(res);
  try {
    users.addUser(body);
    let {username, password, email, fullName} = body;
    db.collection("users").insertOne({username, password, email, fullName});
  }
  catch (e) {
    return badRegister(res);
  }
  auth(body, res);
  console.log(users);
});




class Article {
  constructor(data) {
    this.name = data.name;
    this.price = data.price;
    this.weight = data.weight;
    this.stock = data.stock;
    this.description = data.description;
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
  set description(to) {
    if (to) this._description = to;
    else throw new InvalidInputError();
  }
  get description() {
    return this._description;
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
  addArticle(...artcldata) {
    artcldata.ea((artcl) => {
      this.add(new Article(artcl));
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


app.post("/addArticle", ({body}, res) => {
  if (articles.exists(body)) return badArticle(res);
  try {
    articles.add(new Article(body));
    let {name, description, price, weight, stock} = body;
    db.collection("articles").insertOne({name, description, price, weight, stock});
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



let db;

(async () => {
  db = (await MC.connect("mongodb://127.0.0.1:27017", {useNewUrlParser: true})).db("webshop");


  //Setup
  let dbusrs = await db.collection("users").find().toArray();
  users.addUser(...dbusrs);

  let dbarticles = await db.collection("articles").find().toArray();
  articles.addArticle(...dbarticles);



  console.log(users, articles);


  app.listen(3001, () => {
    console.log("listening on port 3001");
  });
})();
