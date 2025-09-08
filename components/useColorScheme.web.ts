/**
 * @fileoverview Color scheme hook for web platform
 * @author Your Name
 * @version 1.0.0
 */

// NOTE: The default React Native styling doesn't support server rendering.
// Server rendered styles should not change between the first render of the HTML
// and the first render on the client. Typically, web developers will use CSS media queries
// to render different styles on the client and server, these aren't directly supported in React Native
// but can be achieved using a styling library like Nativewind.

/**
 * Hook to get the current color scheme for web platform
 * Returns 'light' by default for web to avoid hydration issues
 * @returns {'light'} Always returns 'light' for web platform
 */
export function useColorScheme() {
  return "light";
}
