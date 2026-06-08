const Message = require('../models/Message');
const User = require('../models/User');

const getAllMessages = async (req, res) => {
    //#swagger.tags = ['Messages'] 
    try {
        const messages = await Message.find()
            .populate('user', 'displayName')
            .sort({createdAt: -1})
        res.status(200).json(messages);
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getMessageById = async (req, res) => {
    //#swagger.tags = ['Messages'] 
    try {
        const message = await Message.findById(req.params.id)
            .populate('user', 'displayName');
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json(message);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getMessagesByDisplayName = async (req, res) => {
    //#swagger.tags = ['Messages']
    try {
        const displayName = req.params.displayName;
        const user = await User.findOne({ displayName });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const messages = await Message.find({

            user: user._id
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const createMessage = async (req, res) => {
    //#swagger.tags = ['Messages']
   try {
           const newMessage = {
               
               user: req.body.user,
               title: req.body.title,
               body: req.body.body
           }
           const message = await Message.create(newMessage);
           res.status(201).json(message)
       } catch (err) {
           res.status(400).json({ message: err.message });
       }
   };
   
const updateMessage = async (req, res) => {
    //#swagger.tags = ['Messages']
    
    try {
        const updatedMessage = {
            user: req.body.user,
            title: req.body.title,
            body: req.body.body
        }
        const message = await Message.findByIdAndUpdate(req.params.id, updatedMessage, { new: true, runValidators: true });
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(201).json(message)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};

const deleteMessage = async (req, res) => {
    //#swagger.tags = ['Messages']
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);
        if (!deletedMessage) return res.status(404).json({ message: 'Message not found' });
        res.status(200).json({ message: 'Message deleted' });
    
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getAllMessages, 
    getMessageById,
    getMessagesByDisplayName, 
    createMessage, 
    updateMessage,
    deleteMessage
}