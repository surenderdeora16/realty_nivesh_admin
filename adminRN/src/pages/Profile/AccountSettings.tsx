'use client'

import { useState } from 'react'
import { FiEdit2, FiSave } from "react-icons/fi";
import { PiToggleLeftLight, PiToggleRightLight } from "react-icons/pi";

export default function AccountSettings() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // Here you would typically send the updated data to your backend
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Account Settings</h2>
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 dark:text-gray-200 dark:hover:text-gray-500 transition-colors"
        >
          {isEditing ? (
            <>
              <FiSave className="w-5 h-5 mr-1" />
              Save
            </>
          ) : (
            <>
              <FiEdit2 className="w-5 h-5 mr-1" />
              Edit
            </>
          )}
        </button>
      </div>
      <div className="space-y-4">
        <PasswordField
          label="Current Password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
        <PasswordField
          label="New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
        <PasswordField
          label="Confirm New Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
        {/* <div className="flex items-center justify-between">
          <div>
            <label htmlFor="twoFactor" className="font-medium text-black dark:text-white">
              Two-Factor Authentication
            </label>
            <p className="text-sm text-gray-500">Enable for enhanced account security</p>
          </div>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, twoFactor: !prev.twoFactor }))}
            disabled={!isEditing}
            className={`p-2 rounded-full transition-colors ${
              isEditing ? 'hover:bg-gray-100' : ''
            }`}
          >
            {formData.twoFactor ? (
              <PiToggleRightLight className="w-10 h-10 text-indigo-600" />
            ) : (
              <PiToggleLeftLight className="w-10 h-10 text-gray-400" />
            )}
          </button>
        </div> */}
      </div>
    </form>
  )
}

function PasswordField({ label, name, value, onChange, disabled }: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-base font-medium text-black dark:text-white mb-1">
        {label}
      </label>
      <input
        type="password"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
  )
}

