const router = require("express").Router();
const { isAdmin } = require("../middleware/auth");

const { 
    allCommitments, 
    updateUserCommitments, 
    searchByCommitment, 
    addCommitment, 
    editCommitment, 
    deleteCommitment
} = require("../views/commitments");

router.get("/:id", searchByCommitment);
router.post("/", isAdmin, addCommitment);
router.get("/", allCommitments);
router.post("/user", isAdmin, updateUserCommitments);
router.delete("/:id", isAdmin, deleteCommitment);
router.put("/", isAdmin, editCommitment);

module.exports = router;