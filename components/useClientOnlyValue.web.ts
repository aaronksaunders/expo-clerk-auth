/**
 * @fileoverview Client-only value hook for web platform with SSR support
 * @author Your Name
 * @version 1.0.0
 */

import React from "react";

// `useEffect` is not invoked during server rendering, meaning
// we can use this to determine if we're on the server or not.

/**
 * Hook that handles server-side rendering differences on web
 * Starts with server value during SSR, then switches to client value after hydration
 * @template S - Server value type
 * @template C - Client value type
 * @param {S} server - Server value (used during SSR)
 * @param {C} client - Client value (used after hydration)
 * @returns {S | C} Server value initially, then client value after hydration
 */
export function useClientOnlyValue<S, C>(server: S, client: C): S | C {
  const [value, setValue] = React.useState<S | C>(server);
  React.useEffect(() => {
    setValue(client);
  }, [client]);

  return value;
}
