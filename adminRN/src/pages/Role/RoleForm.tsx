import React, { useState } from 'react'
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

interface RoleFormProps {
    onSubmit: (role: Omit<Role, 'id'>) => void
    onCancel: () => void
    allPermissions: Permission[]
    initialRole?: Role
}

const RoleForm: React.FC<RoleFormProps> = ({ onSubmit, onCancel, allPermissions, initialRole }) => {
    const [name, setName] = useState(initialRole?.name || '')
    const [description, setDescription] = useState(initialRole?.description || '')
    const [permissions, setPermissions] = useState<string[]>(initialRole?.permissions || [])
    const [color, setColor] = useState(initialRole?.color || 'gray')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({ name, description, permissions, color })
    }

    const togglePermission = (permissionId: string) => {
        setPermissions(
            permissions.includes(permissionId)
                ? permissions.filter((p) => p !== permissionId)
                : [...permissions, permissionId]
        )
    }

    return (
        <div style={{ zIndex: '2147483647' }} className="fixed inset-0 bg-gray-600 bg-opacity-50  dark:bg-[#00000035] backdrop-blur px-2 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        {initialRole ? 'Edit Role' : 'Add New Role'}
                    </h2>
                    <button onClick={onCancel} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                        <RxCross2 size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Role Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            rows={3}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color</label>
                        <div className="flex space-x-2">
                            {['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'].map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setColor(c)}
                                    className={`w-6 h-6 rounded-full bg-${c}-500 ${color === c ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600' : ''
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                    {/* <div className="mb-4">
                        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Permissions</span>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {allPermissions.map((permission) => (
                                <label key={permission.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={permissions.includes(permission.id)}
                                        onChange={() => togglePermission(permission.id)}
                                        className="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-400"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{permission.name}</span>
                                </label>
                            ))}
                        </div>
                    </div> */}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {initialRole ? 'Update' : 'Add'} Role
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RoleForm

