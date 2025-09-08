/**
 * @fileoverview Client-only value hook for native platforms
 * @author Your Name
 * @version 1.0.0
 */

// This function is web-only as native doesn't currently support server (or build-time) rendering.

/**
 * Hook that returns client value immediately on native platforms
 * Native apps don't have server-side rendering, so always returns client value
 * @template S - Server value type
 * @template C - Client value type
 * @param {S} server - Server value (unused on native)
 * @param {C} client - Client value to return
 * @returns {C} Always returns the client value on native
 */
export function useClientOnlyValue<S, C>(server: S, client: C): S | C {
  return client;
}
