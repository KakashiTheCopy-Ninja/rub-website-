// src/pages/Gallery.js - Replace with this complete Gallery page
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiImage, 
  FiVideo, 
  FiPlay,
  FiX,
  FiMapPin,
  FiChevronLeft,
  FiChevronRight,
  FiTrendingUp,
  FiHome,      // ✅ instead of FiBuilding
  FiSettings,
  FiWind,
  FiDroplet,
  FiPackage,
  FiUsers,
  FiAward,
  FiFilter
} from 'react-icons/fi';

const GalleryPage = styled.div`
  padding-top: 120px;
  min-height: 100vh;
`;

// Hero Section
const HeroSection = styled.section`
  padding: ${props => props.theme.spacing['3xl']} 0;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.primaryDark} 100%);
  color: ${props => props.theme.colors.white};
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23F4D03F" fill-opacity="0.1"><circle cx="30" cy="30" r="2"/></g></g></svg>');
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
`;

// Filter Section
const FilterSection = styled.section`
  padding: ${props => props.theme.spacing.xl} 0;
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FilterTab = styled.button`
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.textSecondary};
  border: 2px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.full};
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

// Gallery Grid
const GallerySection = styled.section`
  padding: ${props => props.theme.spacing['3xl']} 0;
  background: ${props => props.theme.colors.white};
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

const GalleryItem = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.base};
  border: 1px solid ${props => props.theme.colors.border};
  cursor: pointer;
  transition: all 0.3s ease;
  height: ${props => props.type === 'video' ? '320px' : '280px'};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const ItemImage = styled.div`
  height: ${props => props.type === 'video' ? '220px' : '200px'};
  background: linear-gradient(135deg, ${props => props.color}20, ${props => props.theme.colors.secondary}20);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .icon {
    color: ${props => props.color};
    opacity: 0.6;
  }

  .play-button {
    position: absolute;
    background: rgba(0, 0, 0, 0.7);
    color: ${props => props.theme.colors.white};
    border-radius: ${props => props.theme.borderRadius.full};
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.8);
      transform: scale(1.1);
    }
  }

  .category-badge {
    position: absolute;
    top: ${props => props.theme.spacing.sm};
    right: ${props => props.theme.spacing.sm};
    background: ${props => props.color};
    color: ${props => props.theme.colors.white};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: ${props => props.theme.fontSizes.xs};
    font-weight: 500;
  }

  .image-count {
    position: absolute;
    bottom: ${props => props.theme.spacing.sm};
    right: ${props => props.theme.spacing.sm};
    background: rgba(0, 0, 0, 0.7);
    color: ${props => props.theme.colors.white};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: ${props => props.theme.fontSizes.xs};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
  }
`;

const ItemInfo = styled.div`
  padding: ${props => props.theme.spacing.lg};

  h3 {
    color: ${props => props.theme.colors.textPrimary};
    margin-bottom: ${props => props.theme.spacing.sm};
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: 600;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: ${props => props.theme.fontSizes.sm};
    line-height: 1.5;
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  .metadata {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme.colors.textLight};
    font-size: ${props => props.theme.fontSizes.xs};

    .location {
      display: flex;
      align-items: center;
      gap: ${props => props.theme.spacing.xs};
    }
  }
`;

// Modal/Lightbox
const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${props => props.theme.spacing.lg};
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
`;

const ModalImage = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, ${props => props.color}20, ${props => props.theme.colors.secondary}20);
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    color: ${props => props.color};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 250px;
  }
`;

const ModalInfo = styled.div`
  padding: ${props => props.theme.spacing.xl};

  h3 {
    color: ${props => props.theme.colors.textPrimary};
    margin-bottom: ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.fontSizes.xl};
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing.lg};
  }

  .details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: ${props => props.theme.spacing.md};
    
    .detail-item {
      .label {
        color: ${props => props.theme.colors.textLight};
        font-size: ${props => props.theme.fontSizes.xs};
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: ${props => props.theme.spacing.xs};
      }
      
      .value {
        color: ${props => props.theme.colors.textPrimary};
        font-weight: 500;
      }
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  background: rgba(0, 0, 0, 0.5);
  color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.full};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: scale(1.1);
  }
