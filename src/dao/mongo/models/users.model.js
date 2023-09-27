import mongoose from "mongoose";

const UserSchema = new mongoose.Schema ({
    first_name:{
        type: String, 
        
    },

    last_name:{
        type: String,
    },
    
    email:{
        type: String, 
        required: true,
        unique: true
    },

    age:{
        type: Number
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
        default: 'user',
        enum: ['user', 'admin', 'premium']
    }
})

const userModel = mongoose.model('user',UserSchema)

export default userModel