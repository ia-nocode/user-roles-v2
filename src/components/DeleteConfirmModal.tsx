import React from 'react';
import { AlertTriangle } from 'lucide-react';
import type { User } from '../types/user';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  user,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Delete User</h2>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-2">
            Are you sure you want to delete this user?
          </p>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm font-medium text-gray-900">{user.email}</p>
            <p className="text-sm text-gray-500">Role: {user.role}</p>
          </div>
          <p className="mt-2 text-sm text-red-600">
            This action cannot be undone. The user will be removed from both authentication and the database.
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
}