# Content Creator Agent

A powerful AI-powered content creation and management system built with Node.js, Express, React, and OpenAI GPT-4.

## 🚀 Features

### AI-Powered Content Generation
- **Multiple Content Types**: Blog posts, social media content, email campaigns, advertising copy
- **Customizable Tone**: Professional, casual, friendly, formal, humorous, persuasive
- **Content Variations**: Generate multiple versions of the same content
- **Advanced Context**: Add specific requirements and target audience information

### Content Management
- **Content Library**: Organize and manage all your content in one place
- **Advanced Search**: Search by title, content, tags, and type
- **Tagging System**: Categorize content with custom tags
- **File Upload**: Upload supporting images and documents
- **Content Editor**: Rich text editing capabilities

### Analytics & Insights
- **Content Statistics**: Overview of your content library
- **Performance Metrics**: Track content creation and usage
- **Content Analysis**: AI-powered content optimization suggestions

### Modern User Interface
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Material-UI**: Beautiful, consistent interface components
- **Real-time Updates**: Live content updates and notifications
- **Intuitive Navigation**: Easy-to-use sidebar navigation

## 🏗️ Architecture

```
content_creator_agent/
├── backend/                 # Node.js/Express API
│   ├── routes/
│   │   ├── ai.js           # AI content generation endpoints
│   │   └── content.js      # Content management endpoints
│   ├── uploads/            # File upload directory
│   ├── server.js           # Main server file
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API communication
│   │   └── App.js          # Main app component
│   └── package.json
└── README.md
```

## 🛠️ Technology Stack

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **OpenAI API**: AI content generation
- **Multer**: File upload handling
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security headers

### Frontend
- **React**: UI library
- **Material-UI**: Component library
- **React Router**: Navigation
- **Axios**: HTTP client
- **React Markdown**: Markdown rendering

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd content_creator_agent
```

### 2. Set Up Backend
```bash
cd backend
npm install
cp env.example .env
```

Edit `.env` file and add your OpenAI API key:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Set Up Frontend
```bash
cd ../frontend
npm install
```

Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

### 4. Access the Application
Open your browser and navigate to `http://localhost:3000`

## 📖 Usage

### Generating Content
1. Navigate to the "Content Generator" page
2. Enter your prompt describing the content you want
3. Select content type (blog, social, email, ad)
4. Choose tone and length
5. Click "Generate Content"
6. Review and save your generated content

### Managing Content
1. Use the "Content Library" to view all your content
2. Search and filter content by type, tags, or keywords
3. Edit existing content or create new content manually
4. Organize content with tags and metadata

### Dashboard Overview
- View content statistics and recent activity
- Quick access to common actions
- Monitor your content creation progress

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key_here
CORS_ORIGIN=http://localhost:3000
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### API Endpoints

#### AI Content Generation
- `POST /api/ai/generate` - Generate content
- `POST /api/ai/generate-variations` - Generate multiple variations
- `POST /api/ai/analyze` - Analyze content

#### Content Management
- `GET /api/content` - Get all content
- `POST /api/content` - Create content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content
- `POST /api/content/upload` - Upload files

## 🎯 Content Types

### Blog Posts
- Informative, engaging, and SEO-friendly content
- Perfect for articles, tutorials, and thought leadership

### Social Media Posts
- Catchy, shareable content within platform limits
- Optimized for engagement and virality

### Email Campaigns
- Professional, clear, and compelling email content
- Designed for conversion and engagement

### Advertising Copy
- Persuasive and action-oriented content
- Focused on driving conversions and sales

## 🔍 Content Analysis

The AI can analyze your content for:
- **SEO Optimization**: Improve search engine rankings
- **Readability**: Enhance content clarity and flow
- **Engagement**: Increase reader interaction
- **Tone**: Ensure consistent brand voice

## 📁 File Upload

Supported file types:
- **Images**: JPEG, JPG, PNG, GIF
- **Documents**: PDF, DOC, DOCX, TXT

Maximum file size: 10MB (configurable)

## 🚀 Deployment

### Backend Deployment
1. Set environment variables for production
2. Build the application: `npm run build`
3. Deploy to your preferred hosting service

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Configure environment variables for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the documentation in the `backend/README.md` and `frontend/README.md` files
2. Review the API documentation
3. Open an issue on GitHub
4. Contact the development team

## 🔮 Roadmap

- [ ] User authentication and authorization
- [ ] Content templates and presets
- [ ] Advanced analytics and reporting
- [ ] Content scheduling and publishing
- [ ] Integration with social media platforms
- [ ] Multi-language support
- [ ] Content collaboration features
- [ ] Advanced AI models and customization

## 🙏 Acknowledgments

- OpenAI for providing the GPT-4 API
- Material-UI for the beautiful component library
- The React and Node.js communities for excellent documentation and tools

---

**Happy Content Creating! 🎉** 