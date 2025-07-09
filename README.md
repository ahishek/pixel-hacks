# Pixel Play | Credit Card Token Management System

A full-stack web application for managing credit card tokens across multiple merchant applications. This system allows users to securely store their credit card information and create digital tokens that can be used for payments at various merchant applications without exposing the actual card details.

## 🚀 Features

### Core Functionality
- **Credit Card Management**: View and manage credit card details securely
- **Token Creation**: Create digital tokens for merchant applications
- **Push Provisioning**: Automatically provision tokens to selected merchant apps
- **Token Management**: Enable/disable tokens, view usage history, and manage permissions
- **Transaction History**: Track payment transactions and token usage

### Security Features
- **Token-based Authentication**: Secure token management without exposing card details
- **Merchant App Control**: Granular control over which apps can access payment tokens
- **Status Management**: Enable/disable tokens with real-time status updates
- **Usage Tracking**: Monitor token usage and last activity

### User Experience
- **Modern UI**: Beautiful gradient design with smooth animations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Live status updates and progress indicators
- **Intuitive Navigation**: Clear flow from card details to token management

## 🏗️ Architecture

### Backend (FastAPI + MongoDB)
```
backend/
├── server.py              # Main FastAPI application
├── routes/                # API route handlers
│   ├── cards.py          # Card management endpoints
│   ├── tokens.py         # Token management endpoints
│   └── push_provisioning.py # Push provisioning workflow
├── models/               # Pydantic data models
│   └── token_models.py   # Token and card data models
├── services/             # Business logic services
│   ├── visa_service.py   # Visa TMS integration (mock)
│   └── mock_data.py      # Mock data for development
└── requirements.txt      # Python dependencies
```

### Frontend (React + Tailwind CSS)
```
frontend/
├── src/
│   ├── pages/           # Application pages
│   │   ├── CCDetails.jsx           # Credit card overview
│   │   ├── MerchantApps.jsx        # Merchant app selection
│   │   ├── LoadingTransition.jsx   # Progress animation
│   │   ├── SuccessState.jsx        # Success confirmation
│   │   └── ManageTokens.jsx        # Token management
│   ├── components/      # Reusable UI components
│   │   ├── CreditCard.jsx          # Credit card display
│   │   ├── TransactionHistory.jsx  # Transaction list
│   │   └── ui/                     # Shadcn/ui components
│   ├── services/        # API integration
│   │   ├── api.js                  # Backend API client
│   │   └── mockApi.js              # Mock API for development
│   └── data/           # Static data
│       └── mock.js                 # Mock merchant apps
└── package.json         # Node.js dependencies
```

## 🛠️ Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **MongoDB**: NoSQL database for storing card and token data
- **Motor**: Async MongoDB driver for Python
- **Pydantic**: Data validation and serialization
- **Uvicorn**: ASGI server for running FastAPI

### Frontend
- **React**: JavaScript library for building user interfaces
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Beautiful, accessible UI components
- **Lucide React**: Icon library
- **Axios**: HTTP client for API calls

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Python 3.9+**
- **Node.js 16+**
- **npm** or **yarn**
- **MongoDB** (optional - the app works with mock data)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd pixel-hacks
```

### 2. Backend Setup

#### Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### Start the Backend Server
```bash
python3 -m uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at: http://localhost:8000

### 3. Frontend Setup

#### Install Node.js Dependencies
```bash
cd frontend
npm install
```

#### Start the Frontend Development Server
```bash
npm start
```

The frontend will be available at: http://localhost:3000

## 📖 API Documentation

### Backend Endpoints

#### Card Management
- `GET /api/cards/details` - Get credit card details
- `GET /api/cards/transactions` - Get transaction history

#### Token Management
- `GET /api/tokens` - List user tokens
- `PUT /api/tokens/{tokenId}` - Update token status
- `DELETE /api/tokens/{tokenId}` - Delete token

#### Push Provisioning
- `POST /api/push-provisioning` - Create push provisioning request
- `GET /api/push-provisioning/status/{requestId}` - Get provisioning status
- `GET /api/push-provisioning/merchants` - Get available merchants

### Interactive API Documentation
Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🎯 Application Flow

### 1. Credit Card Overview (`/cc-details`)
- View credit card information
- Check transaction history
- Access token management features

### 2. Merchant App Selection (`/merchant-apps`)
- Browse available merchant applications
- Select apps for token provisioning
- Review app descriptions and permissions

### 3. Push Provisioning (`/loading-transition`)
- Animated progress through token creation
- Real-time status updates
- Secure token generation process

### 4. Success Confirmation (`/success-state`)
- Confirm successful token creation
- View newly created tokens
- Navigate to token management

### 5. Token Management (`/manage-tokens`)
- View all saved tokens
- Enable/disable tokens
- Monitor token usage and status
- Manage merchant app permissions

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017
DB_NAME=credit_card_tokens

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000

# CORS Settings
ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend Configuration

The frontend automatically connects to the backend at `http://localhost:8000`. To change this, update the `API_BASE_URL` in `frontend/src/services/api.js`.

## 🧪 Development

### Running Tests
```bash
# Backend tests
cd backend
python backend_test.py

# Frontend tests (if configured)
cd frontend
npm test
```

### Mock Data
The application uses mock data for development. You can modify the mock data in:
- `backend/services/mock_data.py` - Backend mock data
- `frontend/src/data/mock.js` - Frontend mock data

### Adding New Features
1. **Backend**: Add new routes in `backend/routes/`
2. **Frontend**: Create new components in `frontend/src/components/`
3. **Models**: Update Pydantic models in `backend/models/`
4. **Services**: Add business logic in `backend/services/`

## 🚀 Deployment

### Backend Deployment
```bash
# Install production dependencies
pip install -r requirements.txt

# Run with production server
uvicorn server:app --host 0.0.0.0 --port 8000
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Serve static files
npx serve -s build
```

## 🔒 Security Considerations

- **Token Security**: Tokens are generated securely and never expose actual card details
- **CORS Configuration**: Properly configured CORS for production
- **Input Validation**: All inputs are validated using Pydantic models
- **Error Handling**: Comprehensive error handling and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

#### Backend Issues
- **Import Errors**: Ensure you're in the correct directory and all dependencies are installed
- **Port Conflicts**: Change the port in the uvicorn command if 8000 is in use
- **MongoDB Connection**: The app works with mock data, so MongoDB is optional

#### Frontend Issues
- **Dependency Issues**: Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- **Port Conflicts**: The app will prompt to use a different port if 3000 is occupied
- **Build Errors**: Ensure all dependencies are compatible

#### Network Issues
- **CORS Errors**: Check that the backend CORS configuration matches your frontend URL
- **API Connection**: Verify the API base URL in the frontend configuration

### Getting Help
- Check the browser console for frontend errors
- Check the terminal for backend error messages
- Ensure both servers are running simultaneously
- Verify all dependencies are properly installed

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/docs` when the backend is running
- Review the console logs for detailed error messages

---

**Note**: This is a demonstration application with mock data. In a production environment, you would need to integrate with real payment processors and implement proper security measures.
