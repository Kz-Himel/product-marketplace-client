"use client";

import { useRouter } from "next/navigation";
import { UserForm } from "@/components/users/UserForm";
import { useCreateUser } from "@/hooks/useUsers";

export default function NewUserPage() {
  const router = useRouter();
  const createUser = useCreateUser();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold">New user</h1>
      <UserForm
        requirePassword
        isSubmitting={createUser.isPending}
        onSubmit={async (values) => {
          await createUser.mutateAsync({
            name: values.name,
            email: values.email,
            password: values.password!,
            role: values.role,
          });
          router.push("/dashboard/users");
        }}
      />
    </div>
  );
}