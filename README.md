# GameOn 🎮 - Game Catalogue Web Application

## Overview
Gameon is a comprehensive game catalogue web application powered by the RAWG API, built using the MERN (MongoDB, Express, React, Node.js) stack.

## Live Demo
🌐 [Gameoon Web App](https://gameoon.vercel.app)

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB account

## Installation

### Backend Setup
1. Clone the repository
```bash
git clone <your-repository-url>
cd gameon
```

2. Install backend dependencies
```bash
npm install
```

3. Create `.env` file in the root directory with the following configurations:
```
GOOGLE_CLIENT_ID=[REDACTED]
GOOGLE_SECRET=[REDACTED]
GITHUB_CLIENT_ID=[REDACTED]
GITHUB_SECRET=[REDACTED]
JWT_SECRET=[REDACTED]
API_KEY=[REDACTED]
MONGO_URI=[REDACTED]
PORT=8000
```

### Frontend Setup
1. Navigate to frontend directory
```bash
cd frontend
npm install
```

### Running the Application

#### Development Mode
```bash
# Backend
cd backend
npm install 
node server.js

# Frontend
cd frontend
npm install
npm run dev
```

## Technologies Used
- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT, Google OAuth, GitHub OAuth
- API: RAWG Game Database API

## Environment Variables
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_SECRET`: Google OAuth client secret
- `GITHUB_CLIENT_ID`: GitHub OAuth client ID
- `GITHUB_SECRET`: GitHub OAuth client secret
- `JWT_SECRET`: JSON Web Token secret
- `API_KEY`: RAWG API key
- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port number

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License.
