const mongoose = require('mongoose');
const genres = ["Fantasy", "Science Fiction", "Mystery", "Thriller", "Horror", "Romance", "Historical Fiction", "Literary Fiction", "Adventure", "Dystopian", "Young Adult", "Contemporary Fiction", "Biography", "Autobiography", "Memoir", "History", "Self-Help", "Philosophy", "Science", "Politics", "Religion", "True Crime", "Education", "Other" ]


const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    joinDate: { type: Date, default: Date.now },
    role: { type: String, enum: ['admin', 'user'], required: true },
    favoriteGenre: { type: String, enum: genres },
    favoriteAuthor: { type: String }, 
    favoriteBook: { type: String},    
    displayName: { type: String, required: true },
    img_url: {type: String, required: false}
    
})

module.exports = mongoose.model('User', userSchema)