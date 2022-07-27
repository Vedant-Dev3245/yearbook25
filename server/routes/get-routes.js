const router = require("express").Router();
const bodyParser = require("body-parser");
const User = require("../models/user");
var fs = require("fs");
var users;

router.get("/", (req, res) => {
      return res.send({ msg: "Backend is Up and Running" });
})
router.get("/getprofile/:id", async (req, res) => {
      try {
            const user = await User.findById(req.params.id);
            if (!user) {
                  return res.status(400).send();
            }
            // res.render("profile", { user: user  });
            res.send({ user: user });
      }
      catch (err) {
            return res.send({
                  status:"failure",
                  msg: "There was an error, Please try after some time",
            })
        }
});

router.get("/searchUsers", async (req, res) => {
      const reqName=req.query.name;
      fs.readFile('allUserData.csv',  (err,data) => {
            var users= data.toString() 
            .split('\n') 
            .map(e => e.trim()) 
                  .map(e => e.split(',').map(e => e.trim()));
        
            const filteredUsers = users.filter(user => {
                  console.log(user[0])
                        if (user[0].toLowerCase().includes(reqName.toLowerCase())) return user;
                  })
            console.log(filteredUsers);
            return res.send({ users:filteredUsers });
      })
});


  
// router.get("/profile/:id/edit", (req, res) => {
//       // res.render("edit-details", { id: req.params.id });
//       res.send({ id: req.params.id });
// });

// router.get("/:id/nominate", (req, res) => {
//       // res.render("nominate", { id: req.params.id });
//       res.send({ id: req.params.id });
// });

// router.get("/notifications/:id", async (req, res) => {
//       const id = req.params.id;
//       const user = await User.findById(id);
//       const nominees = user.nominatedby;
//       //res.render("notifications", { id: id, nomineelist: nominees });
//       res.send({ nomineelist: nominees })
// });

// router.get("/:id1/:id2/caption", async (req, res) => {
//       const id1 = req.params.id1;
//       const id2 = req.params.id2;

//       const user1 = await User.findById(id1);
//       const user2 = await User.findById(id2);
//       let name = user1.name;
//       const captions = user2.captions;
//       const found = captions.find((o) => o.name === name);
//       if (found) {
//             const oldcaption = found.caption;
//             name = user2.name;
//         console.log("founddddd");
//         console.log(id2);
//             // return res.render("caption", {
//             //       id: id1,
//             //       name: name,
//             //       id2: id2,
//             //       oldcaption: oldcaption,
//             // });
//             return res.send({
//                   id: id1,
//                   name: name,
//                   id2: id2,
//                   oldcaption: oldcaption,
//             });
//       } else {
//             name = user2.name;
//             // return res.render("caption", {
//             //       id: id1,
//             //       name: name,
//             //       id2: id2,
//             //       oldcaption: "",
//             // });
//             return res.send({
//                   id: id1,
//                   name: name,
//                   id2: id2,
//                   oldcaption: "",
//             });
//       }
// });

router.get("/search/:name", async (req, res) => {
      try {
            let result = req.params.name;
            let newV = "\"" + result + "\"";
            const query = {
                  $text: {
                        $search: newV
                  }
            };
            const sort = { score: { $meta: "textScore" } };
            const projection = {
                  _id: 1,
                  name: 1,
                  img: 1,
                  imageUrl: 1,
                  bitsId: 1,
                  score: { $meta: "textScore" }
            };
            const users = await User.find(query, projection).sort(sort).limit(4)
            console.log(users);
            if (users.length == 0) {
                  res.send({
                        msg: "User not found"
                  })
            }
            else res.send({ users: users });
      }catch (err) {
            return res.send({
                  status:"failure",
                  msg: "There was an error, Please try after some time",
            })
        }        
});

// router.get("/:id/upload", (req, res) => {
//       const id = req.params.id;
//       // res.render("upload", { id: id });
//       res.send({ id: id });
// });

// router.get("/:id/developers", (req, res) => {
//       // res.render("developers", { id: req.params.id });
//       res.send({ id: req.params.id });
// });

// router.get("/upload/:id", async (req, res) => {
//       const user = await User.findById(req.params.id);
//       res.set("Content-Type", "image/png");
//       res.send(user.img);
// });

module.exports = router;
