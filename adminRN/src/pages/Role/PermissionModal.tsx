import React from 'react'
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

interface Role {
    id: number
    name: string
    description: string
    permissions: string[]
    color: string
}

interface Permission {
    id: string
    name: string
    description: string
}

interface PermissionModalProps {
    role: Role
    allPermissions: Permission[]
    onUpdateRole: (updatedRole: Role) => void
    onClose: () => void
}

const PermissionModal: React.FC<PermissionModalProps> = ({ role, allPermissions, onUpdateRole, onClose }) => {
    const togglePermission = (permissionId: string) => {
        const updatedPermissions = role.permissions.includes(permissionId)
            ? role.permissions.filter((p) => p !== permissionId)
            : [...role.permissions, permissionId]
        onUpdateRole({ ...role, permissions: updatedPermissions })
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 w-full max-w-4xl mx-auto rounded-lg shadow-xl overflow-hidden">
                <div className="flex justify-between items-center p-6 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        Permissions for {role.name}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                        <RxCross2 size={24} />
                    </button>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {allPermissions.map((permission) => (
                            <div
                                key={permission.id}
                                className={`p-4 rounded-lg border ${role.permissions.includes(permission.id)
                                    ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700'
                                    : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">{permission.name}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{permission.description}</p>
                                    </div>
                                    <button
                                        onClick={() => togglePermission(permission.id)}
                                        className={`p-2 rounded-full ${role.permissions.includes(permission.id)
                                            ? 'bg-green-500 dark:bg-green-600 text-white'
                                            : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                                            }`}
                                    >
                                        <FaCheck size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end p-6 bg-gray-50 dark:bg-gray-700 border-t dark:border-gray-600">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-200"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PermissionModal

