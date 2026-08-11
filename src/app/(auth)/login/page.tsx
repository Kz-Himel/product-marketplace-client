"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Form, TextField, Label, Input, FieldError, Button } from "@heroui/react";
import { FiLogIn } from "react-icons/fi";
import { motion } from "framer-motion";
import { useAuth } from "../../../lib/auth/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    try {
      const user = await login({ email, password });
      const redirect = searchParams.get("redirect");
      router.push(redirect || (user.role === "ADMIN" ? "/dashboard" : "/"));
    } catch (err: any) {
      setError(err.message || "Login failed");
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
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Log in to continue to the marketplace
          </p>
        </div>

        <Form
          onSubmit={handleSubmit}
          className="w-full space-y-4 rounded-2xl border border-border bg-surface p-6"
        >
          <TextField name="email" type="email" isRequired>
            <Label className="text-sm font-medium">Email</Label>
            <Input placeholder="you@example.com" />
            <FieldError className="text-xs text-danger" />
          </TextField>

          <TextField name="password" isRequired minLength={1}>
            <Label className="text-sm font-medium">Password</Label>
            <Input placeholder="••••••••" type="password" />
            <FieldError className="text-xs text-danger" />
          </TextField>

          {error && (
            <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" isDisabled={isSubmitting}>
            <FiLogIn className="mr-1" />
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>
        </Form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}