# Clerk Authentication Demo - Expo React Native App

A complete React Native application demonstrating **headless Clerk authentication** implementation with custom UI components, email verification, and comprehensive error handling.

## 🚀 Features

### 🔐 Authentication Features
- **Custom Sign-In Screen** - Email/password authentication with error handling
- **Custom Sign-Up Screen** - User registration with first/last name fields
- **Email Verification** - Complete verification flow with code input
- **Forgot Password** - Password reset via email with confirmation flow
- **Change Password** - Secure password update for authenticated users
- **Secure Token Storage** - Uses Expo SecureStore for token persistence
- **Automatic Routing** - Smart navigation based on authentication state
- **Error Handling** - User-friendly error messages for all authentication flows

### 📱 User Interface
- **Home Screen** - Personalized welcome with user information
- **Profile Screen** - Detailed user account information and status
- **Loading States** - Visual feedback during authentication processes
- **Responsive Design** - Clean, modern UI with proper styling
- **Navigation** - Tab-based navigation with proper authentication guards

### 🛡️ Security Features
- **Secure Token Caching** - Encrypted storage using Expo SecureStore
- **Session Management** - Automatic session handling and renewal
- **Input Validation** - Client-side validation with server-side verification
- **Error Boundaries** - Graceful error handling throughout the app

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Expo CLI** (`npm install -g @expo/cli`)
- **iOS Simulator** (for iOS development) or **Android Studio** (for Android development)
- **Clerk Account** - Sign up at [clerk.com](https://clerk.com)

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd my-clerk-app
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Install Required Expo Dependencies
```bash
npx expo install expo-local-authentication expo-auth-session
```

## ⚙️ Configuration

### 1. Set Up Clerk Dashboard

1. **Create a Clerk Account** at [clerk.com](https://clerk.com)
2. **Create a New Application** in your Clerk dashboard
3. **Enable Native API** in your application settings
4. **Copy your Publishable Key** from the API Keys section

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# .env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

**Important:** Replace `pk_test_your_publishable_key_here` with your actual Clerk publishable key.

### 3. Update app.json

Ensure your `app.json` includes the required plugins:

```json
{
  "expo": {
    "plugins": [
      "expo-local-authentication"
    ]
  }
}
```

## 🚀 Running the Application

### Development Mode
```bash
# Start the development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android
```

### Clear Cache (if needed)
```bash
npx expo start --clear
```

## 📱 Application Flow

### 1. **Initial Load**
- App checks for existing authentication session
- Redirects to appropriate screen based on auth state

### 2. **Sign-Up Process**
1. User enters first name, last name, email, and password
2. App creates account with Clerk
3. Verification email is sent automatically
4. User enters verification code
5. Account is activated and user is signed in

### 3. **Sign-In Process**
1. User enters email and password
2. App validates credentials with Clerk
3. On success, user is redirected to main app
4. On failure, user-friendly error is displayed

### 4. **Forgot Password Process**
1. User clicks "Forgot Password?" on sign-in screen
2. User enters email address
3. Password reset email is sent
4. User follows email instructions to reset password

### 5. **Change Password Process**
1. User navigates to Profile screen
2. User clicks "Change Password" button (opens modal)
3. User enters current password and new password
4. Password is updated securely through Clerk
5. Modal closes automatically after successful update

### 6. **Main Application**
- **Home Tab**: Personalized welcome with user information
- **Profile Tab**: Detailed account information, change password, and sign-out options

## 🏗️ Project Structure

```
my-clerk-app/
├── app/
│   ├── _layout.tsx          # Root layout with ClerkProvider
│   ├── sign-in.tsx          # Custom sign-in screen
│   ├── sign-up.tsx          # Custom sign-up screen
│   ├── forgot-password.tsx  # Password reset screen
│   ├── change-password.tsx  # Change password screen
│   └── (tabs)/
│       ├── _layout.tsx      # Tab navigation layout
│       ├── index.tsx        # Home screen
│       └── two.tsx          # Profile screen
├── components/
│   ├── SignOutButton.tsx    # Custom sign-out component
│   ├── useColorScheme.ts    # Color scheme hook
│   ├── useColorScheme.web.ts
│   ├── useClientOnlyValue.ts
│   └── useClientOnlyValue.web.ts
├── assets/                  # App icons and fonts
├── package.json
├── app.json
└── README.md
```

## 🔧 Key Components

### `app/_layout.tsx`
- **ClerkProvider** setup with secure token caching
- **Authentication routing** logic
- **Splash screen** management
- **Error boundary** configuration

### `app/sign-in.tsx`
- **Custom sign-in form** with email/password fields
- **Error handling** with user-friendly messages
- **Loading states** during authentication
- **Input validation** and disabled states

### `app/sign-up.tsx`
- **Registration form** with first/last name fields
- **Email verification** flow with code input
- **Error handling** for account creation and verification
- **Loading states** for all operations

### `app/forgot-password.tsx`
- **Password reset form** with email input
- **Email confirmation** flow with success message
- **Error handling** for reset email sending
- **Loading states** during reset process

### `app/change-password.tsx`
- **Password change form** with current and new password fields
- **Password validation** and confirmation
- **Error handling** for password update
- **Modal presentation** with automatic close after success

### `components/SignOutButton.tsx`
- **Custom sign-out** functionality
- **Automatic redirect** to sign-in screen
- **Error handling** for sign-out process

## 🎨 Customization

### Styling
All components use StyleSheet for consistent styling. You can customize:
- **Colors** - Update color schemes in component styles
- **Typography** - Modify font sizes and weights
- **Layout** - Adjust spacing and component positioning

### Error Messages
Error handling is implemented throughout the app with:
- **User-friendly messages** instead of technical errors
- **Visual error containers** with red styling
- **Loading states** to prevent multiple submissions

### Authentication Flow
The authentication flow can be customized by:
- **Modifying form fields** in sign-up/sign-in screens
- **Adding additional validation** rules
- **Customizing redirect** behavior after authentication

## 🐛 Troubleshooting

### Common Issues

1. **"Missing Clerk Publishable Key" Error**
   - Ensure `.env` file exists with correct key
   - Restart Expo development server
   - Check key format: `pk_test_...` or `pk_live_...`

2. **"Native API is disabled" Error**
   - Enable Native API in Clerk Dashboard
   - Ensure you're using the correct application instance

3. **App Stuck on Loading Screen**
   - Check internet connection
   - Verify Clerk publishable key is correct
   - Clear Expo cache: `npx expo start --clear`

4. **Verification Code Not Working**
   - Check email spam folder
   - Ensure code is entered correctly
   - Try requesting a new verification email

### Debug Mode
Enable debug logging by adding console.log statements in:
- `app/_layout.tsx` - Authentication state changes
- `app/sign-in.tsx` - Sign-in process
- `app/sign-up.tsx` - Registration and verification

## 📚 Dependencies

### Core Dependencies
- **@clerk/clerk-expo** - Clerk authentication for Expo
- **expo-router** - File-based routing
- **expo-secure-store** - Secure token storage
- **expo-splash-screen** - Splash screen management

### Required Peer Dependencies
- **expo-local-authentication** - Biometric authentication support
- **expo-auth-session** - OAuth and authentication sessions

## 🔒 Security Considerations

- **Token Storage** - Uses Expo SecureStore for encrypted token storage
- **Environment Variables** - Sensitive keys stored in `.env` file
- **Input Validation** - Both client and server-side validation
- **Error Handling** - No sensitive information exposed in error messages

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Created by Aaron K. Saunders

- 🎥 [YouTube Channel](https://www.youtube.com/channel/UCMCcqbJpyL3LAv3PJeYz2bg/)
- 🐦 [Twitter](https://x.com/aaronksaunders)
- 💼 [LinkedIn](https://www.linkedin.com/in/aaronksaunders/)
- 🌐 [GitHub](https://github.com/aaronksaunders)

---

**Built with ❤️ using Expo, React Native, and Clerk Authentication**
