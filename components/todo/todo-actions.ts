"use client";

import { supabase } from "@/lib/supabase";
import { Todo } from "@/types/database";
import { useError } from "@/hooks/use-error";
import { useCallback } from "react";

export function useTodoActions() {
  const { showError } = useError();

  const addTodo = useCallback(async (title: string) => {
    try {
      if (!title.trim()) {
        throw new Error("Todo title cannot be empty");
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("You must be signed in to add todos");
      }

      const { error } = await supabase.from("todos").insert([
        {
          title: title.trim(),
          user_id: user.id,
        },
      ]);

      if (error) throw error;
      return true;
    } catch (error: any) {
      showError(error.message);
      return false;
    }
  }, [showError]);

  const updateTodo = useCallback(async (id: string, updates: Partial<Todo>) => {
    try {
      const { error } = await supabase
        .from("todos")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (error: any) {
      showError(error.message);
      return false;
    }
  }, [showError]);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (error: any) {
      showError(error.message);
      return false;
    }
  }, [showError]);

  return { addTodo, updateTodo, deleteTodo };
}