`;

// Testimonials Section
const TestimonialsSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.background};
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const TestimonialCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.base};
  border: 1px solid ${props => props.theme.colors.border};
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  .quote {
    color: ${props => props.theme.colors.textSecondary};
    font-style: italic;
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing.lg};
    font-size: ${props => props.theme.fontSizes.base};
  }

  .author {
    .name {
      color: ${props => props.theme.colors.textPrimary};
      font-weight: 600;
      margin-bottom: ${props => props.theme.spacing.xs};
    }
    
    .company {
      color: ${props => props.theme.colors.primary};
      font-size: ${props => props.theme.fontSizes.sm};
      margin-bottom: ${props => props.theme.spacing.xs};
    }
    
    .location {
      color: ${props => props.theme.colors.textLight};
      font-size: ${props => props.theme.fontSizes.xs};
    }
  }
`;

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filters = [
    { id: 'all', label: 'All', icon: <FiImage size={16} /> },
    { id: 'equipment', label: 'Equipment', icon: <FiSettings size={16} /> },
    { id: 'installations', label: 'Installations', icon: <FiHome size={16} /> },
    { id: 'farms', label: 'Farms', icon: <FiUsers size={16} /> },
    { id: 'products', label: 'Products', icon: <FiPackage size={16} /> },
    { id: 'videos', label: 'Videos', icon: <FiVideo size={16} /> }
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Automated Feeding System Installation",
      description: "Complete feeding system installation at a 50,000 bird capacity poultry farm in Lahore.",
      category: "installations",
      type: "image",
      color: "#2B5D41",
      icon: <FiSettings size={64} />,
      location: "Lahore, Punjab",
      date: "March 2024",
      client: "Green Valley Farms",
      images: 8
    },
    {
      id: 2,
      title: "Ventilation System Setup",
      description: "Advanced ventilation system with 42\" exhaust fans and cooling pads for optimal climate control.",
      category: "installations", 
      type: "image",
      color: "#1B4332",
      icon: <FiWind size={64} />,
      location: "Faisalabad, Punjab",
      date: "February 2024",
      client: "Punjab Poultry Ltd",
      images: 12
    },
    {
      id: 3,
      title: "Feed Mill Equipment",
      description: "Complete feed mill setup with mixing, grinding, and packaging equipment.",
      category: "equipment",
      type: "image", 
      color: "#F4D03F",
      icon: <FiPackage size={64} />,
      location: "Karachi, Sindh",
      date: "January 2024",
      client: "Sindh Feed Mills",
      images: 15
    },
    {
      id: 4,
      title: "Modern Poultry Farm Tour",
      description: "Virtual tour of a state-of-the-art poultry facility equipped with our complete automation system.",
      category: "videos",
      type: "video",
      color: "#2B5D41",
      icon: <FiHome size={64} />,
      location: "Rawalpindi, Punjab", 
      date: "April 2024",
      client: "Model Farm Complex",
      duration: "5:30"
    },
    {
      id: 5,
      title: "Drinking Water System",
      description: "Hygienic nipple drinking system installation ensuring clean water access for 30,000 birds.",
      category: "installations",
      type: "image",
      color: "#0EA5E9", 
      icon: <FiDroplet size={64} />,
      location: "Multan, Punjab",
      date: "March 2024",
      client: "Southern Poultry Co.",
      images: 6
    },
    {
      id: 6,
      title: "Feed Additives Range", 
      description: "Complete range of premium feed additives including vitamins, minerals, and growth promoters.",
      category: "products",
      type: "image",
      color: "#F4D03F",
      icon: <FiPackage size={64} />,
      location: "Rawalpindi Office",
      date: "Ongoing",
      client: "Available Nationwide",
      images: 20
    },
    {
      id: 7,
      title: "Large Scale Farm Operation",
      description: "100,000 bird capacity commercial poultry operation with full automation and monitoring.",
      category: "farms",
      type: "image", 
      color: "#2B5D41",
      icon: <FiUsers size={64} />,
      location: "Gujranwala, Punjab",
      date: "February 2024",
      client: "Mega Poultry Farms",
      images: 25
    },
    {
      id: 8,
      title: "Equipment Installation Process",
      description: "Step-by-step installation process of feeding and drinking systems by our expert team.",
      category: "videos", 
      type: "video",
      color: "#1B4332",
      icon: <FiSettings size={64} />,
      location: "Multiple Locations",
      date: "March 2024",
      client: "Installation Guide",
      duration: "8:45"
    },
    {
      id: 9,
      title: "Climate Control Systems",
      description: "Advanced environmental control systems maintaining optimal temperature and humidity.",
      category: "equipment",
      type: "image",
      color: "#1B4332",
      icon: <FiWind size={64} />,
      location: "Sialkot, Punjab", 
      date: "January 2024",
      client: "Climate Tech Farms",
      images: 10
    },
    {
      id: 10,
      title: "Success Story: 200% ROI",
      description: "Case study showing how our solutions helped achieve 200% return on investment in 18 months.",
      category: "farms",
      type: "video",
      color: "#10B981",
      icon: <FiTrendingUp size={64} />,
      location: "Kasur, Punjab",
      date: "April 2024", 
      client: "Success Poultry Farm",
      duration: "12:20"
    }
  ];

  const testimonials = [
    {
      quote: "R.U.B Associates transformed our farm with their automated feeding system. Our productivity increased by 35% within 6 months!",
      name: "Ahmad Ali",
      company: "Green Valley Farms",
      location: "Lahore, Punjab"
    },
    {
      quote: "The quality of equipment and after-sales support is exceptional. Their technical team is always available when we need them.",
      name: "Muhammad Hassan",
      company: "Punjab Poultry Ltd", 
      location: "Faisalabad, Punjab"
    },
    {
      quote: "Best investment we made for our poultry business. The feed additives significantly improved our bird health and growth rates.",
      name: "Fatima Sheikh",
      company: "Modern Farms Ltd",
      location: "Karachi, Sindh"
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <GalleryPage>
      {/* Hero Section */}
      <HeroSection>
        <div className="container">
          <HeroContent>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}
            >
              Gallery
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'rgba(255, 255, 255, 0.9)' }}
            >
              Explore our projects, installations, and success stories from across Pakistan
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F4D03F' }}>100+</div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>Projects Completed</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F4D03F' }}>45+</div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>Happy Clients</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F4D03F' }}>500+</div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>Images & Videos</div>
              </div>
            </motion.div>
          </HeroContent>
        </div>
      </HeroSection>

      {/* Filter Section */}
      <FilterSection>
        <div className="container">
          <FilterTabs>
            {filters.map((filter) => (
              <FilterTab
                key={filter.id}
                active={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.icon}
                {filter.label}
              </FilterTab>
            ))}
          </FilterTabs>
          
          <div style={{ textAlign: 'center', color: '#5A6B5D', fontSize: '0.9rem' }}>
            Showing {filteredItems.length} {activeFilter === 'all' ? 'items' : `${activeFilter} items`}
          </div>
        </div>
      </FilterSection>

      {/* Gallery Grid */}
      <GallerySection>
        <div className="container">
          <GalleryGrid>
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <GalleryItem
                  key={item.id}
                  type={item.type}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  layout
                  onClick={() => openModal(item)}
                >
                  <ItemImage color={item.color} type={item.type}>
                    <div className="icon">
                      {item.icon}
                    </div>
                    
                    <div className="category-badge">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </div>

                    {item.type === 'video' && (
                      <div className="play-button">
                        <FiPlay size={24} />
                      </div>
                    )}

                    {item.type === 'image' && item.images && (
                      <div className="image-count">
                        <FiImage size={12} />
                        {item.images} photos
                      </div>
                    )}
                  </ItemImage>

                  <ItemInfo>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="metadata">
                      <div className="location">
                        <FiMapPin size={12} />
                        {item.location}
                      </div>
                      <div className="date">{item.date}</div>
                    </div>
                  </ItemInfo>
                </GalleryItem>
              ))}
            </AnimatePresence>
          </GalleryGrid>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ 
                textAlign: 'center', 
                padding: '4rem 2rem',
                color: '#5A6B5D'
              }}
            >
              <FiFilter size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h3 style={{ marginBottom: '0.5rem' }}>No items found</h3>
              <p>Try selecting a different filter</p>
            </motion.div>
          )}
        </div>
      </GallerySection>

      {/* Testimonials Section */}
      <TestimonialsSection>
        <div className="container">
          <motion.h2
            style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', fontWeight: 700, color: '#2B5D41' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Client Success Stories
          </motion.h2>

          <TestimonialGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="quote">"{testimonial.quote}"</div>
                <div className="author">
                  <div className="name">{testimonial.name}</div>
                  <div className="company">{testimonial.company}</div>
                  <div className="location">{testimonial.location}</div>
                </div>
              </TestimonialCard>
            ))}
          </TestimonialGrid>
        </div>
      </TestimonialsSection>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal}>
                <FiX size={20} />
              </CloseButton>

              <ModalImage color={selectedItem.color}>
                <div className="icon">
                  {selectedItem.icon}
                </div>
                {selectedItem.type === 'video' && (
                  <div className="play-button" style={{ position: 'absolute' }}>
                    <FiPlay size={32} />
                  </div>
                )}
              </ModalImage>

              <ModalInfo>
                <h3>{selectedItem.title}</h3>
                <p>{selectedItem.description}</p>
                
                <div className="details">
                  <div className="detail-item">
                    <div className="label">Client</div>
                    <div className="value">{selectedItem.client}</div>
                  </div>
                  <div className="detail-item">
                    <div className="label">Location</div>
                    <div className="value">{selectedItem.location}</div>
                  </div>
                  <div className="detail-item">
                    <div className="label">Date</div>
                    <div className="value">{selectedItem.date}</div>
                  </div>
                  {selectedItem.images && (
                    <div className="detail-item">
                      <div className="label">Photos</div>
                      <div className="value">{selectedItem.images} images</div>
                    </div>
                  )}
                  {selectedItem.duration && (
                    <div className="detail-item">
                      <div className="label">Duration</div>
                      <div className="value">{selectedItem.duration}</div>
                    </div>
                  )}
                </div>
              </ModalInfo>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </GalleryPage>
  );
};

export default Gallery;