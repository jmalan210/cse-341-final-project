const Meeting = require('../models/Meeting');

const getAllMeetings = async (req, res) => {
     //#swagger.tags = ['Meetings'] 
    try {
        const meetings = await Meeting.find().populate('host', 'firstName lastName');
        res.status(200).json(meetings);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getSingleMeetingById = async (req, res) => {
    //#swagger.tags = ['Meetings']
    
    try {
        const meeting = await Meeting.findById(req.params.id).populate('host', 'firstName lastName');
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
        }).populate('host', 'firstName lastName');
        res.status(200).json(meetings);

    } catch (err) {
        res.status(500).json({ error: err.messages });
    }
}

const createMeeting = async (req, res) => {
     //#swagger.tags = ['Meetings'] 
    try {
        const newMeeting = {
            date: req.params.date, 
            location: req.params.location,
            host: req.params.host
        }
        const meeting = await User.create(newMeeting);
        res.status(201).json(meeting)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateMeeting = async (req, res) => {
    //#swagger.tags = ['Meetings']
    
    try {
        const meeting = {
            date: req.params.date, 
            location: req.params.location,
            host: req.params.host
        }
        const updatedMeeting = await User.findByIdAndUpdate(req.params.id, user, { after: true, runValidators: true });
        if (!updatedMeeting) return res.status(404).json({ message: 'Meeting not found' });
        res.status(201).json(updatedMeeting);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteMeeting = async (req, res) => {
    //#swagger.tags = ['Meetings']
    
    try {
        const deletedMeeting = await User.findByIdAndDelete(req.params.id);
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