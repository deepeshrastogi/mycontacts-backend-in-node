const express = require("express");
const router = express.Router();
const { 
    getUsers, 
    createuser, 
    getUser, 
    updateUser, 
    deleteUser 
} = require("../controllers/userController")

router.route("/").get(getUsers).post(createuser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;