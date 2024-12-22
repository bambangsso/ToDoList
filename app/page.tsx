"use client";

import { useEffect, useState } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { TodoList } from "@/components/todo/todo-list";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          {user ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Todo List</h1>
                <Button
                  variant="ghost"
                  onClick={() => supabase.auth.signOut()}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
              <ErrorBoundary>
                <TodoList />
              </ErrorBoundary>
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-[80vh]">
              <ErrorBoundary>
                <AuthForm />
              </ErrorBoundary>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}