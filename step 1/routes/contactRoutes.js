const express = require("express");
const router = express.Router();
router.route("/").get((req, res) => {
    // res.send("get all contacts");
    res.status(200).json({message:"get all contacts"});
});

router.route("/").post((req, res) => {
    res.status(200).json({message:"create contacts"});
});

router.route("/:id").get((req, res) => {
    res.status(200).json({message:`get contact for ${req.params.id}`});
});

router.route("/:id").put((req, res) => {
    res.status(200).json({message:`update contact for ${req.params.id}`});
});

router.route("/:id").delete((req, res) => {
    res.status(200).json({message:`delete contact for ${req.params.id}`});
});
module.exports = router;