import { useState } from 'react';
import { useSelector } from 'react-redux';
import { TbShieldLock } from "react-icons/tb";
import { MdOutlineCameraAlt } from "react-icons/md"
import { LuUser } from "react-icons/lu";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PersonalInfo from './PersonalInfo'
import AccountSettings from './AccountSettings'
import AxiosHelper from '../../helper/AxiosHelper';
import { toast } from 'react-toastify';
import { RootState } from '../../store';

const Profile = () => {
  const admin = useSelector((state: RootState) => state.admin);

  const [activeTab, setActiveTab] = useState('personal')
  const [avatarUrl, setAvatarUrl] = useState(admin?.data?.image)
  const [isLoading, setIsLoading] = useState(false);


  const handleImageUpload = async (file:any) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    setIsLoading(true);
    try {
      const response = await AxiosHelper.postData('/admin/change-profile-image', formData, true);
      toast.success(response.data.message);
      setAvatarUrl(URL.createObjectURL(file));
    } catch (error) {
      // Error handled in AxiosHelper
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Profile" />

      <div className="min-h-screen ">
        <div className="w-full mx-auto py-4 bg-white dark:bg-boxdark rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-28 bg-gray-100 dark:bg-boxdark">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="relative">
                <img
                  src={avatarUrl}
                  alt="Admin Avatar"
                  className="w-44 h-44 rounded-full object-cover border-4 border-white"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <MdOutlineCameraAlt className="w-5 h-5 text-gray-600" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e?.target?.files[0])}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="pt-25 pb-8 px-8 text-black dark:text-white">
            <h1 className="text-3xl font-bold text-center">John Doe</h1>
            <p className="text-center mt-1">Super Admin</p>
            <div className="mt-8 flex justify-center space-x-4">
              <TabButton
                active={activeTab === 'personal'}
                onClick={() => setActiveTab('personal')}
                icon={<LuUser className="w-5 h-5" />}
              >
                Personal Info
              </TabButton>
              <TabButton
                active={activeTab === 'account'}
                onClick={() => setActiveTab('account')}
                icon={<TbShieldLock className="w-5 h-5" />}
              >
                Account Settings
              </TabButton>
            </div>
            <div className="mt-8">
              {activeTab === 'personal' && <PersonalInfo />}
              {activeTab === 'account' && <AccountSettings />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function TabButton({ active, onClick, icon, children }: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-full transition-colors ${active
        ? 'bg-indigo-500 text-white'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
    >
      {icon}
      <span className="ml-2">{children}</span>
    </button>
  )
}


export default Profile;
