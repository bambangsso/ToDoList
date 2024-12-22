"use client";

import { useToast } from "./use-toast";

export function useAuthFeedback() {
  const { toast } = useToast();

  const showSuccess = (message: string) => {
    toast({
      title: "Success",
      description: message,
      variant: "default",
    });
  };

  return { showSuccess };
}