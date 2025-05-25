import { API_BASE_URL } from '@/constant'
import { useFetchUser } from '@/hooks/FetchUser'
import { Linkedin, Github, MapPin, Edit } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import axios from 'axios'

const Profile = () => {
  const { user, mutate } = useFetchUser()
  const [editingField, setEditingField] = useState(null)
  const [tempValue, setTempValue] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    designation: '',
    location: '',
    github: '',
    linkedIn: ''
  })

  React.useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        designation: user.designation || '',
        location: user.location || '',
        github: user.github || '',
        linkedIn: user.linkedIn || ''
      })
    }
  }, [user])

  const handleEditClick = (field, currentValue) => {
    setEditingField(field)
    setTempValue(currentValue)
  }

  const handleCancel = () => {
    setEditingField(null)
  }

  const updateProfile = async (field, value) => {
    setIsUpdating(true)
    try {
      await axios.put(`${API_BASE_URL}/api/user/update/${user?._id}`, {
        [field]: value
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }))
      
      mutate()
      
      console.log(`${field} updated successfully`)
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to update profile")
    } finally {
      setIsUpdating(false)
      setEditingField(null)
    }
  }

  const handleSave = async (field) => {
    if (tempValue.trim() === '') {
      toast.error("Field cannot be empty")
      return
    }

    if (field === 'github' || field === 'linkedIn') {
      if (!isValidUrl(tempValue)) {
        toast.error("Please enter a valid URL")
        return
      }
    }
    
    await updateProfile(field, tempValue)
  }

  const isValidUrl = (url) => {
    if (!url) return false
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`)
      return true
    } catch {
      return false
    }
  }

  const formatSocialUrl = (url) => {
    if (!url) return '#'
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    return `https://${url}`
  }

  const renderEditableField = (field, displayName, isSocialLink = false) => {
    const value = profileData[field]
    
    if (editingField === field) {
      return (
        <div className="flex items-center gap-2">
          <Input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-auto"
            autoFocus
            placeholder={isSocialLink ? "https://example.com" : ""}
          />
          <Button 
            onClick={() => handleSave(field)}
            size="sm"
            disabled={isUpdating}
          >
            Save
          </Button>
          <Button 
            onClick={handleCancel}
            size="sm"
            variant="outline"
            disabled={isUpdating}
          >
            Cancel
          </Button>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-1 group relative">
        {isSocialLink && value ? (
          <a 
            href={formatSocialUrl(value)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {value}
          </a>
        ) : (
          <span className={!value ? 'text-gray-400 italic' : ''}>
            {value || `${displayName} not set`}
          </span>
        )}
        <Button 
          variant="ghost"
          size="icon"
          onClick={() => handleEditClick(field, value)}
          className="opacity-0 group-hover:opacity-100 h-6 w-6 p-1 absolute right-[-20px] bottom-[20px]"
        >
          <Edit size={14} className="text-gray-500 icon" />
        </Button>
      </div>
    )
  }

  return (
    <div className='flex mt-10 justify-center items-center'>
      <div className="flex flex-col w-full md:w-[50%]">
        <div className="flex justify-between items-center h-50 bg-[#eee] relative">
          <div className="flex justify-start items-center">
            <img 
              src={`${API_BASE_URL}/uploads/profiles/${user?.avatar}`} 
              className='w-40 rounded-full absolute bottom-[-70px] border-[5px] border-white left-[60px] h-40'
              alt="Profile"
              style={{ borderRadius: '100px' }}
              onError={(e) => {
                (e.target).src = '/default-avatar.png'
              }}
            />
          </div>
        </div>

        <div className="flex flex-col mt-20 gap-2 w-[90%] ml-[5%]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className='text-[25px] flex gap-2'>
                {renderEditableField('firstName', 'First Name')}
                {renderEditableField('lastName', 'Last Name')}
              </h1>
            </div>
            {/* <div className="flex gap-2">
              <div className={`p-3 text-white ${profileData.github ? 'bg-black hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'}`}>
                <Github className='icon' />
              </div>
              <div className={`p-3 ${profileData.linkedIn ? 'bg-[blueviolet] hover:bg-[#8a2be2] text-white' : 'bg-gray-400 text-white cursor-not-allowed'}`}>
                <Linkedin className='icon' />
              </div>
            </div> */}
          </div>

          <h2 className='mt-2 font-bold'>
            {renderEditableField('designation', 'Designation')}
          </h2>

          <div className="flex items-center justify-between">
            {renderEditableField('location', 'Location')}
            <a 
              href={`https://maps.google.com/?q=${profileData.location}`} 
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 ml-2 ${profileData.location ? 'bg-black text-white' : 'bg-gray-400 text-white cursor-not-allowed'}`}
            >
              <MapPin className="text-xs" />
            </a>
          </div>

          {/* Social Links Section */}
          <div className="mt-4">
            <div className="space-y-2">
              <div className="flex gap-2">
                <Github className='icon' />

              {renderEditableField('github', 'GitHub URL', true)}
              </div>
              <div className="flex gap-2">
              <Linkedin className='icon' />
              {renderEditableField('linkedIn', 'LinkedIn URL', true)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile