# SFU Scheduler

A comprehensive web application to help Simon Fraser University students plan their courses based on availability, prerequisites, schedule preferences, and Rate My Professor scores.

## Features

- 🔍 **Course Search & Filtering**: Browse and search through SFU's course catalog
- 📋 **Prerequisites Checking**: Automatically verify course prerequisites
- 📅 **Schedule Building**: Create and manage multiple course schedules
- ⭐ **Rate My Professor Integration**: View instructor ratings for informed decisions
- 📊 **Availability Tracking**: Real-time enrollment numbers and course availability
- ⚠️ **Conflict Detection**: Automatic detection of time conflicts between courses

## Technology Stack

### Frontend
- React 18
- Material-UI (MUI)
- React Router
- Axios for API calls
- Styled Components

### Backend
- Node.js
- Express.js
- RESTful API design
- Environment-based configuration

## Project Structure

```
sfu-scheduler/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # Data models
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   └── server.js       # Server entry point
│   ├── tests/              # Backend tests
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── styles/         # CSS and styling
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── docs/                   # Documentation
├── docker-compose.yml      # Docker development setup
└── package.json           # Root package.json for monorepo
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tjwu5/sfu-scheduler.git
   cd sfu-scheduler
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install all workspace dependencies
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Backend environment
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev
   ```

   This will start both the backend (port 5000) and frontend (port 3000) servers concurrently.

### Alternative: Docker Development

1. **Using Docker Compose**
   ```bash
   docker-compose up
   ```

   This will build and start both services:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both applications for production
- `npm run test` - Run tests for both applications
- `npm run install:all` - Install dependencies for all workspaces

### Backend
- `npm run dev` - Start backend with nodemon (auto-restart)
- `npm start` - Start backend in production mode
- `npm test` - Run backend tests

### Frontend
- `npm start` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm test` - Run frontend tests

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get specific course
- `GET /api/courses/search/:query` - Search courses

### Schedules
- `GET /api/schedule` - Get all schedules
- `POST /api/schedule` - Create new schedule
- `GET /api/schedule/:id` - Get specific schedule
- `PUT /api/schedule/:id` - Update schedule
- `DELETE /api/schedule/:id` - Delete schedule

## Development

### Adding New Features

1. **Backend API Endpoints**
   - Add route handlers in `backend/src/routes/`
   - Implement business logic in `backend/src/controllers/`
   - Add tests in `backend/tests/`

2. **Frontend Components**
   - Create components in `frontend/src/components/`
   - Add pages in `frontend/src/pages/`
   - Update routing in `frontend/src/App.js`

3. **API Integration**
   - Add API methods in `frontend/src/services/api.js`
   - Use API methods in components with proper error handling

### Code Style

- Follow ESLint configuration for consistent code style
- Use Material-UI components for consistent UI design
- Implement proper error handling and loading states
- Write meaningful commit messages

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue on GitHub or contact the development team.

---

**Happy Course Planning! 🎓**
