import mongoose from "mongoose";

const UserSchema = new mongoose.Schema ({
    name:{
        type: String, 
        
    },

    lastname:{
        type: String,
    },
    
    email:{
        type: String, 
        required: true,
        unique: true
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