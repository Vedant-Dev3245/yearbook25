const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const User = require("./models/user");
const app = express();
// const passport = require("passport");
const keys = require("./config/keys");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const cookieSession = require("cookie-session");
const port = process.env.PORT || 3001;

mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  replicaSet: "rs",
})
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("error", err.message);
  });

app.use(cookieParser());
app.use(
  cookieSession({
    secret: keys.session.cookieKey,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

//app.use(passport.initialize());
//app.use(passport.session());
var whitelist = ['https://sarc-yearbook-sarc.vercel.app', 'https://yearbook.bits-sarc.org', 'http://localhost:3000'];
//var whitelist = ['https://yearbook-backend-5algm.ondigitalocean.app']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(express.static("public"));
app.listen(port, () => console.log("Listening at port " + port));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require("./routes/auth-routes");
const getRoutes = require("./routes/get-routes");
const postRoutes = require("./routes/post-routes");
function loggedIn(req, res, next) {
  console.log(req)
  console.log(req.user)
  if (req.user) {
    next();
  } else {
    res.redirect("/");
  }
}
// app.use("/auth", authRoutes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
})

app.use("/", getRoutes);
app.use("/", postRoutes);
