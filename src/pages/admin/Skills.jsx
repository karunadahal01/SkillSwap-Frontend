// // src/pages/admin/Skills.jsx
// import { useState, useEffect } from 'react';
// import { 
//   Plus, 
//   Pencil, 
//   Trash2, 
//   Search, 
//   X, 
//   Save, 
//   AlertCircle,
//   CheckCircle,
//   Loader2
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { getAllSkills, addSkill, updateSkill } from '@services/skillService';
// import api from '@config/axios';

// export default function Skills() {
//   const [skills, setSkills] = useState([]);
//   const [filteredSkills, setFilteredSkills] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
//   const [selectedSkill, setSelectedSkill] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
  
//   // Form state
//   const [formData, setFormData] = useState({
//     skillName: '',
//     category: '',
//     description: ''
//   });
  
//   const [formErrors, setFormErrors] = useState({});

//   // Fetch all skills on component mount
//   useEffect(() => {
//     fetchSkills();
//   }, []);

//   // Filter skills based on search query
//   useEffect(() => {
//     if (searchQuery.trim() === '') {
//       setFilteredSkills(skills);
//     } else {
//       const query = searchQuery.toLowerCase();
//       const filtered = skills.filter(
//         skill =>
//           skill.skillName.toLowerCase().includes(query) ||
//           skill.category.toLowerCase().includes(query) ||
//           (skill.description && skill.description.toLowerCase().includes(query))
//       );
//       setFilteredSkills(filtered);
//     }
//   }, [searchQuery, skills]);

//   const fetchSkills = async () => {
//     try {
//       setLoading(true);
//       const data = await getAllSkills();
//       setSkills(data);
//       setFilteredSkills(data);
//     } catch (error) {
//       console.error('Error fetching skills:', error);
//       toast.error('Failed to fetch skills');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     if (!formData.skillName.trim()) {
//       errors.skillName = 'Skill name is required';
//     } else if (formData.skillName.length < 2 || formData.skillName.length > 50) {
//       errors.skillName = 'Skill name must be between 2 and 50 characters';
//     }
    
//     if (!formData.category.trim()) {
//       errors.category = 'Category is required';
//     } else if (formData.category.length < 3 || formData.category.length > 50) {
//       errors.category = 'Category must be between 3 and 50 characters';
//     }
    
