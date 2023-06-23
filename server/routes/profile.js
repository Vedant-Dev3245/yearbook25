const router = require("express").Router();
const { isAdmin } = require("../middleware/auth");
const { editProfile, writeCaption, searchUsers, getProfile } = require("../views/profile");


router.patch("/edit", editProfile);
router.get("/search", searchUsers);
router.get("/:id", getProfile);
router.post("/:id/caption", writeCaption);

module.exports = router;