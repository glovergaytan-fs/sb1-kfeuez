import React from 'react';
import { User } from 'lucide-react';

interface UserProfileProps {
  clearAllData: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ clearAllData }) => {
  return (
    <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <User size={24} className="mr-2" />
        User Profile
      </h2>
      <div className="space-y-4">
        <p>Manage your account settings and preferences here.</p>
        <button
          onClick={clearAllData}
          className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Clear All Data
        </button>
      </div>
    </div>
  );
};

export default UserProfile;