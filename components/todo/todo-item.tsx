"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Todo } from "@/types/database";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleUpdate = async () => {
    if (editedTitle.trim() === "") return;
    await onUpdate(todo.id, { title: editedTitle });
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={(checked) =>
          onUpdate(todo.id, { completed: checked as boolean })
        }
      />
      {isEditing ? (
        <Input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
          autoFocus
          className="flex-1"
        />
      ) : (
        <span
          className={`flex-1 ${
            todo.completed ? "line-through text-muted-foreground" : ""
          }`}
        >
          {todo.title}
        </span>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsEditing(!isEditing)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}