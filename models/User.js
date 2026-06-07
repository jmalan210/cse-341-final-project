const mongoose = require('mongoose');
const genres = ["Fantasy", "Science Fiction", "Mystery", "Thriller", "Horror", "Romance", "Historical Fiction", "Literary Fiction", "Adventure", "Dystopian", "Young Adult", "Contemporary Fiction", "Biography", "Autobiography", "Memoir", "History", "Self-Help", "Philosophy", "Science", "Politics", "Religion", "True Crime", "Education", "Other" ]


const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^\S+@\S+\.\S+$/ },
    joinDate: { type: Date, default: Date.now },
    role: { type: String, enum: ['admin', 'user'], required: true },
    favoriteGenre: { type: String, enum: genres, trim: true },
    favoriteAuthor: { type: String, trim: true }, 
    favoriteBook: { type: String, trim: true},    
    displayName: { type: String, required: true, trim: true, unique: true },
    img_url: {type: String, trim:true}
    
})

module.exports = mongoose.model('User', userSchema)