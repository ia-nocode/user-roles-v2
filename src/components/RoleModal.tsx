import React, { useState } from 'react';
import type { User, Role } from '../types/user';

interface RoleModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (userId: string, newRole: Role, newPassword?: string) => void;
}

export default function RoleModal({ user, isOpen, onClose, onSave }: RoleModalProps) {
  const [selectedRole, setSelectedRole] = useState<Role>(user?.role as Role || 'user');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  if (!isOpen || !user) return null;

  const roles: Role[] = ['admin', 'moderator', 'user'];

  const handleSave = () => {
    onSave(user.id, selectedRole, isChangingPassword ? newPassword : undefined);
    setNewPassword('');
    setIsChangingPassword(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <div className="mb-4">
          <p className="text-gray-600">User: {user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Role
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as Role)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <button
              type="button"
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              {isChangingPassword ? "Cancel Password Change" : "Change Password"}
            </button>
          </div>
          
          {isChangingPassword && (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter new password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              <p className="mt-1 text-sm text-gray-500">Password must be at least 6 characters long</p>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}