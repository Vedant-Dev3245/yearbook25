const router = require("express").Router();
const {isAdmin} = require("../middleware/auth")
const { 
    allCommitments,  
    searchByCommitment, 
    updateUserCommitments,
    addCommitment, 
    editCommitment, 
    deleteCommitment
} = require("../views/commitments");

router.post("/", isAdmin, addCommitment);
router.get("/", allCommitments);
router.post("/user", updateUserCommitments);
router.delete("/:id", isAdmin, deleteCommitment);
router.get("/search", searchByCommitment);
router.put("/", isAdmin, editCommitment);

module.exports = router;