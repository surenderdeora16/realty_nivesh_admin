import React from 'react'
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";

interface Role {
    id: number
    name: string
    description: string
    permissions: string[]
    color: string
}

interface RoleListProps {
    roles: Role[]
    onSelectRole: (role: Role) => void
    onDeleteRole: (id: number) => void
    onAddRole: () => void
}

const RoleList: React.FC<RoleListProps> = ({ roles, onSelectRole, onDeleteRole, onAddRole }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Roles</h2>
                <button
                    onClick={onAddRole}
                    className="bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-200 flex items-center"
                >
                    <FaPlus size={18} className="mr-2" />
                    Add New Role
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roles.map((role) => (
                    <div
                        key={role.id}
                        className={`bg-white dark:bg-gray-800 border-l-4 border-${role.color}-500 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out`}
                    >
                        <div className="p-5">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{role.name}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${role.color}-100 dark:bg-${role.color}-900 text-${role.color}-800 dark:text-${role.color}-200`}>
                                    {role.name}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{role.description}</p>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                                <MdOutlineAssignmentTurnedIn size={16} className="mr-2" />
                                <span>{role.permissions.length} permissions</span>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => onSelectRole(role)}
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
                                >
                                    <MdEdit size={16} className="mr-1" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDeleteRole(role.id)}
                                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 flex items-center"
                                >
                                    <FaTrashAlt size={16} className="mr-1" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RoleList

