const router = require("express").Router();
const { allCommitments, updateUserCommitments, searchByCommitment, addCommitment, editCommitment, deleteCommitment} = require("../views/commitments");
const { isAdmin } = require("../middleware/auth");


router.post("/", isAdmin, addCommitment);
router.get("/", allCommitments);
router.get("/:id", searchByCommitment);
router.post("/user", updateUserCommitments);
router.delete("/", isAdmin, deleteCommitment);
router.put("/", isAdmin, editCommitment)

module.exports = router;