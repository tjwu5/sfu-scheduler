const express = require('express');
const router = express.Router();

// Mock course data for demonstration
const mockCourses = [
  {
    id: 'CMPT120',
    name: 'Introduction to Computing Science and Programming I',
    credits: 3,
    prerequisites: [],
    description: 'An elementary introduction to computing science and computer programming.',
    sections: [
      {
        sectionId: 'D100',
        instructor: 'John Smith',
        schedule: 'MWF 10:30-11:20',
        capacity: 120,
        enrolled: 89,
        rmpScore: 4.2
      }
    ]
  },
  {
    id: 'CMPT225',
    name: 'Data Structures and Programming',
    credits: 3,
    prerequisites: ['CMPT120', 'CMPT125'],
    description: 'Introduction to a variety of practical and important data structures and methods for implementation and for experimental and analytical evaluation.',
    sections: [
      {
        sectionId: 'D100',
        instructor: 'Jane Doe',
        schedule: 'TTh 14:30-16:20',
        capacity: 100,
        enrolled: 78,
        rmpScore: 3.8
      }
    ]
  }
];

// GET /api/courses - Get all courses
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: mockCourses,
      count: mockCourses.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch courses'
    });
  }
});

// GET /api/courses/:id - Get specific course
router.get('/:id', (req, res) => {
  try {
    const courseId = req.params.id.toUpperCase();
    const course = mockCourses.find(c => c.id === courseId);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch course'
    });
  }
});

// GET /api/courses/search - Search courses
router.get('/search/:query', (req, res) => {
  try {
    const query = req.params.query.toLowerCase();
    const filteredCourses = mockCourses.filter(course => 
      course.id.toLowerCase().includes(query) ||
      course.name.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query)
    );
    
    res.json({
      success: true,
      data: filteredCourses,
      count: filteredCourses.length,
      query: query
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to search courses'
    });
  }
});

module.exports = router;