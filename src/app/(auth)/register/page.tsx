"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Form, TextField, Label, Input, FieldError, Button } from "@heroui/react";
import { FiUserPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth/useAuth";

export default function RegisterPage() {
  const { register, login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      await register({ name, email, password });
      await login({ email, password });
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold">Create an account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Join the marketplace to shop and review products
          </p>
        </div>

        <Form
          onSubmit={handleSubmit}
          className="w-full space-y-4 rounded-2xl border border-border bg-surface p-6"
        >
          <TextField name="name" isRequired minLength={2}>
            <Label className="text-sm font-medium">Full name</Label>
            <Input placeholder="Your name" />
            <FieldError className="text-xs text-danger" />
          </TextField>

          <TextField name="email" type="email" isRequired>
            <Label className="text-sm font-medium">Email</Label>
            <Input placeholder="you@example.com" />
            <FieldError className="text-xs text-danger" />
          </TextField>

          <TextField name="password" isRequired minLength={6}>
            <Label className="text-sm font-medium">Password</Label>
            <Input placeholder="At least 6 characters" type="password" />
            <FieldError className="text-xs text-danger" />
          </TextField>

          <TextField name="confirmPassword" isRequired minLength={6}>
            <Label className="text-sm font-medium">Confirm password</Label>
            <Input placeholder="Repeat password" type="password" />
            <FieldError className="text-xs text-danger" />
          </TextField>

          {error && (
            <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" isDisabled={isSubmitting}>
            <FiUserPlus className="mr-1" />
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </Form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}