import React from 'react';
import {
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const About = () => {
  const features = [
    {
      title: 'Course Search & Filtering',
      description: 'Browse and search through SFU\'s course catalog with advanced filtering options.',
    },
    {
      title: 'Prerequisites Checking',
      description: 'Automatically verify if you meet the prerequisites for selected courses.',
    },
    {
      title: 'Schedule Building',
      description: 'Create multiple schedules and detect time conflicts between courses.',
    },
    {
      title: 'Rate My Professor Integration',
      description: 'View instructor ratings to help make informed decisions about course sections.',
    },
    {
      title: 'Availability Tracking',
      description: 'See real-time enrollment numbers and course availability.',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        About SFU Scheduler
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Mission
        </Typography>
        <Typography variant="body1" paragraph>
          SFU Scheduler is designed to help Simon Fraser University students plan their courses
          more effectively by providing tools to search courses, check prerequisites, build schedules,
          and make informed decisions based on instructor ratings and course availability.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Key Features
        </Typography>
        <List>
          {features.map((feature, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={feature.title}
                  secondary={feature.description}
                />
              </ListItem>
              {index < features.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="body1" paragraph>
          1. <strong>Browse Courses:</strong> Use the course catalog to explore available courses,
          view descriptions, prerequisites, and section information.
        </Typography>
        <Typography variant="body1" paragraph>
          2. <strong>Build Schedules:</strong> Create custom schedules by adding courses and sections
          that fit your preferences and availability.
        </Typography>
        <Typography variant="body1" paragraph>
          3. <strong>Check Conflicts:</strong> The system automatically detects time conflicts
          and prerequisite issues to help you plan effectively.
        </Typography>
        <Typography variant="body1" paragraph>
          4. <strong>Make Informed Decisions:</strong> Use Rate My Professor scores and enrollment
          data to choose the best sections for your needs.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Technology Stack
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Frontend:</strong> React, Material-UI, React Router
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Backend:</strong> Node.js, Express.js
        </Typography>
        <Typography variant="body1">
          <strong>Development:</strong> Modern JavaScript/ES6+, RESTful API design
        </Typography>
      </Paper>
    </Box>
  );
};

export default About;