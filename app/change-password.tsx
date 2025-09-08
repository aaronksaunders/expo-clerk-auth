/**
 * @fileoverview Change password screen for authenticated users
 * @author Your Name
 * @version 1.0.0
 */

import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

/**
 * Change password screen component for authenticated users
 * Allows users to update their password with current password verification
 * @returns {JSX.Element} The change password form UI
 */
export default function ChangePasswordScreen() {
  const { user } = useUser();
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles the password change process with validation and error handling
   * Updates the user's password after verifying the current password
   * @returns {Promise<void>}
   */
  const onChangePasswordPress = async () => {
    if (!user) return;

    // Validate inputs
    if (!currentPassword.trim()) {
      setError("Please enter your current password");
      return;
    }

    if (!newPassword.trim()) {
      setError("Please enter a new password");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Update password using Clerk's user.updatePassword method
      await user.updatePassword({
        currentPassword,
        newPassword,
      });

      // Clear form and navigate back
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");

      // Navigate back to profile after successful password change
      router.back();
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));

      // Handle specific Clerk errors
      if (err.errors && err.errors.length > 0) {
        const errorMessage = err.errors[0].longMessage || err.errors[0].message;
        setError(errorMessage);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError(
          "An error occurred while changing password. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.subtitle}>
        Enter your current password and choose a new password.
      </Text>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <TextInput
        value={currentPassword}
        placeholder="Current password..."
        secureTextEntry
        onChangeText={setCurrentPassword}
        style={styles.input}
        editable={!isLoading}
        autoComplete="current-password"
      />

      <TextInput
        value={newPassword}
        placeholder="New password..."
        secureTextEntry
        onChangeText={setNewPassword}
        style={styles.input}
        editable={!isLoading}
        autoComplete="new-password"
      />

      <TextInput
        value={confirmPassword}
        placeholder="Confirm new password..."
        secureTextEntry
        onChangeText={setConfirmPassword}
        style={styles.input}
        editable={!isLoading}
        autoComplete="new-password"
      />

      <Text style={styles.passwordHint}>
        Password must be at least 8 characters long
      </Text>

      <Button
        title={isLoading ? "Updating..." : "Update Password"}
        onPress={onChangePasswordPress}
        disabled={
          isLoading ||
          !currentPassword.trim() ||
          !newPassword.trim() ||
          !confirmPassword.trim()
        }
        style={styles.button}
      />

      <Pressable
        onPress={() => router.back()}
        disabled={isLoading}
        style={styles.cancelButton}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
    justifyContent: "center",
    minHeight: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
    lineHeight: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "white",
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    borderColor: "#f44336",
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
  },
  errorText: {
    color: "#f44336",
    fontSize: 14,
    textAlign: "center",
  },
  passwordHint: {
    fontSize: 12,
    color: "#888",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginBottom: 20,
  },
  cancelButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
  },
});
