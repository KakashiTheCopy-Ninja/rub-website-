// src/pages/Products.js - Replace with this complete Products page
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSettings, 
  FiWind, 
  FiDroplet, 
  FiThermometer,
  FiShield,
  FiTool,
  FiPackage,
  FiGlobe,
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiStar,
  FiAward,
  FiTrendingUp
} from 'react-icons/fi';

const ProductsPage = styled.div`
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

// Filter and Search Section
const FilterSection = styled.section`
  padding: ${props => props.theme.spacing.xl} 0;
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const FilterControls = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchBox = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  input {
    width: 100%;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.sm} ${props => props.theme.spacing.sm} 40px;
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.base};
    font-size: ${props => props.theme.fontSizes.base};
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(43, 93, 65, 0.1);
    }
  }

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const FilterDropdown = styled.div`
  position: relative;
  
  .dropdown-trigger {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    background: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.base};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: ${props => props.theme.colors.primary};
    }
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.base};
    box-shadow: ${props => props.theme.shadows.lg};
    z-index: 100;
    margin-top: 4px;
  }

  .dropdown-item {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background: ${props => props.theme.colors.background};
    }

    &.active {
      background: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.white};
    }
  }
`;

// Products Grid Section
const ProductsSection = styled.section`
  padding: ${props => props.theme.spacing['3xl']} 0;
  background: ${props => props.theme.colors.white};
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const ProductCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.base};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, ${props => props.color}20, ${props => props.theme.colors.secondary}20);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  .icon {
    color: ${props => props.color || props.theme.colors.primary};
  }

  .category-badge {
    position: absolute;
    top: ${props => props.theme.spacing.sm};
    right: ${props => props.theme.spacing.sm};
    background: ${props => props.color || props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: ${props => props.theme.fontSizes.xs};
    font-weight: 500;
  }

  .rating {
    position: absolute;
    bottom: ${props => props.theme.spacing.sm};
    left: ${props => props.theme.spacing.sm};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
    background: rgba(255, 255, 255, 0.9);
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: ${props => props.theme.fontSizes.xs};
    font-weight: 500;

    .star {
      color: ${props => props.theme.colors.secondary};
    }
  }
`;

const ProductInfo = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const ProductTitle = styled.h3`
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 600;
`;

const ProductDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.5;
  font-size: ${props => props.theme.fontSizes.sm};
`;

const ProductFeatures = styled.ul`
  list-style: none;
  margin-bottom: ${props => props.theme.spacing.lg};

  li {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
    color: ${props => props.theme.colors.textSecondary};
    font-size: ${props => props.theme.fontSizes.sm};
    margin-bottom: ${props => props.theme.spacing.xs};

    .check-icon {
      color: ${props => props.theme.colors.success};
      flex-shrink: 0;
    }
  }
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const ProductOrigin = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.sm};

  .globe-icon {
    color: ${props => props.theme.colors.primary};
  }
`;

const ContactButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.base};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

// Categories Section
const CategoriesSection = styled.section`
  padding: ${props => props.theme.spacing['3xl']} 0;
  background: ${props => props.theme.colors.background};
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const CategoryCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.xl};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.base};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const CategoryIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, ${props => props.color}15, ${props => props.theme.colors.secondary}15);
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};
  transition: all 0.3s ease;

  svg {
    color: ${props => props.color};
  }
