/**
 * @fileoverview Root layout component with Clerk authentication provider setup
 * @author Your Name
 * @version 1.0.0
 */

// app/_layout.tsx
import React, { useEffect } from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { ActivityIndicator, View, Text } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

/**
 * Token cache helper for secure storage of Clerk authentication tokens
 * Uses Expo SecureStore for secure token persistence across app sessions
 */
const tokenCache = {
  /**
   * Retrieves a stored token from secure storage
   * @param {string} key - The key to retrieve the token for
   * @returns {Promise<string | null>} The stored token or null if not found
   */
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  /**
   * Saves a token to secure storage
   * @param {string} key - The key to store the token under
   * @param {string} value - The token value to store
   * @returns {Promise<void>}
   */
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

/**
 * Initial layout component that handles authentication routing
 * Manages navigation between authenticated and unauthenticated screens
 * @returns {JSX.Element} The appropriate screen based on authentication state
 */
const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Hide the splash screen once everything is loaded
  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  /**
   * Effect to handle authentication-based routing
   * Redirects users to appropriate screens based on their authentication state
   */
  useEffect(() => {
    // Wait for Clerk to load before acting
    if (!isLoaded) {
      return;
    }
    const inTabsGroup = segments[0] === "(tabs)";
    const inAuthScreens =
      segments[0] === "sign-in" ||
      segments[0] === "sign-up" ||
      segments[0] === "forgot-password";
    const inAccountScreens = segments[0] === "change-password";

    if (isSignedIn) {
      // If signed in and on auth screens, push to main app
      if (inAuthScreens) {
        router.replace("/(tabs)");
        return;
      }
      // Allow tabs and account screens like change-password; otherwise go to tabs
      if (!inTabsGroup && !inAccountScreens) {
        router.replace("/(tabs)");
      }
    } else {
      // If signed out and in protected areas (tabs or account screens), go to sign-in
      if (inTabsGroup || inAccountScreens) {
        router.replace("/sign-in");
      }
    }
  }, [isLoaded, isSignedIn, segments, router]);

  // Show a loading indicator while Clerk is initializing
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen
        name="change-password"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Change Password",
          headerBackTitle: "Profile",
        }}
      />
    </Stack>
  );
};

/**
 * Root layout component that wraps the entire app with Clerk authentication provider
 * Provides authentication context and secure token storage to all child components
 * @returns {JSX.Element} The app wrapped with ClerkProvider
 */
export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
      // Configure for mobile platform
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: "#007AFF",
        },
      }}
    >
      <InitialLayout />
    </ClerkProvider>
  );
}
