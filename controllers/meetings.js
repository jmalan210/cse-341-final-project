const Meeting = require('../models/Meeting');
const Book = require('../models/Book');
const User = require('../models/User')

const getAllMeetings = async (req, res) => {
     //#swagger.tags = ['Meetings'] 
    try {
        const meetings = await Meeting.find()
            .populate('host', 'firstName lastName')
            .populate('book', 'title author');
        res.status(200).json(meetings);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getSingleMeetingById = async (req, res) => {
    //#swagger.tags = ['Meetings']
    
    try {
        const meeting = await Meeting.findById(req.params.id)
            .populate('host', 'firstName lastName')
            .populate('book', 'title author');
        if (!meeting) return res.status(404).json({ messages: 'Meeting not found' });
        res.status(200).json(meeting);
    } catch (err) {
        res.status(400).json({ message: err.message });

    }
    
};

const getMeetingByMonth = async (req, res) => {
    //#swagger.tags = ['Meetings']

    try {
        const month = parseInt(req.params.month);
        const year = parseInt(req.params.year);

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const meetings = await Meeting.find({
            date: {
                $gte: startDate,
                $lt: endDate
            }
        }).populate('host', 'firstName lastName')
        .populate('book', 'title author');
        res.status(200).json(meetings);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createMeeting = async (req, res) => {
     //#swagger.tags = ['Meetings'] 
    try {
        const newMeeting = {
            date: req.body.date, 
            location: req.body.location,
            host: req.body.host,
            book: req.body.book
        }
        const meeting = await Meeting.create(newMeeting);
        res.status(201).json(meeting)
    } catch (err) {
        // console.error(err);
        res.status(400).json({ message: err.message });
    }
};

const updateMeeting = async (req, res) => {
    //#swagger.tags = ['Meetings']
    
    try {
        const meeting = {
            date: req.body.date, 
            location: req.body.location,
            host: req.body.host,
            book: req.body.book
        }
        const updatedMeeting = await Meeting.findByIdAndUpdate(req.params.id, meeting, { new: true, runValidators: true });
        if (!updatedMeeting) return res.status(404).json({ message: 'Meeting not found' });
        res.status(200).json(updatedMeeting);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteMeeting = async (req, res) => {
    //#swagger.tags = ['Meetings']
    
    try {
        const deletedMeeting = await Meeting.findByIdAndDelete(req.params.id);
        if (!deletedMeeting) return res.status(404).json({ message: 'Meeting not found' });
        res.status(200).json({ message: 'Meeting deleted' });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getAllMeetings,
    getSingleMeetingById,
    getMeetingByMonth,
    updateMeeting,
    createMeeting,
    deleteMeeting

}