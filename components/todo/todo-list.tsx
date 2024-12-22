"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { TodoItem } from "./todo-item";
import { useTodos } from "@/hooks/use-todos";
import { useTodoActions } from "./todo-actions";

export function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const { todos, isLoading } = useTodos();
  const { addTodo, updateTodo, deleteTodo } = useTodoActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await addTodo(newTodo);
    if (success) {
      setNewTodo("");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          placeholder="Add a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button type="submit">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </form>
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No todos yet. Add your first todo above!
          </p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}