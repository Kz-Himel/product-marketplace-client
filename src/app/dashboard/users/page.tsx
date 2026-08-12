"use client";

import { useState } from "react";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiUsers } from "react-icons/fi";
import { Button } from "@heroui/react";
import { useUsers, useDeleteUser } from "@/hooks/useUsers";
import { useAuth } from "@/lib/auth/useAuth";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const { data: users, isLoading } = useUsers();
  const deleteUser = useDeleteUser();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;
    await deleteUser.mutateAsync(pendingDeleteId);
    setPendingDeleteId(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Users</h1>
        <Link href="/dashboard/users/new">
          <Button size="sm">
            <FiPlus className="mr-1" /> New user
          </Button>
        </Link>
      </div>

      {isLoading && <LoadingSpinner />}
      {users && users.length === 0 && <EmptyState icon={<FiUsers />} title="No users yet" />}

      {users && users.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-secondary text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">
                    {u.name}
                    {u.id === currentUser?.id && (
                      <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 text-xs text-accent">You</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">{u.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        u.role === "ADMIN" ? "bg-accent/15 text-accent" : "bg-default/40 text-foreground/70"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/users/${u.id}/edit`}>
                        <Button size="sm" variant="ghost">
                          <FiEdit2 />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-danger"
                        isDisabled={u.id === currentUser?.id}
                        onPress={() => setPendingDeleteId(u.id)}
                      >
                        <FiTrash2 />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!pendingDeleteId}
        title="Delete this user?"
        description="This will soft-delete the user account."
        isLoading={deleteUser.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}