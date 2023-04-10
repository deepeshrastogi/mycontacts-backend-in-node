const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true, "Please add the contact name"],
    },
    email:{
        type: String,
        required:[true, "Please add the contact email address"],
    },
    phone:{
        type: String,
        required:[true, "Please add the contact phone address"],
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);