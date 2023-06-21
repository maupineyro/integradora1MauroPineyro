//el chat de servidor
import messageModel from "../dao/models/messages.model.js";

//estructurar el socket de chat
const socketChat = async(io) =>{
    let historial = [];
    io.on ('connection', (socket)=>{
        
    })
}

export default socketChat;