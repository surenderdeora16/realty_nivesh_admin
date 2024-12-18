"use client"
import React, { useState } from 'react'
import RoleList from './RoleList'
import RoleForm from './RoleForm'
import PermissionModal from './PermissionModal'

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

const initialRoles: Role[] = [
    {
        id: 1,
        name: 'Super Admin',
        description: 'Full system access',
        permissions: ['all'],
        color: 'red'
    },
    {
        id: 2,
        name: 'Admin',
        description: 'Administrative access',
        permissions: ['manage_users', 'manage_content', 'view_reports'],
        color: 'blue'
    },
    {
        id: 3,
        name: 'Manager',
        description: 'Team management access',
        permissions: ['manage_team', 'view_reports'],
        color: 'green'
    },
    {
        id: 4,
        name: 'Editor',
        description: 'Content management access',
        permissions: ['edit_content', 'publish_content'],
        color: 'yellow'
    },
    {
        id: 5,
        name: 'Viewer',
        description: 'Read-only access',
        permissions: ['view_content'],
        color: 'purple'
    },
]

const allPermissions: Permission[] = [
    { id: 'all', name: 'All Permissions', description: 'Grants full access to all system features' },
    { id: 'manage_users', name: 'Manage Users', description: 'Create, edit, and delete user accounts' },
    { id: 'manage_content', name: 'Manage Content', description: 'Create, edit, and delete all types of content' },
    { id: 'view_reports', name: 'View Reports', description: 'Access and view system reports and analytics' },
    { id: 'manage_team', name: 'Manage Team', description: 'Add, remove, and manage team members' },
    { id: 'edit_content', name: 'Edit Content', description: 'Edit existing content' },
    { id: 'publish_content', name: 'Publish Content', description: 'Publish or unpublish content' },
    { id: 'view_content', name: 'View Content', description: 'View published content' },
]

const RoleManagement: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>(initialRoles)
    const [selectedRole, setSelectedRole] = useState<Role | null>(null)
    const [isAddingRole, setIsAddingRole] = useState(false)
    const [isEditingPermissions, setIsEditingPermissions] = useState(false)

    const addRole = (newRole: Omit<Role, 'id'>) => {
        const role = { ...newRole, id: roles.length + 1 }
        setRoles([...roles, role])
    }

    const updateRole = (updatedRole: Role) => {
        setRoles(roles.map(role => role.id === updatedRole.id ? updatedRole : role))
        setSelectedRole(updatedRole)
    }

    const deleteRole = (id: number) => {
        setRoles(roles.filter(role => role.id !== id))
        if (selectedRole?.id === id) {
            setSelectedRole(null)
        }
    }

    return (
        <div className="container mx-auto p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100 text-center">Role Management System</h1>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <RoleList
                        roles={roles}
                        onSelectRole={(role) => {
                            setSelectedRole(role)
                            setIsEditingPermissions(true)
                        }}
                        onDeleteRole={deleteRole}
                        onAddRole={() => setIsAddingRole(true)}
                    />
                </div>
            </div>
            {isAddingRole && (
                <RoleForm
                    allPermissions={allPermissions}
                    onSubmit={(newRole) => {
                        addRole(newRole)
                        setIsAddingRole(false)
                    }}
                    onCancel={() => setIsAddingRole(false)}
                />
            )}
            {isEditingPermissions && selectedRole && (
                <PermissionModal
                    role={selectedRole}
                    allPermissions={allPermissions}
                    onUpdateRole={(updatedRole) => {
                        updateRole(updatedRole)
                        setIsEditingPermissions(false)
                    }}
                    onClose={() => setIsEditingPermissions(false)}
                />
            )}
        </div>
    )
}

export default RoleManagement

