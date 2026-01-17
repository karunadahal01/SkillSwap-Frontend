// src/services/profileService.js
import api from '@/config/axios';

export const getProfile = async () => {
  return api.get('/api/profile/me');
};

export const getProfileByUserId = async (userId) => {
  const res = await api.get(`/api/profile/user/${userId}`);
  return res.data?.data;
};

export const updateProfile = async (data) => {
  return api.put('/api/profile/me', data);
};

export const uploadAvatar = async (file) => {
  try {
    console.log('📤 uploadAvatar called with:', {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      isFile: file instanceof File
    });

    if (!(file instanceof File)) {
      console.error('❌ Not a File object:', file);
      throw new Error('Invalid file - must be a File object');
    }

    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      console.error('❌ No access token found');
      throw new Error('No access token found - please login again');
    }
    
    console.log('📤 Uploading avatar');
    console.log('   Token present:', !!token);
    console.log('   Token preview:', token.substring(0, 20) + '...');

    const res = await api.post('/api/profile/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('✅ Avatar uploaded:', res.data);
    return res.data?.data;
    
  } catch (error) {
    console.error('❌ uploadAvatar error:', error);
    console.error('   Error message:', error.message);
    console.error('   Error response:', error.response?.data);
    console.error('   Error status:', error.response?.status);
    throw error;
  }
};
