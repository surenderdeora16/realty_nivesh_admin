'use client'

import { useState } from 'react'
import { FiEdit2, FiSave } from "react-icons/fi";

export default function PersonalInfo() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: 'John',
    email: 'john.doe@example.com',
    phone: '+1 (555) 000-0000',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // Here you would typically send the updated data to your backend
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-black dark:text-white">Personal Information</h2>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 md:col-span-2">
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
        <InputField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
    </form>
  )
}

function InputField({ label, name, type = 'text', value, onChange, disabled }: {
  label: string
  name: string
  type?: string
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
        type={type}
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

