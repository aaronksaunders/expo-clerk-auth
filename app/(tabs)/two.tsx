/**
 * @fileoverview Profile screen displaying detailed user information and account status
 * @author Your Name
 * @version 1.0.0
 */

import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import SignOutButton from "../../components/SignOutButton";

/**
 * Profile screen component that displays comprehensive user information
 * Shows personal details, account status, and provides sign-out functionality
 * @returns {JSX.Element} The profile screen UI with user details
 */
export default function ProfileScreen() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>First Name:</Text>
          <Text style={styles.value}>{user?.firstName || "Not provided"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.value}>{user?.lastName || "Not provided"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.value}>{user?.fullName || "Not provided"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>
            {user?.primaryEmailAddress?.emailAddress || "Not provided"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{user?.username || "Not set"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>User ID:</Text>
          <Text style={styles.value}>{user?.id || "Not available"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Created:</Text>
          <Text style={styles.value}>
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "Not available"}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Status</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email Verified:</Text>
          <Text
            style={[
              styles.value,
              user?.emailAddresses?.[0]?.verification?.status === "verified"
                ? styles.verified
                : styles.unverified,
            ]}
          >
            {user?.emailAddresses?.[0]?.verification?.status === "verified"
              ? "Yes"
              : "No"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Last Sign In:</Text>
          <Text style={styles.value}>
            {user?.lastSignInAt
              ? new Date(user.lastSignInAt).toLocaleString()
              : "Not available"}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>

        <Pressable
          style={styles.actionButton}
          onPress={() => router.push("/change-password")}
        >
          <Text style={styles.actionButtonText}>Change Password</Text>
        </Pressable>

        <SignOutButton />
      </View>
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
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  section: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: "#333",
    flex: 2,
    textAlign: "right",
  },
  verified: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  unverified: {
    color: "#F44336",
    fontWeight: "600",
  },
  actionButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
