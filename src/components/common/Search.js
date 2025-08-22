// src/components/common/Search.js - Create this new file
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiX, 
  FiArrowRight,
  FiSettings,
  FiPackage,
  FiImage,
  FiUsers,
  FiMapPin
} from 'react-icons/fi';

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchTrigger = styled.button`
  background: transparent;
  color: ${props => props.isScrolled ? props.theme.colors.textPrimary : props.theme.colors.white};
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.base};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.isScrolled ? props.theme.colors.background : 'rgba(255, 255, 255, 0.1)'};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const SearchOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: ${props => props.theme.spacing['4xl']} ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg};
    align-items: center;
  }
`;

const SearchContainer = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.xl};
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
`;

const SearchHeader = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.md} ${props => props.theme.spacing.md} 50px;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.base};
  font-size: ${props => props.theme.fontSizes.lg};
  background: ${props => props.theme.colors.background};
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textLight};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${props => props.theme.spacing.lg};
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
  pointer-events: none;
`;

const CloseButton = styled.button`
  position: absolute;
  right: ${props => props.theme.spacing.lg};
  top: 50%;
  transform: translateY(-50%);
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.textSecondary};
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.full};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.textPrimary};
  }
`;

const SearchResults = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.sm} 0;
`;

const ResultSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h4`
  color: ${props => props.theme.colors.textPrimary};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  margin: 0;
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const ResultItem = styled.div`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};

  &:hover {
    background: ${props => props.theme.colors.background};
    
    .arrow {
      transform: translateX(5px);
      opacity: 1;
    }
  }
`;

const ResultIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.color}20;
  border-radius: ${props => props.theme.borderRadius.base};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
  flex-shrink: 0;
`;

const ResultContent = styled.div`
  flex: 1;

  .title {
    color: ${props => props.theme.colors.textPrimary};
    font-weight: 500;
    margin-bottom: ${props => props.theme.spacing.xs};
    font-size: ${props => props.theme.fontSizes.base};
  }

  .description {
    color: ${props => props.theme.colors.textSecondary};
    font-size: ${props => props.theme.fontSizes.sm};
    line-height: 1.4;
  }

  .type {
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.fontSizes.xs};
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const ResultArrow = styled.div`
  color: ${props => props.theme.colors.textLight};
  transition: all 0.3s ease;
  opacity: 0.5;
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing['3xl']} ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.textSecondary};
  
  .icon {
    color: ${props => props.theme.colors.textLight};
    margin-bottom: ${props => props.theme.spacing.lg};
  }
  
  h4 {
    margin-bottom: ${props => props.theme.spacing.sm};
  }
`;

const QuickActions = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
`;

const ActionButton = styled.button`
  width: 100%;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.base};
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const Search = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Sample search data - in real app, this would come from API
  const searchData = [
    {
      id: 1,
      title: "China Feeding System",
      description: "Complete automated feeding system with precision control",
      type: "product",
      category: "Equipment",
      route: "/products",
      icon: <FiSettings size={20} />,
      color: "#2B5D41"
    },
    {
      id: 2,
      title: "Exhaust Fan 42\"",
      description: "Medium capacity exhaust fan for poultry ventilation",
      type: "product", 
      category: "Equipment",
      route: "/products",
      icon: <FiSettings size={20} />,
      color: "#1B4332"
    },
    {
      id: 3,
      title: "About R.U.B Associates",
      description: "Learn about our company history and mission",
      type: "page",
      category: "Company",
      route: "/about",
      icon: <FiUsers size={20} />,
      color: "#F4D03F"
    },
    {
      id: 4,
      title: "Installation Gallery",
      description: "View our recent installations and projects",
      type: "page",
      category: "Gallery",
      route: "/gallery",
      icon: <FiImage size={20} />,
      color: "#0EA5E9"
    },
    {
      id: 5,
      title: "Contact Us",
      description: "Get in touch with our expert team",
      type: "page",
      category: "Contact",
      route: "/contact",
      icon: <FiMapPin size={20} />,
      color: "#10B981"
    },
    {
      id: 6,
      title: "Vitamin & Mineral Premix",
      description: "Complete nutrition supplement for poultry",
      type: "product",
      category: "Feed Additives",
      route: "/products",
      icon: <FiPackage size={20} />,
      color: "#F4D03F"
    }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleResultClick = (item) => {
    navigate(item.route);
    setIsOpen(false);
    setQuery('');
  };

  const groupedResults = results.reduce((groups, item) => {
    const group = groups[item.type] || [];
    group.push(item);
    groups[item.type] = group;
    return groups;
  }, {});

  return (
    <SearchWrapper>
      <SearchTrigger 
        isScrolled={isScrolled}
        onClick={() => setIsOpen(true)}
        title="Search (Ctrl/Cmd + K)"
      >
        <FiSearch size={20} />
      </SearchTrigger>

      <AnimatePresence>
        {isOpen && (
          <SearchOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <SearchContainer
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <SearchHeader>
                <SearchIcon>
                  <FiSearch size={20} />
                </SearchIcon>
                <SearchInput
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, pages, and more..."
                />
                <CloseButton onClick={() => setIsOpen(false)}>
                  <FiX size={20} />
                </CloseButton>
              </SearchHeader>

              <SearchResults>
                {isLoading ? (
                  <NoResults>
                    <div className="icon">
                      <FiSearch size={32} />
                    </div>
                    <p>Searching...</p>
                  </NoResults>
                ) : results.length === 0 && query.trim() !== '' ? (
                  <NoResults>
                    <div className="icon">
                      <FiSearch size={32} />
                    </div>
                    <h4>No results found</h4>
                    <p>Try different keywords or browse our products directly</p>
                  </NoResults>
                ) : results.length === 0 ? (
                  <NoResults>
                    <div className="icon">
                      <FiSearch size={32} />
                    </div>
                    <h4>Start typing to search</h4>
                    <p>Find products, services, and information quickly</p>
                  </NoResults>
                ) : (
                  Object.entries(groupedResults).map(([type, items]) => (
                    <ResultSection key={type}>
                      <SectionTitle>
                        {type === 'product' ? 'Products' : 'Pages'}
                      </SectionTitle>
                      {items.map((item) => (
                        <ResultItem 
                          key={item.id}
                          onClick={() => handleResultClick(item)}
                        >
                          <ResultIcon color={item.color}>
                            {item.icon}
                          </ResultIcon>
                          <ResultContent>
                            <div className="type">{item.category}</div>
                            <div className="title">{item.title}</div>
                            <div className="description">{item.description}</div>
                          </ResultContent>
                          <ResultArrow className="arrow">
                            <FiArrowRight size={16} />
                          </ResultArrow>
                        </ResultItem>
                      ))}
                    </ResultSection>
                  ))
                )}
              </SearchResults>

              {query.trim() === '' && (
                <QuickActions>
                  <ActionButton onClick={() => { navigate('/products'); setIsOpen(false); }}>
                    <FiPackage size={16} />
                    Browse All Products
                  </ActionButton>
                </QuickActions>
              )}
            </SearchContainer>
          </SearchOverlay>
        )}
      </AnimatePresence>
    </SearchWrapper>
  );
};

export default Search;