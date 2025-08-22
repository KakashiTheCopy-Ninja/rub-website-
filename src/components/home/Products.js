// src/components/home/Products.js - Create this file
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiSettings, 
  FiWind, 
  FiDroplet, 
  FiThermometer,
  FiShield,
  FiTool,
  FiArrowRight,
  FiGlobe
} from 'react-icons/fi';

const ProductsSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: linear-gradient(135deg, ${props => props.theme.colors.background} 0%, #f0f7f0 100%);
  position: relative;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['4xl']};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: 700;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.md};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    border-radius: 2px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ProductCategories = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing['3xl']};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const CategoryCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.base};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.color || props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.xl};

    .icon {
      transform: scale(1.1);
    }
  }
`;

const CategoryIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${props => props.color || props.theme.colors.primary}15, ${props => props.theme.colors.secondary}15);
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  transition: all 0.3s ease;

  svg {
    color: ${props => props.color || props.theme.colors.primary};
  }
`;

const CategoryTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 600;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const CategoryDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ProductList = styled.ul`
  list-style: none;
  margin-bottom: ${props => props.theme.spacing.lg};

  li {
    color: ${props => props.theme.colors.textSecondary};
    font-size: ${props => props.theme.fontSizes.sm};
    margin-bottom: ${props => props.theme.spacing.xs};
    position: relative;
    padding-left: ${props => props.theme.spacing.lg};

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: ${props => props.theme.colors.secondary};
      font-weight: bold;
      font-size: ${props => props.theme.fontSizes.lg};
    }
  }
`;

const PartnersSection = styled.div`
  text-align: center;
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing['3xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.base};
`;

const PartnersTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: 600;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};

  svg {
    color: ${props => props.theme.colors.secondary};
  }
`;

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PartnerCard = styled.div`
  background: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.base};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.md};
    border-color: ${props => props.theme.colors.secondary};
  }

  .country {
    font-size: ${props => props.theme.fontSizes.xs};
    color: ${props => props.theme.colors.textLight};
    margin-bottom: ${props => props.theme.spacing.xs};
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .company {
    font-weight: 600;
    color: ${props => props.theme.colors.textPrimary};
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

const CTAButton = styled(Link)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryDark});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.base};
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.lg};
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all 0.3s ease;
  text-decoration: none;
  box-shadow: ${props => props.theme.shadows.lg};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const Products = () => {
  const productCategories = [
    {
      icon: <FiSettings size={32} />,
      title: "Feeding & Drinking Systems",
      description: "Complete automated feeding and drinking solutions from leading global manufacturers.",
      products: [
        "China Feeding & Drinking System",
        "USA Feeding & Drinking System", 
        "Malaysia Feeding & Drinking System",
        "Automated Control Systems"
      ],
      color: "#2B5D41"
    },
    {
      icon: <FiWind size={32} />,
      title: "Ventilation Equipment",
      description: "Advanced ventilation systems for optimal poultry house environment control.",
      products: [
        "Exhaust Fans (36\", 42\", 50\", 54\")",
        "Cone Fans & Box Fans",
        "Cooling Pads (2m4\", 2m6\")",
        "Air Inlets & Controllers"
      ],
      color: "#1B4332"
    },
    {
      icon: <FiDroplet size={32} />,
      title: "Feed Additives",
      description: "Premium quality feed additives for enhanced poultry nutrition and performance.",
      products: [
        "Vitamin & Mineral Premix",
        "Amino Acids (DL Methionine, L-Lysine)",
        "Choline Chloride & DCP", 
        "Gut Balance Boosters"
      ],
      color: "#F4D03F"
    }
  ];

  const partners = [
    { company: "CHORE TIME", country: "USA" },
    { company: "HIRED HAND", country: "USA" },
    { company: "HUTEK ASIA", country: "Thailand" },
    { company: "MUYANG GROUP", country: "China" },
    { company: "PERICOLI", country: "Italy" },
    { company: "PRISTINE DYNAMICS", country: "Malaysia" },
    { company: "AGROMEAL", country: "USA" },
    { company: "TGL EUROGUY", country: "Europe" },
    { company: "INTRACO", country: "Belgium" },
    { company: "FAMSON", country: "USA" }
  ];

  return (
    <ProductsSection>
      <div className="container">
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Product Range
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Complete automated solutions for poultry equipment and farming with products from leading global manufacturers.
          </SectionSubtitle>
        </SectionHeader>

        <ProductCategories>
          {productCategories.map((category, index) => (
            <CategoryCard
              key={index}
              color={category.color}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <CategoryIcon className="icon" color={category.color}>
                {category.icon}
              </CategoryIcon>
              
              <CategoryTitle>{category.title}</CategoryTitle>
              
              <CategoryDescription>
                {category.description}
              </CategoryDescription>
              
              <ProductList>
                {category.products.map((product, idx) => (
                  <li key={idx}>{product}</li>
                ))}
              </ProductList>
            </CategoryCard>
          ))}
        </ProductCategories>

        <PartnersSection>
          <PartnersTitle>
            <FiGlobe size={24} />
            Our Global Partners
          </PartnersTitle>
          
          <PartnersGrid>
            {partners.map((partner, index) => (
              <PartnerCard key={index}>
                <div className="country">{partner.country}</div>
                <div className="company">{partner.company}</div>
              </PartnerCard>
            ))}
          </PartnersGrid>

          <CTAButton to="/products">
            View All Products <FiArrowRight />
          </CTAButton>
        </PartnersSection>
      </div>
    </ProductsSection>
  );
};

export default Products;