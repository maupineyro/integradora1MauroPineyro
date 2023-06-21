//el chat de servidor
import messageModel from "../dao/models/messages.model.js";

//estructurar el socket de chat
const socketChat = async(io) =>{
    
    io.on ('connection', async (socket)=>{
        console.log ('connection: Chat connected');
        const msgLogs = await messageModel.find();//parte inicial
        console.log(msgLogs)
        socket.emit('allMessages', msgLogs)

        socket.on ('newMessage', async(data)=>{
            const messages = new messageModel(data)
            await messages.save(data)
        socket.emit ('allMessages', messages)  
        io.emit('allMessages', messages)

        })
    })
}

export default socketChat;