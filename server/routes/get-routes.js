const router = require("express").Router();
const bodyParser = require("body-parser");
const {User, Search} = require("../models/user");
var fs = require("fs");
const {query} = require("express");
var users;
const middleware = require('./auth-middlewares')
const verifyToken = middleware.verifyToken
const getUserprofile = middleware.getUserprofile

// do error handling before adding a new api
router.get("/", (req, res) => {
    return res.send({msg: "Backend is Up and Running"});
})
//basic api to get the user from object id
//TODO:
// add middleware that validates if user id matches the one in jwt token
router.get("/getprofile/:id", getUserprofile, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).send();
        }
        if (res.locals.is_user) {
            res.send({user: user});
        } else {
            res.send({
                user: {
                    'name': user.name,
                    'imageUrl': user.imageUrl,
                    'bitsId': user.bitsId,
                    'discipline': user.discipline,
                    'quote': user.quote,
                    'captions': user.captions,
                    'nominatedby': []
                }
            })
        }
    } catch (err) {
        return res.send({
            status: "failure",
            msg: "There was an error, Please try after some time",
        })
    }
});


//searching the user by name, this happens in "Search" collection, /searchUsers?name=sarthak
router.get("/searchUsers", async (req, res) => {
    try {
        let result = await Search.aggregate([
            {
                "$search": {
                    'index': 'search',
                    "autocomplete": { //autocomplete is implemented so that suggestions are sent to front
                        "query": `${req.query.name}`,
                        "path": "name"
                    }
                },
            },
            {
                $limit: 12
            },
            {
                $project: {
                    "_id": 0,
                }
            }
        ]);
        res.send({users: result});
    } catch (e) {
        res.status(500).send({message: e.message});
    }

})

//not using this api but helpful for searching by name in User collection
router.get("/search/:name", async (req, res) => {
    try {
        let result = req.params.name;
        let a = 5;
        let newV = "\"" + result + "\"";
        const query = {
            $text: {
                $search: newV
            }
        };
        const sort = {score: {$meta: "textScore"}};
        const projection = {
            _id: 1,
            name: 1,
            img: 1,
            imageUrl: 1,
            bitsId: 1,
            score: {$meta: "textScore"}
        };
        const users = await User.find(query, projection).sort(sort).limit(4)//read about various variations of find online
        console.log(users);
        if (users.length == 0) {
            res.send({
                msg: "User not found"
            })
        } else res.send({users: users});
    } catch (err) {
        return res.send({
            status: "failure",
            msg: "There was an error, Please try after some time",
        })
    }
});

router.get("/requests", middleware.senderToken, async (req, res) => {
    try {
        senderId = req.body.senderId;
        sender = await User.findById(senderId).populate("requests").populate("declined_requests");

        return res.send({
            status: "success",
            requests: sender.requests,
            declined_requests: sender.declined_requests,
        })
    } catch (err) {
        return res.send({
            status: "failure",
            msg: "There was an error, Please try after some time",
        })
    }
});


module.exports = router;
