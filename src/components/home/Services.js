// src/components/home/Services.js - Create this file
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiPackage, 
  FiSettings, 
  FiShield, 
  FiTrendingUp, 
  FiHeadphones, 
  FiAward,
  FiArrowRight
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ServicesSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23F4D03F" opacity="0.03"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['4xl']};
  position: relative;
  z-index: 2;
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing['3xl']};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.theme.spacing.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const ServiceCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.base};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.xl};

    &::before {
      transform: translateX(0);
    }

    .icon {
      transform: scale(1.1);
      color: ${props => props.theme.colors.secondary};
    }

    .arrow {
      transform: translateX(5px);
      opacity: 1;
    }
  }
`;

const ServiceIcon = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}15, ${props => props.theme.colors.secondary}15);
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  transition: all 0.3s ease;

  svg {
    color: ${props => props.theme.colors.primary};
    transition: all 0.3s ease;
  }
`;

const ServiceTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 600;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ServiceDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  margin-bottom: ${props => props.theme.spacing.lg};

  li {
    color: ${props => props.theme.colors.textSecondary};
    font-size: ${props => props.theme.fontSizes.sm};
    margin-bottom: ${props => props.theme.spacing.xs};
    position: relative;
    padding-left: ${props => props.theme.spacing.lg};

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: ${props => props.theme.colors.success};
      font-weight: bold;
    }
  }
`;

const ServiceLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  font-size: ${props => props.theme.fontSizes.sm};
  transition: all 0.3s ease;

  .arrow {
    transition: all 0.3s ease;
    opacity: 0.7;
  }

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const CTASection = styled.div`
  text-align: center;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryDark});
  padding: ${props => props.theme.spacing['3xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  color: ${props => props.theme.colors.white};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 200%;
    background: radial-gradient(circle, rgba(244, 208, 63, 0.1) 0%, transparent 70%);
  }
`;

const CTAContent = styled.div`
  position: relative;
  z-index: 2;
`;

const CTATitle = styled.h3`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.white};
`;

const CTADescription = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  color: rgba(255, 255, 255, 0.9);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(Link)`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.primary};
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
    background: ${props => props.theme.colors.accent};
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const Services = () => {
  const services = [
    {
      icon: <FiPackage size={32} />,
      title: "Premium Feed Additives",
      description: "High-quality nutritional supplements designed to optimize poultry health and performance.",
      features: [
        "Vitamins & Minerals",
        "Growth Promoters",
        "Digestive Enhancers",
        "Immunity Boosters"
      ],
      link: "/products"
    },
    {
      icon: <FiSettings size={32} />,
      title: "Poultry Equipment",
      description: "State-of-the-art equipment solutions for modern poultry farming operations.",
      features: [
        "Feeding Systems",
        "Watering Equipment",
        "Ventilation Systems",
        "Monitoring Devices"
      ],
      link: "/products"
    },
    {
      icon: <FiShield size={32} />,
      title: "Quality Assurance",
      description: "Rigorous testing and quality control to ensure product safety and efficacy.",
      features: [
        "ISO Certified",
        "Lab Tested",
        "Safety Compliance",
        "Batch Tracking"
      ],
      link: "/about"
    },
    {
      icon: <FiTrendingUp size={32} />,
      title: "Performance Analytics",
      description: "Data-driven insights to help optimize your poultry farm's productivity.",
      features: [
        "Performance Metrics",
        "Growth Analysis",
        "Feed Conversion Reports",
        "ROI Calculations"
      ],
      link: "/contact"
    },
    {
      icon: <FiHeadphones size={32} />,
      title: "24/7 Support",
      description: "Round-the-clock technical support from our team of poultry nutrition experts.",
      features: [
        "Expert Consultation",
        "Emergency Support",
        "Training Programs",
        "Regular Check-ups"
      ],
      link: "/contact"
    },
    {
      icon: <FiAward size={32} />,
      title: "Custom Solutions",
      description: "Tailored feed formulations and equipment setups for your specific requirements.",
      features: [
        "Custom Formulations",
        "Site Assessment",
        "Installation Support",
        "Ongoing Optimization"
      ],
      link: "/contact"
    }
  ];

  return (
    <ServicesSection>
      <div className="container">
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Premium Services
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Comprehensive solutions for your poultry business success, from premium feed additives to expert support.
          </SectionSubtitle>
        </SectionHeader>

        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ServiceIcon className="icon">
                {service.icon}
              </ServiceIcon>
              
              <ServiceTitle>
                {service.title}
                <FiArrowRight className="arrow" size={16} />
              </ServiceTitle>
              
              <ServiceDescription>
                {service.description}
              </ServiceDescription>
              
              <ServiceFeatures>
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ServiceFeatures>
              
              <ServiceLink to={service.link}>
                Learn More <FiArrowRight className="arrow" size={14} />
              </ServiceLink>
            </ServiceCard>
          ))}
        </ServicesGrid>

        <CTASection>
          <CTAContent>
            <CTATitle>Ready to Boost Your Poultry Business?</CTATitle>
            <CTADescription>
              Get started with our premium feed solutions and expert support to maximize your farm's potential.
            </CTADescription>
            <CTAButton to="/contact">
              Get Free Consultation <FiArrowRight />
            </CTAButton>
          </CTAContent>
        </CTASection>
      </div>
    </ServicesSection>
  );
};

export default Services;