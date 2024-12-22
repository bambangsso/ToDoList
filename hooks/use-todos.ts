"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Todo } from "@/types/database";
import { useError } from "./use-error";
import { RealtimeChannel } from "@supabase/supabase-js";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useError();

  const fetchTodos = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setTodos([]);
        return;
      }

      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq('user_id', user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (error: any) {
      showError(error.message);
      setTodos([]);
    }
  }, [showError]);

  useEffect(() => {
    let channel: RealtimeChannel | null = null;

    const setupSubscription = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setTodos([]);
          setIsLoading(false);
          return;
        }

        await fetchTodos();

        // Remove any existing subscription
        if (channel) {
          await channel.unsubscribe();
        }

        // Create a new subscription
        channel = supabase
          .channel(`todos-${user.id}`)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'todos',
              filter: `user_id=eq.${user.id}`,
            },
            async (payload) => {
              // Immediately fetch the latest data
              await fetchTodos();
            }
          )
          .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
              setIsLoading(false);
            }
          });

      } catch (error: any) {
        showError(error.message);
        setIsLoading(false);
      }
    };

    // Set up initial subscription
    setupSubscription();

    // Handle auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_IN') {
        await setupSubscription();
      } else if (event === 'SIGNED_OUT') {
        if (channel) {
          await channel.unsubscribe();
          channel = null;
        }
        setTodos([]);
      }
    });

    // Cleanup
    return () => {
      if (channel) {
        channel.unsubscribe();
      }
      subscription.unsubscribe();
    };
  }, [fetchTodos, showError]);

  return { todos, isLoading };
}