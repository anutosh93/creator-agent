# Content Creator Agent - Frontend

A modern React frontend for the AI-powered content creation and management system.

## Features

- 🎨 **Modern UI**: Beautiful Material-UI based interface
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🤖 **AI Content Generation**: Generate content using OpenAI GPT-4
- 📝 **Content Management**: Create, edit, and organize content
- 🔍 **Advanced Search**: Search and filter content by type, tags, and more
- 📊 **Dashboard**: Overview of content statistics and recent activity
- 🎯 **Content Variations**: Generate multiple variations of the same content
- 📁 **File Upload**: Upload and manage supporting files
- 🔄 **Real-time Updates**: Live content updates and notifications

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend README)

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional):
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode
```bash
npm start
```

The application will start on `http://localhost:3000`

### Production Build
```bash
npm run build
```

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   └── Layout.js          # Main layout with sidebar
│   │   └── Common/                # Reusable components
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   └── Dashboard.js       # Main dashboard
│   │   ├── ContentGenerator/
│   │   │   └── ContentGenerator.js # AI content generation
│   │   ├── ContentLibrary/
│   │   │   └── ContentLibrary.js  # Content management
│   │   ├── ContentEditor/
│   │   │   └── ContentEditor.js   # Content editing
│   │   ├── Analytics/
│   │   │   └── Analytics.js       # Analytics and insights
│   │   └── Settings/
│   │       └── Settings.js        # Application settings
│   ├── services/
│   │   └── api.js                 # API communication
│   ├── utils/                     # Utility functions
│   ├── App.js                     # Main app component
│   └── index.js                   # Entry point
├── package.json
└── README.md
```

## Key Components

### Dashboard
- Overview statistics (total content, by type, tags)
- Quick actions for content creation
- Recent content list with quick access

### Content Generator
- AI-powered content generation
- Multiple content types (blog, social, email, ad)
- Tone and length customization
- Content variations generation
- Advanced options and context

### Content Library
- Data grid with sorting and filtering
- Search functionality
- Content type categorization
- Bulk operations
- Quick edit and delete actions

### Layout
- Responsive sidebar navigation
- Header with notifications and user menu
- Mobile-friendly design

## API Integration

The frontend communicates with the backend through the `api.js` service:

- **Content Generation**: AI-powered content creation
- **Content Management**: CRUD operations for content
- **File Upload**: File management and storage
- **Analytics**: Content statistics and insights

## Styling

The application uses Material-UI (MUI) for consistent styling:

- **Theme**: Custom theme with primary blue and secondary orange
- **Components**: Pre-built MUI components for consistency
- **Responsive**: Mobile-first responsive design
- **Accessibility**: WCAG compliant components

## Development

### Adding New Features

1. Create new components in the appropriate directory
2. Add routes in `App.js` if needed
3. Update the API service for new endpoints
4. Add any new dependencies to `package.json`

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use Material-UI components for consistency
- Implement proper error handling
- Add loading states for async operations

## Available Scripts

- `npm start`: Start development server
- `npm run build`: Build for production
- `npm test`: Run tests
- `npm run eject`: Eject from Create React App

## Dependencies

### Core
- **React**: UI library
- **React Router**: Navigation
- **Material-UI**: Component library
- **Axios**: HTTP client

### Features
- **React Markdown**: Markdown rendering
- **React Syntax Highlighter**: Code highlighting
- **MUI Data Grid**: Advanced data tables

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
