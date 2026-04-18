const Request = require('../models/Request');

// Heuristic AI Feature: Simple Keyword Matching
const getSmartTags = (desc, title) => {
    let tags = [];
    const text = (desc + " " + title).toLowerCase();
    
    if (text.includes('react') || text.includes('node') || text.includes('code')) tags.push('Development');
    if (text.includes('figma') || text.includes('ui') || text.includes('design')) tags.push('UI/UX');
    if (text.includes('bug') || text.includes('error')) tags.push('Debugging');
    
    return tags;
};

// Create Request
exports.createRequest = async (req, res) => {
    try {
        const { title, description, category, urgency } = req.body;
        const tags = getSmartTags(description, title);
        
        const newRequest = await Request.create({
            title, description, category, urgency, tags,
            createdBy: req.user.id // User ID hum middleware se lenge
        });
        
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Requests
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find().populate('createdBy', 'name');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};