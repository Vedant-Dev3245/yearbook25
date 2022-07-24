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

app.use(cors());
app.options('*', cors());
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
app.use("/auth", authRoutes);
app.use("/", getRoutes); // find another way to implement logged in
app.use("/", postRoutes);