//     if (formData.description && formData.description.length > 255) {
//       errors.description = 'Description cannot exceed 255 characters';
//     }
    
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleOpenModal = (mode, skill = null) => {
//     setModalMode(mode);
//     setSelectedSkill(skill);
    
//     if (mode === 'edit' && skill) {
//       setFormData({
//         skillName: skill.skillName,
//         category: skill.category,
//         description: skill.description || ''
//       });
//     } else {
//       setFormData({
//         skillName: '',
//         category: '',
//         description: ''
//       });
//     }
    
//     setFormErrors({});
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedSkill(null);
//     setFormData({
//       skillName: '',
//       category: '',
//       description: ''
//     });
//     setFormErrors({});
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear error for this field when user starts typing
//     if (formErrors[name]) {
//       setFormErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       toast.error('Please fix the validation errors');
//       return;
//     }
    
//     setSubmitting(true);
    
//     try {
//       if (modalMode === 'add') {
//         await addSkill(formData);
//         toast.success('Skill added successfully!');
//       } else {
//         await updateSkill({
//           skillId: selectedSkill.skillId,
//           ...formData
//         });
//         toast.success('Skill updated successfully!');
//       }
      
//       await fetchSkills();
//       handleCloseModal();
//     } catch (error) {
//       console.error('Error submitting skill:', error);
      
//       if (error.response?.data?.message) {
//         toast.error(error.response.data.message);
//       } else if (error.response?.status === 409) {
//         toast.error('A skill with this name already exists');
//       } else {
//         toast.error(`Failed to ${modalMode === 'add' ? 'add' : 'update'} skill`);
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = async (skillId, skillName) => {
//     if (!window.confirm(`Are you sure you want to delete "${skillName}"? This action cannot be undone.`)) {
//       return;
//     }
    
//     try {
//       await api.delete(`/api/skills/delete/${skillId}`);
//       toast.success('Skill deleted successfully!');
//       await fetchSkills();
//     } catch (error) {
//       console.error('Error deleting skill:', error);
      
//       if (error.response?.data?.message) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error('Failed to delete skill');
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">
//             Skills Management
//           </h1>
//           <p className="text-slate-600 text-lg">
//             Manage all available skills in the platform
//           </p>
//         </div>

//         {/* Action Bar */}
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             {/* Search Bar */}
//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search skills by name, category..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               />
//             </div>

//             {/* Add Skill Button */}
//             <button
//               onClick={() => handleOpenModal('add')}
//               className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
//             >
//               <Plus className="w-5 h-5" />
//               Add Skill
//             </button>
//           </div>
//         </div>

//         {/* Skills Grid */}
//         {loading ? (
//           <div className="flex items-center justify-center py-20">
//             <div className="text-center">
//               <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
//               <p className="text-slate-600 text-lg">Loading skills...</p>
//             </div>
//           </div>
//         ) : filteredSkills.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
//             <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-slate-900 mb-2">
//               {searchQuery ? 'No skills found' : 'No skills yet'}
//             </h3>
//             <p className="text-slate-600 mb-6">
//               {searchQuery 
//                 ? 'Try adjusting your search terms' 
//                 : 'Get started by adding your first skill'}
//             </p>
//             {!searchQuery && (
//               <button
//                 onClick={() => handleOpenModal('add')}
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//               >
//                 <Plus className="w-5 h-5" />
//                 Add First Skill
//               </button>
//             )}
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredSkills.map((skill) => (
//                 <div
//                   key={skill.skillId}
//                   className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
//                 >
//                   <div className="p-6">
//                     {/* Skill Header */}
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex-1">
//                         <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
//                           {skill.skillName}
//                         </h3>
//                         <span className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
//                           {skill.category}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Description */}
//                     {skill.description && (
//                       <p className="text-slate-600 text-sm mb-4 line-clamp-3">
//                         {skill.description}
//                       </p>
//                     )}

//                     {/* Action Buttons */}
//                     <div className="flex gap-2 pt-4 border-t border-slate-100">
//                       <button
//                         onClick={() => handleOpenModal('edit', skill)}
//                         className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium"
//                       >
//                         <Pencil className="w-4 h-4" />
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(skill.skillId, skill.skillName)}
//                         className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors font-medium"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Results Summary */}
//             <div className="mt-6 text-center text-slate-600">
//               Showing {filteredSkills.length} of {skills.length} skill{skills.length !== 1 ? 's' : ''}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Modal for Add/Edit */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
//               <h2 className="text-2xl font-bold text-slate-900">
//                 {modalMode === 'add' ? 'Add New Skill' : 'Edit Skill'}
//               </h2>
//               <button
//                 onClick={handleCloseModal}
//                 className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
//                 disabled={submitting}
//               >
//                 <X className="w-5 h-5 text-slate-600" />
//               </button>
//             </div>

//             {/* Modal Body */}
//             <form onSubmit={handleSubmit} className="p-6 space-y-5">
//               {/* Skill Name */}
//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   Skill Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="skillName"
//                   value={formData.skillName}
//                   onChange={handleInputChange}
//                   placeholder="e.g., JavaScript, Graphic Design"
//                   className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
//                     formErrors.skillName
//                       ? 'border-red-300 focus:ring-red-500'
//                       : 'border-slate-300 focus:ring-blue-500'
//                   }`}
//                   disabled={submitting}
//                 />
//                 {formErrors.skillName && (
//                   <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
//                     <AlertCircle className="w-4 h-4" />
//                     {formErrors.skillName}
//                   </p>
//                 )}
//                 <p className="mt-1.5 text-xs text-slate-500">
//                   {formData.skillName.length}/50 characters
//                 </p>
//               </div>

//               {/* Category */}
//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   Category <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleInputChange}
//                   placeholder="e.g., Programming, Design, Language"
//                   className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
//                     formErrors.category
//                       ? 'border-red-300 focus:ring-red-500'
//                       : 'border-slate-300 focus:ring-blue-500'
//                   }`}
//                   disabled={submitting}
//                 />
//                 {formErrors.category && (
//                   <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
//                     <AlertCircle className="w-4 h-4" />
//                     {formErrors.category}
//                   </p>
//                 )}
//                 <p className="mt-1.5 text-xs text-slate-500">
//                   {formData.category.length}/50 characters
//                 </p>
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   placeholder="Optional: Brief description of the skill"
//                   rows="4"
//                   className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
//                     formErrors.description
//                       ? 'border-red-300 focus:ring-red-500'
//                       : 'border-slate-300 focus:ring-blue-500'
//                   }`}
//                   disabled={submitting}
//                 />
//                 {formErrors.description && (
//                   <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
//                     <AlertCircle className="w-4 h-4" />
//                     {formErrors.description}
//                   </p>
//                 )}
//                 <p className="mt-1.5 text-xs text-slate-500">
//                   {formData.description.length}/255 characters
//                 </p>
//               </div>

//               {/* Form Actions */}
//               <div className="flex gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={handleCloseModal}
//                   className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
//                   disabled={submitting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={submitting}
//                 >
//                   {submitting ? (
//                     <>
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="w-4 h-4" />
//                       {modalMode === 'add' ? 'Add Skill' : 'Save Changes'}
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// src/pages/admin/Skills.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Stack,
  Alert,
  useTheme,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Category as CategoryIcon,
  EmojiEvents,
  Close as CloseIcon,
  Save as SaveIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { getAllSkills, addSkill, updateSkill } from '@services/skillService';
import api from '@config/axios';

export default function Skills() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);

  const [formData, setFormData] = useState({
    skillName: '',
    category: '',
    description: ''
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSkills(skills);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = skills.filter(
        skill =>
          skill.skillName.toLowerCase().includes(query) ||
          skill.category.toLowerCase().includes(query) ||
          (skill.description && skill.description.toLowerCase().includes(query))
      );
      setFilteredSkills(filtered);
    }
  }, [searchQuery, skills]);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data = await getAllSkills();
      setSkills(data);
      setFilteredSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.skillName.trim()) {
      errors.skillName = 'Skill name is required';
    } else if (formData.skillName.length < 2 || formData.skillName.length > 50) {
      errors.skillName = 'Skill name must be between 2 and 50 characters';
    }

    if (!formData.category.trim()) {
      errors.category = 'Category is required';
    } else if (formData.category.length < 3 || formData.category.length > 50) {
      errors.category = 'Category must be between 3 and 50 characters';
    }

    if (formData.description && formData.description.length > 255) {
      errors.description = 'Description cannot exceed 255 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOpenModal = (mode, skill = null) => {
    setModalMode(mode);
    setSelectedSkill(skill);

    if (mode === 'edit' && skill) {
      setFormData({
        skillName: skill.skillName,
        category: skill.category,
        description: skill.description || ''
      });
    } else {
      setFormData({
        skillName: '',
        category: '',
        description: ''
      });
    }

    setFormErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSkill(null);
    setFormData({
      skillName: '',
      category: '',
      description: ''
    });
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the validation errors');
      return;
    }

    setSubmitting(true);

    try {
      if (modalMode === 'add') {
        await addSkill(formData);
        toast.success('Skill added successfully!');
      } else {
        await updateSkill({
          skillId: selectedSkill.skillId,
          ...formData
        });
        toast.success('Skill updated successfully!');
      }

      await fetchSkills();
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting skill:', error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 409) {
        toast.error('A skill with this name already exists');
      } else {
        toast.error(`Failed to ${modalMode === 'add' ? 'add' : 'update'} skill`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (skill) => {
    setSkillToDelete(skill);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!skillToDelete) return;

    try {
      await api.delete(`/api/skills/delete/${skillToDelete.skillId}`);
      toast.success('Skill deleted successfully!');
      await fetchSkills();
      setShowDeleteDialog(false);
      setSkillToDelete(null);
    } catch (error) {
      console.error('Error deleting skill:', error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to delete skill');
      }
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isDark
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
        }}
      >
        <CircularProgress size={50} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
        py: 6,
        px: { xs: 1, sm: 2 },
      }}
    >
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3, md: 4 },
            mb: { xs: 2, sm: 3, md: 4 },
            borderRadius: { xs: 2, md: 3 },
            background: isDark
              ? 'linear-gradient(135deg, #2d3561 0%, #1f2544 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: { xs: '200px', sm: '300px' },
              height: { xs: '200px', sm: '300px' },
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              transform: 'translate(30%, -30%)',
            },
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={{ xs: 2, sm: 2 }}
            sx={{ position: 'relative', zIndex: 1 }}
          >
            <Box>
              <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 1.5 }} sx={{ mb: { xs: 0.5, sm: 1 } }}>
                <EmojiEvents sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
                <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' } }}>
                  Skills Management
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ opacity: 0.9, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                Manage all available skills in the platform
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenModal('add')}
              sx={{
                px: { xs: 3, sm: 4 },
                py: { xs: 1.2, sm: 1.5 },
                borderRadius: 2,
                fontWeight: 600,
                fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.3)',
                  border: '2px solid rgba(255,255,255,0.5)',
                },
                textTransform: 'none',
                alignSelf: { xs: 'stretch', sm: 'auto' },
              }}
            >
              Add Skill
            </Button>
          </Stack>
        </Paper>

        {/* Search Bar */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            mb: { xs: 2, sm: 3, md: 4 },
            borderRadius: { xs: 2, md: 3 },
            background: isDark ? '#1e1e2e' : '#ffffff',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
          }}
        >
          <TextField
            fullWidth
            placeholder="Search skills by name, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </Paper>

        {/* Stats Card */}
        {skills.length > 0 && (
          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3 },
                  borderRadius: { xs: 2, md: 3 },
                  background: isDark ? '#1e1e2e' : '#ffffff',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }}>
                  <Box
                    sx={{
                      width: { xs: 44, sm: 50 },
                      height: { xs: 44, sm: 50 },
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CategoryIcon sx={{ color: 'white', fontSize: { xs: 20, sm: 24 } }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' } }}>
                      {filteredSkills.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {searchQuery ? 'Filtered Skills' : 'Total Skills'}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, sm: 6, md: 8 },
              textAlign: 'center',
              borderRadius: { xs: 2, md: 3 },
              background: isDark ? '#1e1e2e' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
            }}
          >
            <Box
              sx={{
                width: { xs: 80, sm: 100 },
                height: { xs: 80, sm: 100 },
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: { xs: 2, sm: 3 },
              }}
            >
              <CategoryIcon sx={{ fontSize: { xs: 48, sm: 60 }, color: 'white' }} />
            </Box>
            <Typography variant="h5" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
              {searchQuery ? 'No skills found' : 'No skills yet'}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: { xs: 3, sm: 4 }, maxWidth: 500, mx: 'auto', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              {searchQuery 
                ? 'Try adjusting your search terms' 
                : 'Get started by adding your first skill'}
            </Typography>
            {!searchQuery && (
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => handleOpenModal('add')}
                sx={{
                  px: { xs: 4, sm: 5 },
                  py: { xs: 1.5, sm: 1.8 },
                  borderRadius: 3,
                  fontWeight: 600,
                  fontSize: { xs: '0.9375rem', sm: '1rem' },
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
                  '&:hover': {
                    boxShadow: '0 12px 28px rgba(102, 126, 234, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Add First Skill
              </Button>
            )}
          </Paper>
        ) : (
          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {filteredSkills.map((skill) => (
              <Grid item xs={12} sm={6} md={4} key={skill.skillId}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: { xs: 2, md: 3 },
                    background: isDark ? '#1e1e2e' : '#ffffff',
                    border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: isDark
                        ? '0 12px 24px rgba(0,0,0,0.4)'
                        : '0 12px 24px rgba(0,0,0,0.1)',
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: { xs: 2.5, sm: 3 } }}>
                    <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          width: { xs: 48, sm: 56 },
                          height: { xs: 48, sm: 56 },
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <CategoryIcon sx={{ fontSize: { xs: 28, sm: 32 }, color: 'white' }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="h6" fontWeight={700} noWrap sx={{ mb: 1, fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}>
                          {skill.skillName}
                        </Typography>
                        <Chip
                          label={skill.category}
                          color="primary"
                          size="small"
                          sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
                        />
                      </Box>
                    </Stack>

                    {skill.description && (
                      <Paper
                        elevation={0}
                        sx={{
                          p: { xs: 1.5, sm: 2 },
                          borderRadius: 2,
                          background: isDark
                            ? 'rgba(255,255,255,0.05)'
                            : 'rgba(0,0,0,0.02)',
                        }}
                      >
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                          Description
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            mt: 0.5, 
                            fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {skill.description}
                        </Typography>
                      </Paper>
                    )}
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenModal('edit', skill)}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                        textTransform: 'none',
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(skill)}
                      sx={{
                        color: 'error.main',
                        border: '2px solid',
                        borderColor: 'error.main',
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: 'error.main',
                          color: 'white',
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Add/Edit Dialog */}
        <Dialog
          open={showModal}
          onClose={handleCloseModal}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: isDark ? '#1e1e2e' : '#ffffff',
              m: { xs: 2, sm: 3 },
            },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}>
                {modalMode === 'add' ? 'Add New Skill' : 'Edit Skill'}
              </Typography>
              <IconButton onClick={handleCloseModal} disabled={submitting} size="small">
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              {/* Skill Name */}
              <Box>
                <TextField
                  fullWidth
                  label="Skill Name"
                  name="skillName"
                  value={formData.skillName}
                  onChange={handleInputChange}
                  placeholder="e.g., JavaScript, Graphic Design"
                  error={!!formErrors.skillName}
                  helperText={formErrors.skillName || `${formData.skillName.length}/50 characters`}
                  disabled={submitting}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>

              {/* Category */}
              <Box>
                <TextField
                  fullWidth
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g., Programming, Design, Language"
                  error={!!formErrors.category}
                  helperText={formErrors.category || `${formData.category.length}/50 characters`}
                  disabled={submitting}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>

              {/* Description */}
              <Box>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Optional: Brief description of the skill"
                  multiline
                  rows={4}
                  error={!!formErrors.description}
                  helperText={formErrors.description || `${formData.description.length}/255 characters`}
                  disabled={submitting}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: 2 }}>
            <Button
              onClick={handleCloseModal}
              disabled={submitting}
              sx={{ borderRadius: 2, fontWeight: 500, fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={submitting}
              startIcon={submitting ? <CircularProgress size={16} /> : <SaveIcon />}
              sx={{ borderRadius: 2, fontWeight: 600, px: { xs: 2, sm: 3 }, fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
            >
              {submitting ? 'Saving...' : (modalMode === 'add' ? 'Add Skill' : 'Save Changes')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: isDark ? '#1e1e2e' : '#ffffff',
              m: { xs: 2, sm: 3 },
            },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h6" fontWeight={700} color="error" sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}>
              Delete Skill?
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Alert severity="warning" sx={{ mb: 2, borderRadius: 2, fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
              This action cannot be undone.
            </Alert>
            <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Are you sure you want to delete <strong>{skillToDelete?.skillName}</strong>?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: 2 }}>
            <Button
              onClick={() => setShowDeleteDialog(false)}
              sx={{ borderRadius: 2, fontWeight: 500, fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteConfirm}
              sx={{ borderRadius: 2, fontWeight: 600, px: { xs: 2, sm: 3 }, fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
            >
              Delete Skill
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}