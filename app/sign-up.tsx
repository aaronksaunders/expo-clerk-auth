// app/sign-up.tsx
/**
 * @fileoverview Custom sign-up screen with email verification and error handling
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
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";

/**
 * Sign-up screen component with custom UI, email verification, and error handling
 * Provides user registration with first/last name fields and email verification flow
 * @returns {JSX.Element} The sign-up form UI with verification step
 */
export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setError("");
    setIsLoading(true);

    try {
      // Create the user on Clerk with first and last name
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });

      // Send verification email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Move to the verification screen
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));

      // Handle specific Clerk errors
      if (err.errors && err.errors.length > 0) {
        const errorMessage = err.errors[0].longMessage || err.errors[0].message;
        setError(errorMessage);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("An error occurred during sign-up. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    setError("");
    setIsLoading(true);

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/(tabs)");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setError("Verification incomplete. Please try again.");
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));

      // Handle specific Clerk errors
      if (err.errors && err.errors.length > 0) {
        const errorMessage = err.errors[0].longMessage || err.errors[0].message;
        setError(errorMessage);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {!pendingVerification && (
        <>
          <Text style={styles.title}>Sign Up</Text>

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <TextInput
            value={firstName}
            placeholder="First Name..."
            onChangeText={setFirstName}
            style={styles.input}
            editable={!isLoading}
          />
          <TextInput
            value={lastName}
            placeholder="Last Name..."
            onChangeText={setLastName}
            style={styles.input}
            editable={!isLoading}
          />
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={setEmailAddress}
            style={styles.input}
            editable={!isLoading}
          />
          <TextInput
            value={password}
            placeholder="Password..."
            secureTextEntry
            onChangeText={setPassword}
            style={styles.input}
            editable={!isLoading}
          />
          <Button
            title={isLoading ? "Creating Account..." : "Sign Up"}
            onPress={onSignUpPress}
            disabled={isLoading}
          />
          <Link href="/sign-in" asChild>
            <Pressable style={styles.link} disabled={isLoading}>
              <Text style={styles.linkText}>Have an account? Sign In</Text>
            </Pressable>
          </Link>
        </>
      )}

      {pendingVerification && (
        <>
          <Text style={styles.title}>Verify Email</Text>
          <Text style={styles.subtitle}>
            Enter the verification code sent to {emailAddress}
          </Text>

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <TextInput
            value={code}
            placeholder="Verification Code..."
            onChangeText={setCode}
            style={styles.input}
            editable={!isLoading}
            keyboardType="number-pad"
          />
          <Button
            title={isLoading ? "Verifying..." : "Verify Email"}
            onPress={onPressVerify}
            disabled={isLoading}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
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
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
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
  link: { marginTop: 10, alignItems: "center" },
  linkText: {
    color: "#007AFF",
    fontSize: 16,
  },
});
