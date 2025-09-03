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
  FiPackage,
  FiDollarSign,
  FiGlobe,
  FiTag,
  FiInfo
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
  max-width: 800px;
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

  &::placeholder {
    color: #94A3B8;
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

const ImageUpload = styled.div`
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

  &.dragover {
    border-color: #1E40AF;
    background: #EBF4FF;
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

const ImagePreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const ImageItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #F1F5F9;
  border: 2px solid #E2E8F0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .delete-btn {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    background: rgba(239, 68, 68, 0.9);
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover .delete-btn {
    opacity: 1;
  }
`;

const DynamicList = styled.div`
  .list-item {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    align-items: center;

    input {
      flex: 1;
    }

    .remove-btn {
      background: #FEF2F2;
      color: #DC2626;
      border: 1px solid #FECACA;
      border-radius: 0.375rem;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      &:hover {
        background: #FEE2E2;
      }
    }
  }

  .add-btn {
    background: #EBF4FF;
    color: #1E40AF;
    border: 1px solid #BFDBFE;
    border-radius: 0.375rem;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    transition: all 0.3s ease;

    &:hover {
      background: #DBEAFE;
    }
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

const ProductForm = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    currency: 'PKR',
    origin: '',
    manufacturer: '',
    inStock: true,
    stockQuantity: 0,
    specifications: [],
    features: [],
    tags: [],
    seoTitle: '',
    seoDescription: ''
  });

  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Load categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Populate form if editing
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        category: product.category || '',
        price: product.price || '',
        currency: product.currency || 'PKR',
        origin: product.origin || '',
        manufacturer: product.manufacturer || '',
        inStock: product.inStock !== undefined ? product.inStock : true,
        stockQuantity: product.stockQuantity || 0,
        specifications: product.specifications || [],
        features: product.features || [],
        tags: product.tags || [],
        seoTitle: product.seoTitle || '',
        seoDescription: product.seoDescription || ''
      });
      setImages(product.images || []);
    }
  }, [product]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      setNewImages(prev => [...prev, ...imageFiles]);
    }
  };

  const removeNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { name: '', value: '' }]
    }));
  };

  const updateSpecification = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) => 
        i === index ? { ...spec, [field]: value } : spec
      )
    }));
  };

  const removeSpecification = (index) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index, value) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }));
  };

  const updateTag = (index, value) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.map((tag, i) => i === index ? value : tag)
    }));
  };

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = new FormData();
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        if (key === 'specifications' || key === 'features' || key === 'tags') {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });

      // Add new images
      newImages.forEach(image => {
        submitData.append('images', image);
      });

      // Add existing images to preserve
      if (product && images.length > 0) {
        submitData.append('existingImages', JSON.stringify(images));
      }

      const url = product ? `/api/products/${product.id}` : '/api/products';
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: submitData
      });

      const result = await response.json();

      if (response.ok) {
        onSave(result.product);
        onClose();
      } else {
        throw new Error(result.message || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
              <FiPackage size={24} />
              {product ? 'Edit Product' : 'Add New Product'}
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
                    <FiPackage size={16} />
                    Product Name <span className="required">*</span>
                  </label>
                  <FormInput
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
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
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <label>
                    <FiDollarSign size={16} />
                    Price <span className="required">*</span>
                  </label>
                  <FormInput
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Currency</label>
                  <FormSelect
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                  >
                    <option value="PKR">PKR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <label>
                    <FiGlobe size={16} />
                    Origin <span className="required">*</span>
                  </label>
                  <FormInput
                    type="text"
                    name="origin"
                    value={formData.origin}
                    onChange={handleInputChange}
                    placeholder="e.g., China, USA, Germany"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Manufacturer</label>
                  <FormInput
                    type="text"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                    placeholder="Manufacturer name"
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
                  placeholder="Detailed product description..."
                  required
                />
              </FormGroup>

              {/* Image Upload */}
              <FormGroup className="full-width">
                <label>
                  <FiImage size={16} />
                  Product Images
                </label>
                <ImageUpload>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                    <FiUpload className="upload-icon" size={32} />
                    <div className="upload-text">Click to upload images</div>
                    <div className="upload-hint">PNG, JPG, WEBP up to 5MB each</div>
                  </label>
                </ImageUpload>

                {(images.length > 0 || newImages.length > 0) && (
                  <ImagePreview>
                    {images.map((image, index) => (
                      <ImageItem key={`existing-${index}`}>
                        <img src={image.url} alt={image.alt} />
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => removeExistingImage(index)}
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </ImageItem>
                    ))}
                    {newImages.map((image, index) => (
                      <ImageItem key={`new-${index}`}>
                        <img src={URL.createObjectURL(image)} alt="New upload" />
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => removeNewImage(index)}
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </ImageItem>
                    ))}
                  </ImagePreview>
                )}
              </FormGroup>

              {/* Specifications */}
              <FormGroup className="full-width">
                <label>Specifications</label>
                <DynamicList>
                  {formData.specifications.map((spec, index) => (
                    <div key={index} className="list-item">
                      <FormInput
                        type="text"
                        placeholder="Specification name"
                        value={spec.name}
                        onChange={(e) => updateSpecification(index, 'name', e.target.value)}
                      />
                      <FormInput
                        type="text"
                        placeholder="Value"
                        value={spec.value}
                        onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                      />
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeSpecification(index)}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-btn"
                    onClick={addSpecification}
                  >
                    <FiPlus size={14} />
                    Add Specification
                  </button>
                </DynamicList>
              </FormGroup>

              {/* Features */}
              <FormGroup className="full-width">
                <label>Features</label>
                <DynamicList>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="list-item">
                      <FormInput
                        type="text"
                        placeholder="Feature description"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                      />
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeFeature(index)}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-btn"
                    onClick={addFeature}
                  >
                    <FiPlus size={14} />
                    Add Feature
                  </button>
                </DynamicList>
              </FormGroup>

              {/* Tags */}
              <FormGroup className="full-width">
                <label>Tags</label>
                <DynamicList>
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="list-item">
                      <FormInput
                        type="text"
                        placeholder="Tag"
                        value={tag}
                        onChange={(e) => updateTag(index, e.target.value)}
                      />
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeTag(index)}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-btn"
                    onClick={addTag}
                  >
                    <FiPlus size={14} />
                    Add Tag
                  </button>
                </DynamicList>
              </FormGroup>

              <FormGrid>
                <FormGroup>
                  <label>Stock Quantity</label>
                  <FormInput
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    min="0"
                  />
                </FormGroup>

                <FormGroup>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleInputChange}
                    />
                    In Stock
                  </label>
                </FormGroup>
              </FormGrid>

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
                      {product ? 'Update Product' : 'Create Product'}
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

export default ProductForm;