"use client";

import { useParams, useRouter } from "next/navigation";
import { UserForm } from "@/components/users/UserForm";
import { useUser, useUpdateUser } from "@/hooks/useUsers";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: user, isLoading } = useUser(id);
  const updateUser = useUpdateUser(id);

  if (isLoading) return <LoadingSpinner />;
  if (!user) return null;

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold">Edit user</h1>
      <UserForm
        initialValues={user}
        requirePassword={false}
        submitLabel="Update user"
        isSubmitting={updateUser.isPending}
        onSubmit={async (values) => {
          await updateUser.mutateAsync(values);
          router.push("/dashboard/users");
        }}
      />
    </div>
  );
}