"use client";

import { useState, useEffect, useCallback } from "react";
import { createWebClient } from "@/lib/supabase/client";
import { Todo } from "@/types/database";
import { useError } from "./use-error";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useError();

  const fetchTodos = useCallback(async () => {
   
    try {
      const supabase = await createWebClient();
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

    } finally {
      setIsLoading(false);
    }
    
  }, [showError]);

  useEffect(() => { 
    fetchTodos();

  }, [fetchTodos, showError]);

  return { todos, isLoading };
}