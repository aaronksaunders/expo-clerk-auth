/**
 * @fileoverview Home screen displaying user information and sign-out functionality
 * @author Your Name
 * @version 1.0.0
 */

// app/(tabs)/index.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import SignOutButton from "../../components/SignOutButton";

/**
 * Home screen component that displays user information and provides sign-out functionality
 * Shows personalized greeting with user's name and email address
 * @returns {JSX.Element} The home screen UI with user information
 */
export default function HomeScreen() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.userInfo}>
        Hello, {user?.firstName || user?.fullName || "User"}!
      </Text>
      <Text style={styles.userEmail}>
        {user?.primaryEmailAddress?.emailAddress}
      </Text>
      <View style={styles.separator} />
      <SignOutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "600",
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: "#eee",
  },
});
