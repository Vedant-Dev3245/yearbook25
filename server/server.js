const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { User } = require("./models/user");
const app = express();
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const port = process.env.PORT || 3001;

// MONGODB

mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err.message);
    });

// COOKIES

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

// CORS

app.use(cors());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// BODY PARSER

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// LISTEN

app.listen(port, () => console.log("Listening at port " + port));

// ROUTES

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
