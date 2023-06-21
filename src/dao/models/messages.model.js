import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema ({
    name:{
        type: String,
        required: true,
    },

    message:{
        type: String,
        required: true,
    },
})

const messageModel = mongoose.model ('message',messagesSchema);

export default messageModel;