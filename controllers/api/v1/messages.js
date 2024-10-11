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


module.exports = 
{ 
    create,
    index


};