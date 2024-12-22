"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface AuthProvidersProps {
  isLoading: boolean;
  onGoogleSignIn: () => Promise<void>;
}

export function AuthProviders({ isLoading, onGoogleSignIn }: AuthProvidersProps) {
  return (
    <div className="grid gap-2">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={onGoogleSignIn}
        className="w-full"
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
    </div>
  );
}