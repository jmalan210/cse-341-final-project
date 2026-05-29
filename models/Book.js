const mongoose = require('mongoose');
const genres = ["Fantasy", "Science Fiction", "Mystery", "Thriller", "Horror", "Romance", "Historical Fiction", "Literary Fiction", "Adventure", "Dystopian", "Young Adult", "Contemporary Fiction", "Biography", "Autobiography", "Memoir", "History", "Self-Help", "Philosophy", "Science", "Politics", "Religion", "True Crime", "Education", "Other" ]

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true }, 
    category: { type: String, enum: ['fiction', 'nonfiction'], required: true },
    genre: { type: String, required: true, enum: genres },
    status: {type: String, enum:['assigned', 'unassigned', 'read']}
})

module.exports = mongoose.model('Book', bookSchema)