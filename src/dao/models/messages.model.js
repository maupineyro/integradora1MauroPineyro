import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema ({

})

const messageModel = mongoose.model ('message',messagesSchema);

export default messageModel;