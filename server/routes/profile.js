const router = require("express").Router();
const { isAdmin } = require("../middleware/auth");
const { editProfile, writeCaption, checkProfile, addProfile, searchUsers, getProfile } = require("../views/profile");


router.post("/edit", editProfile);
router.get("/search", searchUsers);
router.get("/:id", getProfile);
router.post("/:id/caption", writeCaption);
router.post("/check", checkProfile); // Should not be using this

// admin routes
router.post("/add", isAdmin, addProfile);

module.exports = router;