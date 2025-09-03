import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiSave, 
  FiUpload, 
  FiTrash2, 
  FiPlus,
  FiImage,
  FiVideo,
  FiMapPin,
  FiUser,
  FiCalendar,
  FiTag,
  FiInfo,
  FiPlay
} from 'react-icons/fi';

const FormOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
`;

const FormContainer = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const FormHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid #E2E8F0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #1E40AF, #1E3A8A);
  color: white;
  border-radius: 1rem 1rem 0 0;
`;

const FormTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 0.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const FormBody = styled.div`
  padding: 2rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  &.full-width {
    grid-column: 1 / -1;
  }

  label {
    display: block;
    color: #1E40AF;
    font-weight: 500;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .required {
    color: #EF4444;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #E2E8F0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #F8FAFC;

  &:focus {
    outline: none;
    border-color: #1E40AF;
    background: white;
    box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #E2E8F0;
  border-radius: 0.5rem;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;
  background: #F8FAFC;

  &:focus {
    outline: none;
    border-color: #1E40AF;
    background: white;
    box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #E2E8F0;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: #F8FAFC;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1E40AF;
    background: white;
    box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
  }
`;

const MediaUpload = styled.div`
  border: 2px dashed #E2E8F0;
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
  background: #F8FAFC;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #1E40AF;
    background: #F1F5F9;
  }

  input {
    display: none;
  }

  .upload-icon {
    color: #64748B;
    margin-bottom: 1rem;
  }

  .upload-text {
    color: #475569;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .upload-hint {
    color: #94A3B8;
    font-size: 0.875rem;
  }
`;

const MediaPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const MediaItem = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #F1F5F9;
  border: 2px solid #E2E8F0;

  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .media-type {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .delete-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: rgba(239, 68, 68, 0.9);
    color: white;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover .delete-btn {
    opacity: 1;
  }

  .play-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;

  .tag-item {
    background: #EBF4FF;
    color: #1E40AF;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .remove-tag {
      background: none;
      color: #1E40AF;
      padding: 0;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: #DBEAFE;
      }
    }
  }

  .tag-input {
    flex: 1;
    min-width: 200px;
  }