`;

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = ['All', 'Feeding Systems', 'Ventilation', 'Feed Additives', 'Water Systems', 'Monitoring'];

  const products = [
    {
      id: 1,
      title: "China Feeding System",
      category: "Feeding Systems",
      description: "Complete automated feeding system with precision control and monitoring capabilities.",
      features: ["Automated dispensing", "Precision control", "Remote monitoring", "Energy efficient"],
      origin: "China",
      rating: 4.8,
      color: "#2B5D41",
      icon: <FiSettings size={48} />
    },
    {
      id: 2,
      title: "USA Feeding System",
      category: "Feeding Systems", 
      description: "Premium quality feeding system from leading USA manufacturers with advanced technology.",
      features: ["Advanced automation", "IoT connectivity", "Real-time analytics", "Weather resistant"],
      origin: "USA",
      rating: 4.9,
      color: "#2B5D41",
      icon: <FiSettings size={48} />
    },
    {
      id: 3,
      title: "Malaysia Feeding System",
      category: "Feeding Systems",
      description: "Tropical climate optimized feeding system designed for humid environments.",
      features: ["Humidity resistant", "Corrosion proof", "Local support", "Cost effective"],
      origin: "Malaysia",
      rating: 4.7,
      color: "#2B5D41", 
      icon: <FiSettings size={48} />
    },
    {
      id: 4,
      title: "Exhaust Fan 36\"",
      category: "Ventilation",
      description: "High-efficiency exhaust fan for optimal air circulation in poultry houses.",
      features: ["High airflow", "Low noise", "Energy efficient", "Durable construction"],
      origin: "China",
      rating: 4.6,
      color: "#1B4332",
      icon: <FiWind size={48} />
    },
    {
      id: 5,
      title: "Exhaust Fan 42\"", 
      category: "Ventilation",
      description: "Medium capacity exhaust fan suitable for standard poultry farm operations.",
      features: ["Balanced airflow", "Variable speed", "Weather resistant", "Easy maintenance"],
      origin: "Thailand",
      rating: 4.7,
      color: "#1B4332",
      icon: <FiWind size={48} />
    },
    {
      id: 6,
      title: "Exhaust Fan 50\"",
      category: "Ventilation", 
      description: "Large capacity exhaust fan for industrial poultry farming operations.",
      features: ["High volume", "Heavy duty", "Variable control", "Long lifespan"],
      origin: "USA",
      rating: 4.8,
      color: "#1B4332",
      icon: <FiWind size={48} />
    },
    {
      id: 7,
      title: "Cooling Pad 2m4\"",
      category: "Ventilation",
      description: "Evaporative cooling pad system for temperature control in poultry houses.",
      features: ["Effective cooling", "Water efficient", "Easy installation", "Antibacterial"],
      origin: "China", 
      rating: 4.5,
      color: "#1B4332",
      icon: <FiThermometer size={48} />
    },
    {
      id: 8,
      title: "Cooling Pad 2m6\"",
      category: "Ventilation",
      description: "Large cooling pad system for comprehensive climate control solutions.",
      features: ["Maximum cooling", "Low maintenance", "Durable material", "Uniform distribution"],
      origin: "Thailand",
      rating: 4.6,
      color: "#1B4332", 
      icon: <FiThermometer size={48} />
    },
    {
      id: 9,
      title: "Vitamin & Mineral Premix",
      category: "Feed Additives",
      description: "Complete vitamin and mineral supplement for optimal poultry nutrition.",
      features: ["Complete nutrition", "Growth enhancement", "Immunity boost", "Quality certified"],
      origin: "Belgium",
      rating: 4.9,
      color: "#F4D03F",
      icon: <FiPackage size={48} />
    },
    {
      id: 10,
      title: "DL Methionine",
      category: "Feed Additives",
      description: "Essential amino acid supplement for protein synthesis and growth.",
      features: ["High purity", "Enhanced absorption", "Growth promotion", "Feather development"],
      origin: "Germany",
      rating: 4.8,
      color: "#F4D03F",
      icon: <FiPackage size={48} />
    },
    {
      id: 11,
      title: "L-Lysine",
      category: "Feed Additives",
      description: "Critical amino acid for muscle development and protein efficiency.",
      features: ["Muscle development", "Protein efficiency", "Feed conversion", "Quality assured"],
      origin: "USA",
      rating: 4.7,
      color: "#F4D03F",
      icon: <FiPackage size={48} />
    },
    {
      id: 12,
      title: "Choline Chloride",
      category: "Feed Additives",
      description: "Essential nutrient for liver function and fat metabolism in poultry.",
      features: ["Liver support", "Fat metabolism", "Egg production", "Nervous system"],
      origin: "China",
      rating: 4.6,
      color: "#F4D03F",
      icon: <FiPackage size={48} />
    },
    {
      id: 13,
      title: "Automatic Water System",
      category: "Water Systems",
      description: "Complete automated water delivery system with pressure regulation.",
      features: ["Constant pressure", "Clean water", "Automatic refill", "Leak detection"],
      origin: "Netherlands",
      rating: 4.8,
      color: "#0EA5E9",
      icon: <FiDroplet size={48} />
    },
    {
      id: 14,
      title: "Nipple Drinking System",
      category: "Water Systems",
      description: "Hygienic nipple-based drinking system for clean water access.",
      features: ["Hygienic design", "Water saving", "Easy cleaning", "Rust resistant"],
      origin: "Italy",
      rating: 4.7,
      color: "#0EA5E9", 
      icon: <FiDroplet size={48} />
    },
    {
      id: 15,
      title: "Environmental Controller",
      category: "Monitoring",
      description: "Advanced environmental monitoring and control system for optimal conditions.",
      features: ["Real-time monitoring", "Automated control", "Data logging", "Mobile alerts"],
      origin: "Denmark",
      rating: 4.9,
      color: "#8B5CF6",
      icon: <FiTool size={48} />
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const mainCategories = [
    {
      title: "Feeding & Drinking Systems",
      description: "Complete automated feeding and drinking solutions from leading global manufacturers",
      icon: <FiSettings size={48} />,
      color: "#2B5D41",
      count: products.filter(p => p.category === 'Feeding Systems' || p.category === 'Water Systems').length
    },
    {
      title: "Ventilation Equipment", 
      description: "Advanced ventilation systems for optimal poultry house environment control",
      icon: <FiWind size={48} />,
      color: "#1B4332",
      count: products.filter(p => p.category === 'Ventilation').length
    },
    {
      title: "Feed Additives & Nutrition",
      description: "Premium quality feed additives for enhanced poultry nutrition and performance", 
      icon: <FiPackage size={48} />,
      color: "#F4D03F",
      count: products.filter(p => p.category === 'Feed Additives').length
    }
  ];

  return (
    <ProductsPage>
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
              Our Products
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'rgba(255, 255, 255, 0.9)' }}
            >
              Complete range of poultry equipment and feed additives from leading global manufacturers
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F4D03F' }}>150+</div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>Products Available</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F4D03F' }}>10+</div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>Global Partners</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F4D03F' }}>20+</div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>Years Experience</div>
              </div>
            </motion.div>
          </HeroContent>
        </div>
      </HeroSection>

      {/* Categories Overview */}
      <CategoriesSection>
        <div className="container">
          <motion.h2
            style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', fontWeight: 700 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Product Categories
          </motion.h2>

          <CategoriesGrid>
            {mainCategories.map((category, index) => (
              <CategoryCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CategoryIcon color={category.color}>
                  {category.icon}
                </CategoryIcon>
                <h3 style={{ marginBottom: '1rem', color: '#2B5D41' }}>{category.title}</h3>
                <p style={{ color: '#5A6B5D', marginBottom: '1rem' }}>{category.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: category.color, fontWeight: 600 }}>
                  <FiTrendingUp size={16} />
                  {category.count} Products Available
                </div>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        </div>
      </CategoriesSection>

      {/* Filter Section */}
      <FilterSection>
        <div className="container">
          <FilterControls>
            <SearchBox>
              <FiSearch className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBox>

            <FilterDropdown>
              <div 
                className="dropdown-trigger"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FiFilter size={16} />
                <span>{selectedCategory}</span>
                <FiChevronDown size={16} />
              </div>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    className="dropdown-menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {categories.map((category) => (
                      <div
                        key={category}
                        className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {category}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </FilterDropdown>

            <div style={{ color: '#5A6B5D', fontSize: '0.9rem' }}>
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </FilterControls>
        </div>
      </FilterSection>

      {/* Products Grid */}
      <ProductsSection>
        <div className="container">
          <ProductsGrid>
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  layout
                >
                  <ProductImage color={product.color}>
                    <div className="icon">
                      {product.icon}
                    </div>
                    <div className="category-badge">
                      {product.category}
                    </div>
                    <div className="rating">
                      <FiStar className="star" size={14} />
                      {product.rating}
                    </div>
                  </ProductImage>

                  <ProductInfo>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductDescription>{product.description}</ProductDescription>
                    
                    <ProductFeatures>
                      {product.features.map((feature, idx) => (
                        <li key={idx}>
                          <FiShield className="check-icon" size={12} />
                          {feature}
                        </li>
                      ))}
                    </ProductFeatures>

                    <ProductFooter>
                      <ProductOrigin>
                        <FiGlobe className="globe-icon" size={14} />
                        Made in {product.origin}
                      </ProductOrigin>
                      <ContactButton>
                        Get Quote
                      </ContactButton>
                    </ProductFooter>
                  </ProductInfo>
                </ProductCard>
              ))}
            </AnimatePresence>
          </ProductsGrid>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ 
                textAlign: 'center', 
                padding: '4rem 2rem',
                color: '#5A6B5D'
              }}
            >
              <FiSearch size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h3 style={{ marginBottom: '0.5rem' }}>No products found</h3>
              <p>Try adjusting your search terms or filters</p>
            </motion.div>
          )}
        </div>
      </ProductsSection>
    </ProductsPage>
  );
};

export default Products;