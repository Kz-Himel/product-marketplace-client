"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@heroui/react";
import { FiAlertTriangle } from "react-icons/fi";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Delete",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-xl"
          >
            <div className="mb-3 flex items-center gap-2 text-danger">
              <FiAlertTriangle />
              <h2 className="font-display text-lg font-semibold text-foreground">
                {title}
              </h2>
            </div>
            <p className="mb-6 text-sm text-muted">{description}</p>
            <div className="flex justify-end gap-3">
              <Button size="sm" variant="ghost" onPress={onCancel} isDisabled={isLoading}>
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-danger text-danger-foreground hover:bg-danger-hover"
                onPress={onConfirm}
                isDisabled={isLoading}
              >
                {isLoading ? "Deleting..." : confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}