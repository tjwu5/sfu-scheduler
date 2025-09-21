import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';

// Mock the API service
jest.mock('./services/api', () => ({
  coursesAPI: {
    getAllCourses: jest.fn(),
    getCourse: jest.fn(),
    searchCourses: jest.fn(),
  },
  scheduleAPI: {
    getAllSchedules: jest.fn(),
    getSchedule: jest.fn(),
    createSchedule: jest.fn(),
    updateSchedule: jest.fn(),
    deleteSchedule: jest.fn(),
  },
  healthAPI: {
    check: jest.fn(),
  },
}));

const theme = createTheme();

const AppWithProviders = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);

test('renders SFU Scheduler navbar', () => {
  render(<AppWithProviders />);
  const titleElement = screen.getByText(/SFU Scheduler/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders navigation buttons', () => {
  render(<AppWithProviders />);
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Courses')).toBeInTheDocument();
  expect(screen.getByText('Schedule')).toBeInTheDocument();
  expect(screen.getByText('About')).toBeInTheDocument();
});