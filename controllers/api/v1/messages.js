//require Message model
const Message = require('../../../models/api/v1/Message');

//include Message.js
const create = (req, res) => {
    const text = req.body.message.text;
    const user = req.body.message.user;

    const m = new Message({ user: user, text: text });
    m.save().then(() => {
        res.json({
            status: 'success',
            data: {
                message: m,
            }
        });
      });
    };

const index = (req, res) => {
    const messages = Message.find().then((messages) => {
        res.json({
            status: 'success',
            data: {
                messages: messages,
            }
        });
    });
    
}
const update = (req, res) => {
    const id = req.params.id;
    const text = req.body.message.text;
    const user = req.body.message.user;
    console.log('Updating message with ID:', id);
    console.log('Request body:', req.body);

    Message.findById(id)
        .then((message) => {
            if (!message) {
                // If message is not found, return a 404 error
                return res.status(404).json({
                    status: 'error',
                    message: 'Message not found',
                });
            }
            // Update the message fields
            message.text = text;
            message.user = user;
            return message.save();
        })
        .then((updatedMessage) => {
            res.json({
                status: 'success',
                data: {
                    message: updatedMessage,
                },
            });
        })
        .catch((err) => {
            console.error('Error updating message:', err);
            res.status(500).json({
                status: 'error',
                message: 'Failed to update message',
                details: err.message,
            });
        });
};


// delete messages
const destroy = (req, res) => {
    const id = req.params.id;

    Message.findByIdAndDelete(id).then((message) => {
        res.json({
            status: 'success',
            data: {
                message: message,
            }
        });
    });
}



module.exports = 
{ 
    create,
    index,
    update,
    destroy
};