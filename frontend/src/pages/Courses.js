import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Chip,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { coursesAPI } from '../services/api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await coursesAPI.getAllCourses();
      setCourses(response.data);
    } catch (err) {
      setError('Failed to fetch courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Course Catalog
      </Typography>
      
      <TextField
        fullWidth
        label="Search courses..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        placeholder="Enter course code or name"
      />

      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} md={6} key={course.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" component="h2">
                    {course.id}
                  </Typography>
                  <Chip label={`${course.credits} credits`} size="small" />
                </Box>
                
                <Typography variant="subtitle1" gutterBottom>
                  {course.name}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {course.description}
                </Typography>

                {course.prerequisites.length > 0 && (
                  <Box mb={2}>
                    <Typography variant="body2" fontWeight="bold">
                      Prerequisites:
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                      {course.prerequisites.map((prereq) => (
                        <Chip
                          key={prereq}
                          label={prereq}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                {course.sections.map((section) => (
                  <Box key={section.sectionId} mt={2} p={2} bgcolor="grey.50" borderRadius={1}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          <strong>Section:</strong> {section.sectionId}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Instructor:</strong> {section.instructor}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          <strong>Schedule:</strong> {section.schedule}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Enrollment:</strong> {section.enrolled}/{section.capacity}
                        </Typography>
                        {section.rmpScore && (
                          <Typography variant="body2">
                            <strong>RMP Score:</strong> {section.rmpScore}/5.0
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredCourses.length === 0 && !loading && (
        <Box textAlign="center" mt={4}>
          <Typography variant="body1" color="text.secondary">
            No courses found matching your search.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Courses;