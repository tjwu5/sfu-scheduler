import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { scheduleAPI } from '../services/api';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newSchedule, setNewSchedule] = useState({ name: '', semester: '' });

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(false);
      const response = await scheduleAPI.getAllSchedules();
      setSchedules(response.data);
    } catch (err) {
      setError('Failed to fetch schedules');
      console.error('Error fetching schedules:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSchedule = async () => {
    try {
      if (!newSchedule.name || !newSchedule.semester) {
        setError('Please fill in all fields');
        return;
      }

      const response = await scheduleAPI.createSchedule(newSchedule);
      setSchedules([...schedules, response.data]);
      setNewSchedule({ name: '', semester: '' });
      setOpenDialog(false);
      setError(null);
    } catch (err) {
      setError('Failed to create schedule');
      console.error('Error creating schedule:', err);
    }
  };

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      await scheduleAPI.deleteSchedule(scheduleId);
      setSchedules(schedules.filter(s => s.id !== scheduleId));
    } catch (err) {
      setError('Failed to delete schedule');
      console.error('Error deleting schedule:', err);
    }
  };

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          My Schedules
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {schedules.map((schedule) => (
          <Grid item xs={12} md={6} lg={4} key={schedule.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" component="h2">
                    {schedule.name}
                  </Typography>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDeleteSchedule(schedule.id)}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </Box>
                
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {schedule.semester}
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {schedule.courses.length} course{schedule.courses.length !== 1 ? 's' : ''} enrolled
                </Typography>

                {schedule.courses.length > 0 ? (
                  <Box>
                    <Typography variant="body2" fontWeight="bold" mb={1}>
                      Courses:
                    </Typography>
                    {schedule.courses.map((course, index) => (
                      <Typography key={index} variant="body2" color="text.secondary">
                        • {course.courseId} ({course.sectionId})
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary" fontStyle="italic">
                    No courses added yet
                  </Typography>
                )}
                
                <Typography variant="caption" display="block" mt={2} color="text.secondary">
                  Created: {new Date(schedule.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {schedules.length === 0 && !loading && (
        <Box textAlign="center" mt={4}>
          <Typography variant="body1" color="text.secondary" mb={2}>
            You haven't created any schedules yet.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Click the + button to create your first schedule!
          </Typography>
        </Box>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add schedule"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setOpenDialog(true)}
      >
        <AddIcon />
      </Fab>

      {/* Create Schedule Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Schedule</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Schedule Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newSchedule.name}
            onChange={(e) => setNewSchedule({ ...newSchedule, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Semester"
            type="text"
            fullWidth
            variant="outlined"
            value={newSchedule.semester}
            onChange={(e) => setNewSchedule({ ...newSchedule, semester: e.target.value })}
            placeholder="e.g., Fall 2024"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateSchedule} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Schedule;