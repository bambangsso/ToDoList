"use client";

import { signOut } from "@/components/auth/actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <Button
      variant="ghost"
      onClick={async () => {
        await signOut();
      }}
    >
      <LogOut className="h-4 w-4 mr-2" />
      Sign Out
    </Button>
  );
}