import React from 'react';
import { AuthForm } from "@/components/auth/auth-form";
import { TodoList } from "@/components/todo/todo-list";
import { ErrorBoundary } from "@/components/error-boundary";
import getUserSession  from '@/lib/supabase/getsession';
import SignOutButton from './signout-button'

 const Home = async () => {
    const { data } = await getUserSession();
    console.log('---> ', data)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          {data.session ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Todo List</h1>
                <SignOutButton />
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

export default Home;