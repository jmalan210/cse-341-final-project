const mongoose = require('mongoose');
const genres = ["Fantasy", "Science Fiction", "Mystery", "Thriller", "Horror", "Romance", "Historical Fiction", "Literary Fiction", "Adventure", "Dystopian", "Young Adult", "Contemporary Fiction", "Biography", "Autobiography", "Memoir", "History", "Self-Help", "Philosophy", "Science", "Politics", "Religion", "True Crime", "Education", "Other" ]

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true,  trim: true }, 
    category: { type: String, enum: ['fiction', 'nonfiction'], required: true,  trim: true },
    genre: { type: String, required: true, enum: genres,  trim: true },
    status: {type: String, required: true, enum:['assigned', 'unassigned', 'read'],  trim: true}
})

module.exports = mongoose.model('Book', bookSchema)