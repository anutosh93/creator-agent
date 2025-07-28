# Content Creator Agent - Backend

A powerful Node.js/Express backend API for AI-powered content creation and management.

## Features

- 🤖 **AI Content Generation**: Generate various types of content using OpenAI GPT-4
- 📝 **Content Management**: Create, read, update, and delete content
- 🔍 **Content Analysis**: Analyze content for SEO, readability, engagement, and tone
- 📁 **File Upload**: Upload and manage images, documents, and other files
- 📊 **Content Statistics**: Get insights about your content library
- 🔄 **Content Variations**: Generate multiple variations of the same content
- 🏷️ **Tagging System**: Organize content with tags and metadata

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key

## Installation

1. Clone the repository and navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Configure your environment variables in `.env`:
```env
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key_here
CORS_ORIGIN=http://localhost:3000
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if the server is running

### AI Content Generation
- `POST /api/ai/generate` - Generate content using AI
- `POST /api/ai/generate-variations` - Generate multiple content variations
- `POST /api/ai/analyze` - Analyze content and provide suggestions

### Content Management
- `GET /api/content` - Get all content (with filtering and search)
- `GET /api/content/:id` - Get specific content by ID
- `POST /api/content` - Create new content
- `PUT /api/content/:id` - Update existing content
- `DELETE /api/content/:id` - Delete content
- `POST /api/content/upload` - Upload files
- `GET /api/content/stats/overview` - Get content statistics

## API Usage Examples

### Generate AI Content
```bash
curl -X POST http://localhost:5000/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a blog post about artificial intelligence trends in 2024",
    "contentType": "blog",
    "tone": "professional",
    "length": "800",
    "additionalContext": "Target audience: tech professionals"
  }'
```

### Create Content
```bash
curl -X POST http://localhost:5000/api/content \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Blog Post",
    "content": "This is the content of my blog post...",
    "type": "blog",
    "tags": ["technology", "ai", "trends"],
    "metadata": {
      "author": "John Doe",
      "category": "Technology"
    }
  }'
```

### Get Content with Filters
```bash
curl "http://localhost:5000/api/content?type=blog&search=ai&sortBy=createdAt&order=desc"
```

## Content Types Supported

- **Blog**: Blog posts and articles
- **Social**: Social media content
- **Email**: Email campaigns and newsletters
- **Ad**: Advertising copy and marketing materials

## Analysis Types

- **SEO**: Search engine optimization analysis
- **Readability**: Content readability assessment
- **Engagement**: Engagement potential analysis
- **Tone**: Tone and style analysis

## File Upload

Supported file types:
- Images: JPEG, JPG, PNG, GIF
- Documents: PDF, DOC, DOCX, TXT

Maximum file size: 10MB (configurable)

## Error Handling

The API returns consistent error responses:
```json
{
  "error": "Error message",
  "message": "Detailed error information (in development)"
}
```

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: Request validation and sanitization
- **File Upload Security**: File type and size restrictions

## Development

### Project Structure
```
backend/
├── routes/
│   ├── ai.js          # AI content generation routes
│   └── content.js     # Content management routes
├── uploads/           # File upload directory
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
└── README.md          # This file
```

### Adding New Features

1. Create new route files in the `routes/` directory
2. Add route imports to `server.js`
3. Update this README with new endpoint documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License. 