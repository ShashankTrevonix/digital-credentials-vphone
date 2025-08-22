# VPhone SIM Purchase - Digital ID Verification

A secure, contactless SIM card purchase application that uses Verifiable Credentials and digital identity verification through the PingOne platform.

## Overview

This application implements the complete SIM card purchasing flow using digital identity verification as specified in the use case:

1. **User enters VPhone portal** and requests to purchase a new SIM card
2. **QR code generation** for mobile app interaction
3. **Deep link redirect** to NatWest mobile app
4. **Biometric verification** in the NatWest app
5. **VC selection and consent** for sharing identity information
6. **Verification and completion** of SIM purchase

## Features

- **Secure Digital Identity Verification**: Uses PingOne APIs for secure authentication
- **QR Code Generation**: Secure QR codes for mobile device interaction
- **Real-time Progress Tracking**: Visual workflow showing each step of the verification process
- **Responsive Design**: Works seamlessly across all device sizes
- **Modern UI/UX**: Beautiful interface with smooth animations using Framer Motion

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **State Management**: React hooks
- **API Integration**: PingOne OAuth2 + Digital Identity APIs

## Architecture

The application follows a clean, modular architecture:

```
├── app/                    # Next.js App Router
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── SimPurchase.tsx   # Main verification interface
├── lib/                  # API utilities and configuration
│   ├── api.ts           # PingOne API integration
│   └── config.ts        # API configuration
├── types/                # TypeScript type definitions
└── styles/               # Global CSS and Tailwind
```

## Implementation Flow

### 1. Access Token Retrieval
- Authenticates with PingOne using client credentials
- Obtains access token for API operations
- Implements token caching and expiry management

### 2. Presentation Request Creation
- Creates secure presentation requests
- Generates QR codes for mobile app interaction
- Implements OpenID4VP standards

### 3. Verification Status Polling
- Real-time status monitoring
- Configurable polling intervals
- Timeout protection and error handling

### 4. Credential Data Processing
- Retrieves verification data
- Flattens complex credential structures
- Extracts user information for SIM activation

### 5. User Experience
- Step-by-step verification flow
- Progress indicators and status updates
- Error handling with user-friendly messages

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sim-purchase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file with your PingOne credentials:
   ```env
   NEXT_PUBLIC_PINGONE_CLIENT_ID=your_client_id
   NEXT_PUBLIC_PINGONE_CLIENT_SECRET=your_client_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Configuration

### API Settings
The application is configured to work with PingOne's EU environment:
- **Base URL**: `https://auth.pingone.eu`
- **Environment ID**: `fd4cecf9-f6b6-45da-a0c3-2f8af9874182`
- **Authentication**: Client Credentials OAuth2 flow

### Polling Configuration
- **Interval**: 2 seconds between status checks
- **Max Attempts**: 30 attempts (1 minute timeout)
- **Request Timeout**: 10 seconds per API call

## Usage

### For End Users
1. Click "Start Verification" button
2. Scan the displayed QR code with your NatWest mobile app
3. Complete biometric verification in the app
4. Select and consent to share required credentials
5. Wait for verification completion
6. Receive confirmation of successful SIM purchase

### For Developers
The main component `SimPurchase` accepts an optional callback:
```tsx
<SimPurchase 
  onComplete={(userData) => {
    // Handle successful verification
    console.log('User verified:', userData);
  }} 
/>
```

## Security Features

- **OAuth2 Authentication**: Secure token-based authentication
- **Request Timeouts**: Protection against hanging API calls
- **Error Sanitization**: Safe error messages for users
- **Credential Management**: Centralized API configuration
- **Secure QR Codes**: Encrypted deep links for mobile app interaction

## Error Handling

The application implements comprehensive error handling:
- Network failures and timeouts
- Authentication errors
- Verification failures
- User-friendly error messages
- Graceful fallbacks and retry mechanisms

## Future Enhancements

- **PingDaVinci Integration**: Advanced QR code features
- **Multi-language Support**: Internationalization
- **Analytics Dashboard**: User behavior tracking
- **Admin Interface**: Verification management
- **Mobile App**: Native mobile experience
- **Webhook Support**: Real-time status updates

## Contributing

1. Follow the established code structure and patterns
2. Use TypeScript strict mode
3. Implement proper error handling
4. Add tests for new functionality
5. Update documentation as needed

## License

This project is licensed under the MIT License.

## Support

For technical support or questions about the implementation:
- Check the documentation
- Review the code comments
- Contact the development team

## Acknowledgments

This implementation is based on the digital credentials hotel check-in system and adapted for SIM card purchasing use cases. It demonstrates best practices for secure digital identity verification in e-commerce applications.
