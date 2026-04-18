const express = require('express');
const router = express.Router();
const { createRequest, getAllRequests } = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware'); // Make sure path is correct!

router.post('/', protect, createRequest);
router.get('/', getAllRequests);

module.exports = router; 