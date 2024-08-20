import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";


export const sendMessage = async(req, res) =>{
    try {
        const senderId = req.id;
        const reciverId = req.params.id;
        const {message} = req.body;
        
        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,reciverId]}

        })

        if(!conversation)
        {
             conversation = await Conversation.create({
                participants: [senderId, reciverId]
             })
        }

        const newMessage = await Message.create({
            senderId,
            reciverId,
            message
         })

         if(newMessage) conversation.messages.push(newMessage._id)
            await Promise.all([conversation.save(),newMessage.save()])
 
         return res.status(201).json({
             success: true,
             message: "Message sent successfully",
             conversation,
             newMessage,
         })

    
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error);
    }

}

export const getMessage= async (req, res) => {
    try {
        const senderId = req.id
        const reciverId = req.params.id;
        
        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,reciverId]}
        })

        if(!conversation) return res.status(204).json({
            messages: [],
            success: true,
        })

        return res.status(200).json({
            messages: conversation?.messages,
            success: true,
 
        })
    } catch (error) {
        
    }
}