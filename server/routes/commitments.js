const router = require("express").Router();
const {isAdmin} = require("../middleware/auth")
const { 
    allCommitments,  
    searchByCommitment, 
    updateUserCommitments,
    addCommitment, 
    bulkAddCommitments,
    editCommitment, 
    deleteCommitment
} = require("../views/commitments");

router.post("/", addCommitment);
router.post("/bulk", bulkAddCommitments);
router.get("/", allCommitments);
router.post("/user", updateUserCommitments);
router.delete("/:id", isAdmin, deleteCommitment);
router.get("/search", searchByCommitment);
router.put("/", isAdmin, editCommitment);

module.exports = router;