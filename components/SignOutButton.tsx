/**
 * @fileoverview Custom sign-out button component with Clerk authentication
 * @author Your Name
 * @version 1.0.0
 */

// components/SignOutButton.tsx
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

/**
 * Sign-out button component that handles user logout
 * Uses Clerk's useClerk hook to sign out the current user and redirect to sign-in
 * @returns {JSX.Element} The sign-out button UI
 */
const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk();
  const router = useRouter();

  /**
   * Handles the sign-out process and redirects to sign-in screen
   * Uses Clerk's signOut function to end the user session
   * @returns {Promise<void>}
   */
  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      router.replace("/sign-in");
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Text>Sign out</Text>
    </TouchableOpacity>
  );
};

export default SignOutButton;
