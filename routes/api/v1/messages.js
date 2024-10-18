const Message = require('../../../models/Message'); // Adjust the path as necessary

// Get all messages
exports.index = (req, res) => {
    Message.find()
        .then(messages => res.status(200).json({ messages }))
        .catch(err => {
            console.error('Error fetching messages:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// Create a new message
exports.create = (req, res) => {
    const { user, text } = req.body;

    // Validate input
    if (!user || !text) {
        return res.status(400).json({ error: 'User and text are required.' });
    }

    const newMessage = new Message({ user, text });

    newMessage.save()
        .then(message => {
            console.log('Message saved:', message);
            res.status(201).json({ message });
        })
        .catch(err => {
            console.error('Error saving message:', err);
            // Provide a more specific error message if possible
            if (err.name === 'ValidationError') {
                return res.status(400).json({ error: err.message });
            }
            res.status(500).json({ error: 'Internal server error' });
        });
};

// Update a message
exports.update = (req, res) => {
    const { id } = req.params;
    const { user, text } = req.body;

    Message.findByIdAndUpdate(id, { user, text }, { new: true })
        .then(message => {
            if (!message) {
                return res.status(404).json({ error: 'Message not found' });
            }
            res.status(200).json({ message });
        })
        .catch(err => {
            console.error('Error updating message:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// Delete a message
exports.destroy = (req, res) => {
    const { id } = req.params;

    Message.findByIdAndDelete(id)
        .then(message => {
            if (!message) {
                return res.status(404).json({ error: 'Message not found' });
            }
            res.status(204).send(); // No content to return for successful deletion
        })
        .catch(err => {
            console.error('Error deleting message:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
};
