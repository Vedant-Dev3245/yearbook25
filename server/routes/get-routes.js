const router = require("express").Router();
const bodyParser = require("body-parser");
const User = require("../models/user");

router.get("/profile/:id", async (req, res) => {
      const user = await User.findById(req.user.id);
      if (!user) {
            return res.status(400).send();
      }
      // res.render("profile", { user: user  });
      res.send({ user: user  });
});

router.get("/profile/:id/edit", (req, res) => {
      // res.render("edit-details", { id: req.params.id });
      res.send({ id: req.params.id });
});

router.get("/:id/nominate", (req, res) => {
      // res.render("nominate", { id: req.params.id });
      res.send({ id: req.params.id });
});

router.get("/:id/notifications", async (req, res) => {
      const id = req.params.id;
      const user = await User.findById(id);
      const nominees = user.nominatedby;
      //res.render("notifications", { id: id, nomineelist: nominees });
      res.send({ id: id, nomineelist: nominees })
});

router.get("/:id1/:id2/caption", async (req, res) => {
      const id1 = req.params.id1;
      const id2 = req.params.id2;

      const user1 = await User.findById(id1);
      const user2 = await User.findById(id2);
      let name = user1.name;
      const captions = user2.captions;
      const found = captions.find((o) => o.name === name);
      if (found) {
            const oldcaption = found.caption;
            name = user2.name;
        console.log("founddddd");
        console.log(id2);
            // return res.render("caption", {
            //       id: id1,
            //       name: name,
            //       id2: id2,
            //       oldcaption: oldcaption,
            // });
            return res.send({
                  id: id1,
                  name: name,
                  id2: id2,
                  oldcaption: oldcaption,
            });
      } else {
            name = user2.name;
            // return res.render("caption", {
            //       id: id1,
            //       name: name,
            //       id2: id2,
            //       oldcaption: "",
            // });
            return res.send({
                  id: id1,
                  name: name,
                  id2: id2,
                  oldcaption: "",
            });
      }
});
0
router.get("/:id/search/:searched", async (req, res) => {
      let userid = req.params.id;
      let result = req.params.searched;
      // console.log(result);

      if (result.charAt(0) === "2") {
            const user = await User.findOne({ bitsId: result });
            console.log(user);
            // res.render("public-profile", { user: user, id: userid });
            res.send({ user: user, id: userid });
      } else {
                  let newV = "\"" + result + "\"";
                  const users = await User.find({ $text: { $search: newV  }});
                  console.log(users);
                  // res.render("search-result", { users: users, id: userid });
                  res.send({ users: users, id: userid });
      }
});

router.get("/:id/upload", (req, res) => {
      const id = req.params.id;
      // res.render("upload", { id: id });
      res.send({ id: id });
});

router.get("/:id/developers", (req, res) => {
      // res.render("developers", { id: req.params.id });
      res.send({ id: req.params.id });
});

router.get("/upload/:id", async (req, res) => {
      const user = await User.findById(req.params.id);
      res.set("Content-Type", "image/png");
      res.send(user.img);
});

module.exports = router;
