"use client";

import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { Form, TextField, Label, Input, FieldError, Button } from "@heroui/react";
import { useAuth } from "@/lib/auth/useAuth";
import { useUpdateUser } from "@/hooks/useUsers";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth();
  const updateUser = useUpdateUser(user?.id ?? "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (authLoading) return <LoadingSpinner />;
  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    try {
      await updateUser.mutateAsync({
        name,
        email,
        ...(password ? { password } : {}),
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Could not update profile");
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-xl text-accent">
          <FiUser />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold">My profile</h1>
          <span className="rounded-full bg-default/40 px-2 py-0.5 text-xs font-medium text-foreground/70">
            {user.role}
          </span>
        </div>
      </div>

      <Form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-surface p-6">
        <TextField name="name" isRequired defaultValue={user.name}>
          <Label className="text-sm font-medium">Name</Label>
          <Input />
          <FieldError className="text-xs text-danger" />
        </TextField>

        <TextField name="email" type="email" isRequired defaultValue={user.email}>
          <Label className="text-sm font-medium">Email</Label>
          <Input />
          <FieldError className="text-xs text-danger" />
        </TextField>

        <TextField name="password" minLength={0}>
          <Label className="text-sm font-medium">
            New password <span className="text-muted">(leave blank to keep current)</span>
          </Label>
          <Input type="password" placeholder="At least 6 characters" />
        </TextField>

        {error && <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">{error}</p>}
        {success && (
          <p className="rounded-lg bg-success/10 px-3 py-2 text-sm text-success">
            Profile updated successfully
          </p>
        )}

        <Button type="submit" className="w-full" isDisabled={updateUser.isPending}>
          {updateUser.isPending ? "Saving..." : "Save changes"}
        </Button>
      </Form>
    </div>
  );
}