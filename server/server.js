const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { User } = require("./models/user");
const app = express();
// const passport = require("passport");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const cookieSession = require("cookie-session");
const port = process.env.PORT || 3001;
app.use(cors());
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err.message);
  });

app.use(cookieParser());
app.use(
  cookieSession({
    secret: process.env.COOKIE_SECRET,
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET],
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

var whitelist = [
  "https://sarc-yearbook-sarc.vercel.app",
  "https://yearbook.bits-sarc.org",
  "http://localhost:3000",
];

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.static("public"));
app.listen(port, () => console.log("Listening at port " + port));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require("./routes/auth");
const nominationRoutes = require("./routes/nominations");
const pollRoutes = require("./routes/polls");
const profileRoutes = require("./routes/profile");
const { isAuthenticated } = require("./middleware/auth");

app.use("/auth", authRoutes);
app.use("/polls", isAuthenticated, pollRoutes);
app.use("/nominations", isAuthenticated, nominationRoutes);
app.use("/profiles", isAuthenticated, profileRoutes);

app.get("/test", async (req, res) => {
  const all = await User.find({});

  return res.send({ all, msg: "ok" });
});
