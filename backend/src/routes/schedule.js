const express = require('express');
const router = express.Router();

// Mock schedule data
let mockSchedules = [
  {
    id: '1',
    name: 'Fall 2024 Schedule',
    semester: 'Fall 2024',
    courses: [
      {
        courseId: 'CMPT120',
        sectionId: 'D100'
      }
    ],
    createdAt: new Date().toISOString()
  }
];

// GET /api/schedule - Get all schedules for user
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: mockSchedules,
      count: mockSchedules.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch schedules'
    });
  }
});

// POST /api/schedule - Create new schedule
router.post('/', (req, res) => {
  try {
    const { name, semester, courses = [] } = req.body;
    
    if (!name || !semester) {
      return res.status(400).json({
        success: false,
        error: 'Name and semester are required'
      });
    }
    
    const newSchedule = {
      id: Date.now().toString(),
      name,
      semester,
      courses,
      createdAt: new Date().toISOString()
    };
    
    mockSchedules.push(newSchedule);
    
    res.status(201).json({
      success: true,
      data: newSchedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create schedule'
    });
  }
});

// GET /api/schedule/:id - Get specific schedule
router.get('/:id', (req, res) => {
  try {
    const schedule = mockSchedules.find(s => s.id === req.params.id);
    
    if (!schedule) {
      return res.status(404).json({
        success: false,
        error: 'Schedule not found'
      });
    }
    
    res.json({
      success: true,
      data: schedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch schedule'
    });
  }
});

// PUT /api/schedule/:id - Update schedule
router.put('/:id', (req, res) => {
  try {
    const scheduleIndex = mockSchedules.findIndex(s => s.id === req.params.id);
    
    if (scheduleIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Schedule not found'
      });
    }
    
    const { name, semester, courses } = req.body;
    const updatedSchedule = {
      ...mockSchedules[scheduleIndex],
      ...(name && { name }),
      ...(semester && { semester }),
      ...(courses && { courses }),
      updatedAt: new Date().toISOString()
    };
    
    mockSchedules[scheduleIndex] = updatedSchedule;
    
    res.json({
      success: true,
      data: updatedSchedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update schedule'
    });
  }
});

// DELETE /api/schedule/:id - Delete schedule
router.delete('/:id', (req, res) => {
  try {
    const scheduleIndex = mockSchedules.findIndex(s => s.id === req.params.id);
    
    if (scheduleIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Schedule not found'
      });
    }
    
    mockSchedules.splice(scheduleIndex, 1);
    
    res.json({
      success: true,
      message: 'Schedule deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete schedule'
    });
  }
});

module.exports = router;