const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//@desc Get all users
//@route GET /api/users
//@access public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json({users});
    // res.status(200).json({message:"get all users"});
});

//@desc Register new user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    console.log("the request body is :",req.body);
    const {username, email, phone, password} = req.body;
    if(!username || !email || !phone || !password){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password,10);
    // console.log("Hashed password : ", hashedPassword);
    const user = await User.create({
        username,
        email,
        phone,
        password : hashedPassword,
    });
    res.status(201).json(user);
    // res.status(201).json({message:"create users"});
});

//@desc login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }

    const user = await User.findOne({email});
    // compare password with hash password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username : user.username,
                email : user.email,
                id:user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"15m"}
        );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("email or password is not valid")
    }
    // res.status(201).json({message:"create users"});
});



//@desc Current user info
//@route POST /api/users/currentUser
//@access private
const currentUser = asyncHandler(async (req, res) => {
    // const user = await User.findById(req.params.id);
    // if(!user){
    //     res.status(404);
    //     throw new Error("user not found");
    // }
    res.status(200).json(req.user);
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
    registerUser, 
    loginUser,
    updateUser, 
    deleteUser,
    currentUser,
};