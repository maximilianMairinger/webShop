// QUESTION: How many db req; when db req and when ram of server (sessions??)
// QUESTION: Good ieda to check data types and stuff here


const express = require('express');
const bodyParser = require('body-parser');
const MC = require('mongodb').MongoClient;
const rand = require('generate-key');

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
    return this.ea((e) => {
      if (e.check(usr)) return e;
    });
  }
  checkName(usr) {
    return this.ea((e) => {
      if (e.checkName(usr)) return e;
    });
  }
  addUser(...usrdata) {
    usrdata.ea((usr) => {
      this.add(new User(usr));
    });
  }
  getSession(session) {
    if (session === undefined) return false;
    return this.ea((usr) => {
      if (usr.sessKey === session) return usr;
    });
  }
}

const users = new UserCollecion();

function auth(body, res) {
  let usr = users.check(body);
  if (usr) {
    let sessKey = rand.generateKey();
    usr.sessKey = sessKey;
    setTimeout(() => {
      sessions.delete(usr);
    }, 1000000000);
    res.send(JSON.stringify({
      suc: true,
      sessKey
    }));
  }
  else res.send(JSON.stringify({
    suc: false
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
});




class Article {
  constructor(data) {
    this.name = data.name;
    this.price = data.price;
    this.weight = data.weight;
    this.stock = data.stock;
    this.description = data.description;
    this.picture = data.picture;
    this.creator = data.creator;
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
  set picture(to) {
    if (to) this._picture = to;
    else throw new InvalidInputError();
  }
  get picture() {
    return this._picture;
  }
}

class ArticleCollecion extends Array {
  constructor(...a) {
    super(...a);
  }
  getByName(name) {
    return this.ea((e) => {
      if (e.name === name) return e;
    });
  }
  addArticle(...artcldata) {
    artcldata.ea((artcl) => {
      this.add(new Article(artcl));
    });
  }
}

const articles = new ArticleCollecion();

const badRequest = (res) => {
  res.send(JSON.stringify({
    suc: false
  }));
  res.end();
}

app.get("/articles", async (req, res) => {
  let articles = await db.collection("articles").find().toArray();
  res.send(JSON.stringify(articles));
  res.end();
})


app.post("/addArticle", async ({body}, res) => {
  let usr = users.getSession(body.sessKey);
  if (usr === undefined) return badRequest(res);
  if (articles.getByName(body.name) !== undefined) return badRequest(res);
  try {
    body.creator = usr.username;
    articles.addArticle(body);
    let {name, description, price, weight, stock, picture, creator} = body;
    stock = parseFloat(stock); if (isNaN(stock)) return badRequest(res);
    price = parseFloat(price); if (isNaN(price)) return badRequest(res);
    weight = parseFloat(weight); if (isNaN(weight)) return badRequest(res);
    await db.collection("articles").insertOne({name, description, price, weight, stock, picture, creator});
  }
  catch (e) {
    return badRequest(res);
  }

  res.send(JSON.stringify({
    suc: true
  }));
  res.end();
});

const carts = [];

app.post("/addToCart", async ({body}, res) => {
  let usr = users.getSession(body.sessKey);
  if (usr === undefined) return badRequest(res);
  let artic = articles.getByName(body.articleName);
  if (artic === undefined) badRequest(res);
  else {
    if (artic.stock > 0) return badRequest(res);
    artic.stock--;
    await db.collection("articles").findOneAndUpdate({name: body.articleName}, {$inc: {stock: -1}});

    let carts = db.collection("carts");
    let usercarts = await carts.find({owner: usr.username}).toArray();

    let fine = usercarts.ea((e) => {
      if (e.article === body.articleName) {
        carts.findOneAndUpdate({_id: e._id}, {$inc: {quantity: 1}});
        return true;
      }
    });

    if (!fine) {
      await carts.insertOne({quantity: 1, article: body.articleName, owner: usr.username});
    }

    res.send(JSON.stringify({
      suc: true
    }));
    res.end();
  }
});

app.post("/getCart", async ({body}, res) => {
  let usr = users.getSession(body.sessKey);
  if (usr === undefined) return badRequest(res);
  let cart = await db.collection("carts").find({owner: usr.username}).toArray();
  db.collection("articles").find({name: cart.artcile}).toArray;

  res.send(JSON.stringify({
    suc: true,

  }));
  res.end();
});


let db;

(async () => {
  db = (await MC.connect("mongodb://127.0.0.1:27017", {useNewUrlParser: true})).db("webshop");


  //Setup
  let dbusrs = await db.collection("users").find().toArray();
  users.addUser(...dbusrs);

  let dbarticles = await db.collection("articles").find().toArray();
  articles.addArticle(...dbarticles);

  let dbcarts = await db.collection("carts").find().toArray();
  carts.add(...dbcarts);


  app.listen(3001, () => {
    console.log("listening on port 3001");
  });
})();
