import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    sername: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image:{
        type: String,
        default: "",
    },
    searchHistory:{
        type: Array,
        default: "",
    }
})

const User = mongoose.model("User", userSchema);

export default User;