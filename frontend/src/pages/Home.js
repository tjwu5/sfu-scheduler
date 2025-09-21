import React from 'react';
import {
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Home = () => {
  const features = [
    {
      icon: <SearchIcon fontSize="large" color="primary" />,
      title: 'Course Search',
      description: 'Search and filter SFU courses by department, level, and availability.',
      link: '/courses',
    },
    {
      icon: <CalendarTodayIcon fontSize="large" color="primary" />,
      title: 'Schedule Builder',
      description: 'Create and manage your course schedules with conflict detection.',
      link: '/schedule',
    },
    {
      icon: <AssessmentIcon fontSize="large" color="primary" />,
      title: 'RMP Integration',
      description: 'View Rate My Professor scores to help with instructor selection.',
      link: '/courses',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(45deg, #CC0633 30%, #FF4569 90%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          SFU Course Scheduler
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Plan your courses with ease
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
          Help students course plan based on availability, prerequisites, schedule preferences, and Rate My Professor scores.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/courses"
          sx={{
            backgroundColor: 'white',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.9)',
            },
          }}
        >
          Get Started
        </Button>
      </Paper>

      {/* Features Section */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
        Features
      </Typography>
      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease-in-out',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {feature.description}
                </Typography>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to={feature.link}
                  fullWidth
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;