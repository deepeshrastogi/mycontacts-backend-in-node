const express = require("express");
const router = express.Router();
const { 
    getUsers, 
    registerUser, 
    loginUser,
    updateUser, 
    deleteUser,
    currentUser,
} = require("../controllers/userController");

const validateToken = require("../middleware/validateTokenHandler");

router.get("/");
router.get("/user",getUsers);
router.post("/login",loginUser)
router.post("/register",registerUser);
router.get("/current", validateToken, currentUser);
router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;