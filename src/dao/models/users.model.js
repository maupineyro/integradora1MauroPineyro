import mongoose from "mongoose";

const UserSchema = new mongoose.Schema ({
    email:{
        type: String, 
        required: true,
    },

     password:{
        type: String, 
        required: true,
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart'
        },
    
    role:{
        type: String,
        default: 'user'
    }
})

const userModel = mongoose.model('user',UserSchema)

export default userModel