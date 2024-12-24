"use client";

import { useError } from "./use-error";

export function useAuthError() {
  const { showError } = useError();

  const handleAuthError = (error: any) => {
    // Map common Supabase auth errors to user-friendly messages
    if (error.code) {
      error.message = error.code
    }
    const errorMessage = (() => {
      const message = error.message.toLowerCase();
      
      if (message.includes("invalid login credentials")) {
        return "Invalid email or password. Please try again.";
      }
      if (message.includes("email already registered")) {
        return "This email is already registered. Please sign in instead.";
      }
      if (message.includes("invalid email")) {
        return "Please enter a valid email address.";
      }
      if (message.includes("weak password")) {
        return "Password is too weak. Please use at least 6 characters with a mix of letters and numbers.";
      }
      
      // Return original message if no specific mapping
      return error.message;
    })();

    showError(errorMessage);
  };

  return { handleAuthError };
}