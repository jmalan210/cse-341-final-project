const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Book = require('../models/Book');
const Meeting = require('../models/Meeting');
const Message = require('../models/Message');

const seedData = require('./seedData');

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");

        await User.deleteMany();
        await Book.deleteMany();
        await Meeting.deleteMany();
        await Message.deleteMany();

        console.log("Old data cleared");

        const createdUsers = await User.insertMany(seedData.users);
        const createdBooks = await Book.insertMany(seedData.books);
        

        const meetingsToInsert = seedData.meetings.map((m, index) => {
            return {
                ...m,
                host: createdUsers[index % createdUsers.length]._id,
                book: createdBooks[index % createdBooks.length]._id
            };
        });
        await Meeting.insertMany(meetingsToInsert);

        const createdMessages = await Message.insertMany(
            seedData.messages.map((msg, index) => ({
                ...msg,
                user: createdUsers[index % createdUsers.length]._id
            }))
        );
    
        console.log("Seed complete!");
        process.exit();

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();