"use client";

import { useToast } from "./use-toast";

export function useError() {
  const { toast } = useToast();

  const showError = (error: Error | string) => {
    const message = error instanceof Error ? error.message : error;
    
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  };

  return { showError };
}