`;

const FormActions = styled.div`
  padding: 2rem;
  border-top: 1px solid #E2E8F0;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  background: #F8FAFC;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  min-width: 120px;
  justify-content: center;

  &.primary {
    background: linear-gradient(135deg, #1E40AF, #1E3A8A);
    color: white;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(30, 64, 175, 0.3);
    }
  }

  &.secondary {
    background: #F1F5F9;
    color: #475569;
    border: 1px solid #E2E8F0;

    &:hover {
      background: #E2E8F0;
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const GalleryForm = ({ galleryItem, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'image',
    category: 'equipment',
    location: '',
    client: '',
    projectDate: '',
    tags: [],
    featured: false,
    seoTitle: '',
    seoDescription: ''
  });

  const [media, setMedia] = useState([]);
  const [newMedia, setNewMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newTag, setNewTag] = useState('');

  // Populate form if editing
  useEffect(() => {
    if (galleryItem) {
      setFormData({
        title: galleryItem.title || '',
        description: galleryItem.description || '',
        type: galleryItem.type || 'image',
        category: galleryItem.category || 'equipment',
        location: galleryItem.location || '',
        client: galleryItem.client || '',
        projectDate: galleryItem.projectDate ? galleryItem.projectDate.split('T')[0] : '',
        tags: galleryItem.tags || [],
        featured: galleryItem.featured || false,
        seoTitle: galleryItem.seoTitle || '',
        seoDescription: galleryItem.seoDescription || ''
      });
      setMedia(galleryItem.media || []);
    }
  }, [galleryItem]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewMedia(prev => [...prev, ...files]);
  };

  const removeNewMedia = (index) => {
    setNewMedia(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingMedia = (index) => {
    setMedia(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = new FormData();
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        if (key === 'tags') {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });

      // Add new media files
      newMedia.forEach(file => {
        submitData.append('media', file);
      });

      // Add existing media to preserve
      if (galleryItem && media.length > 0) {
        submitData.append('existingMedia', JSON.stringify(media));
      }

      const url = galleryItem ? `/api/gallery/${galleryItem.id}` : '/api/gallery';
      const method = galleryItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: submitData
      });

      const result = await response.json();

      if (response.ok) {
        onSave(result.galleryItem);
        onClose();
      } else {
        throw new Error(result.message || 'Failed to save gallery item');
      }
    } catch (error) {
      console.error('Error saving gallery item:', error);
      alert('Error saving gallery item: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { value: 'equipment', label: 'Equipment' },
    { value: 'installations', label: 'Installations' },
    { value: 'farms', label: 'Farms' },
    { value: 'products', label: 'Products' },
    { value: 'videos', label: 'Videos' },
    { value: 'testimonials', label: 'Testimonials' }
  ];

  return (
    <AnimatePresence>
      <FormOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <FormContainer
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <FormHeader>
            <FormTitle>
              {formData.type === 'video' ? <FiVideo size={24} /> : <FiImage size={24} />}
              {galleryItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
            </FormTitle>
            <CloseButton onClick={onClose}>
              <FiX size={20} />
            </CloseButton>
          </FormHeader>

          <FormBody>
            <form onSubmit={handleSubmit}>
              <FormGrid>
                <FormGroup>
                  <label>
                    <FiInfo size={16} />
                    Title <span className="required">*</span>
                  </label>
                  <FormInput
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter gallery item title"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    <FiTag size={16} />
                    Category <span className="required">*</span>
                  </label>
                  <FormSelect
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <label>Type</label>
                  <FormSelect
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option value="image">Image Gallery</option>
                    <option value="video">Video Content</option>
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <label>
                    <FiMapPin size={16} />
                    Location
                  </label>
                  <FormInput
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Lahore, Punjab"
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    <FiUser size={16} />
                    Client
                  </label>
                  <FormInput
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                    placeholder="Client or farm name"
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    <FiCalendar size={16} />
                    Project Date
                  </label>
                  <FormInput
                    type="date"
                    name="projectDate"
                    value={formData.projectDate}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </FormGrid>

              <FormGroup className="full-width">
                <label>
                  <FiInfo size={16} />
                  Description <span className="required">*</span>
                </label>
                <FormTextarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Detailed description of the project or content..."
                  required
                />
              </FormGroup>

              {/* Media Upload */}
              <FormGroup className="full-width">
                <label>
                  {formData.type === 'video' ? <FiVideo size={16} /> : <FiImage size={16} />}
                  Media Files <span className="required">*</span>
                </label>
                <MediaUpload>
                  <input
                    type="file"
                    multiple
                    accept={formData.type === 'video' ? 'video/*' : 'image/*'}
                    onChange={handleMediaUpload}
                    id="media-upload"
                  />
                  <label htmlFor="media-upload" style={{ cursor: 'pointer' }}>
                    <FiUpload className="upload-icon" size={32} />
                    <div className="upload-text">
                      Click to upload {formData.type === 'video' ? 'videos' : 'images'}
                    </div>
                    <div className="upload-hint">
                      {formData.type === 'video' 
                        ? 'MP4, MOV, AVI up to 100MB each'
                        : 'PNG, JPG, WEBP up to 5MB each'
                      }
                    </div>
                  </label>
                </MediaUpload>

                {(media.length > 0 || newMedia.length > 0) && (
                  <MediaPreview>
                    {media.map((mediaItem, index) => (
                      <MediaItem key={`existing-${index}`}>
                        {mediaItem.type === 'video' ? (
                          <>
                            <video src={mediaItem.url} />
                            <div className="play-overlay">
                              <FiPlay size={16} />
                            </div>
                          </>
                        ) : (
                          <img src={mediaItem.url} alt={mediaItem.alt} />
                        )}
                        <div className="media-type">
                          {mediaItem.type === 'video' ? <FiVideo size={12} /> : <FiImage size={12} />}
                          {mediaItem.type}
                        </div>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => removeExistingMedia(index)}
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </MediaItem>
                    ))}
                    {newMedia.map((file, index) => (
                      <MediaItem key={`new-${index}`}>
                        {file.type.startsWith('video/') ? (
                          <>
                            <video src={URL.createObjectURL(file)} />
                            <div className="play-overlay">
                              <FiPlay size={16} />
                            </div>
                          </>
                        ) : (
                          <img src={URL.createObjectURL(file)} alt="New upload" />
                        )}
                        <div className="media-type">
                          {file.type.startsWith('video/') ? <FiVideo size={12} /> : <FiImage size={12} />}
                          {file.type.startsWith('video/') ? 'video' : 'image'}
                        </div>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => removeNewMedia(index)}
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </MediaItem>
                    ))}
                  </MediaPreview>
                )}
              </FormGroup>

              {/* Tags */}
              <FormGroup className="full-width">
                <label>
                  <FiTag size={16} />
                  Tags
                </label>
                <TagInput>
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="tag-item">
                      {tag}
                      <button
                        type="button"
                        className="remove-tag"
                        onClick={() => removeTag(index)}
                      >
                        <FiX size={10} />
                      </button>
                    </div>
                  ))}
                  <FormInput
                    type="text"
                    className="tag-input"
                    placeholder="Add a tag and press Enter"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                  />
                </TagInput>
              </FormGroup>

              <FormGroup>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  Featured Item
                </label>
              </FormGroup>

              <FormActions>
                <ActionButton
                  type="button"
                  className="secondary"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </ActionButton>
                <ActionButton
                  type="submit"
                  className="primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    'Saving...'
                  ) : (
                    <>
                      <FiSave size={16} />
                      {galleryItem ? 'Update Item' : 'Create Item'}
                    </>
                  )}
                </ActionButton>
              </FormActions>
            </form>
          </FormBody>
        </FormContainer>
      </FormOverlay>
    </AnimatePresence>
  );
};

export default GalleryForm;