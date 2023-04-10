const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
//@desc Get all users
//@route GET /api/users
//@access public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json({users});
    // res.status(200).json({message:"get all users"});
});

//@desc Create new user
//@route POST /api/users
//@access public
const createUser = asyncHandler(async (req, res) => {
    console.log("the request body is :",req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const user = await User.create({
        name,
        email,
        phone,
    });
    res.status(201).json(user);
    // res.status(201).json({message:"create users"});
});

//@desc Get user
//@route GET /api/users/:id
//@access public
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error("user not found");
    }
    res.status(200).json(user);
    // res.status(200).json({message:`get user for ${req.params.id}`});
});


//@desc Update user
//@route PUT /api/users/:id
//@access public
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error("user not found");
    }

    const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updateUser);
    // res.status(200).json({message:`update user for ${req.params.id}`});
});

//@desc Delete user
//@route DELETE /api/users/:id
//@access public
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error("user not found");
    }
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json(user);
    // res.status(200).json({message:`delete user for ${req.params.id}`});
});


module.exports = { 
    getUsers, 
    createUser, 
    getUser, 
    updateUser, 
    deleteUser 
};