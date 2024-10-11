const mongoose = require('mongoose');
const Message = mongoose.model('Message', { user: String, text: String }); // model is zoals classe 

module.exports = Message; // exporteer de Message model