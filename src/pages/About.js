// src/components/home/About.js - Create this file
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiTarget, 
  FiEye, 
  FiHeart, 
  FiUsers, 
  FiAward, 
  FiTrendingUp,
  FiCheck
} from 'react-icons/fi';

const AboutSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.white};
  position: relative;
  overflow: hidden;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['4xl']};
  align-items: center;
  margin-bottom: ${props => props.theme.spacing['4xl']};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const AboutText = styled.div``;

const AboutTitle = styled(motion.h2)`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: 700;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.lg};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    border-radius: 2px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const AboutDescription = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const AboutFeatures = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textSecondary};

  svg {
    color: ${props => props.theme.colors.success};
    flex-shrink: 0;
  }
`;

const AboutStats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const StatItem = styled.div`
  text-align: center;

  .number {
    display: block;
    font-size: ${props => props.theme.fontSizes['2xl']};
    font-weight: 700;
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  .label {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const AboutVisual = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainImage = styled.div`
  width: 400px;
  height: 500px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}20, ${props => props.theme.colors.secondary}20);
  border-radius: ${props => props.theme.borderRadius.xl};
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 300px;
    height: 400px;
  }

  &::before {
    content: '🐔';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 120px;
    opacity: 0.3;
  }

  &::after {
    content: 'Premium Quality Assured';
    position: absolute;
    bottom: 30px;
    left: 30px;
    right: 30px;
    background: rgba(255, 255, 255, 0.95);
    padding: ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.base};
    color: ${props => props.theme.colors.textPrimary};
    font-weight: 600;
    text-align: center;
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

const FloatingCard = styled.div`
  position: absolute;
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.border};
  min-width: 160px;

  &.card-1 {
    top: 10%;
    right: -20px;
    animation: float 6s ease-in-out infinite;
  }

  &.card-2 {
    bottom: 15%;
    left: -20px;
    animation: float 6s ease-in-out infinite reverse;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }

  .icon {
    color: ${props => props.theme.colors.secondary};
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  h4 {
    color: ${props => props.theme.colors.textPrimary};
    margin-bottom: ${props => props.theme.spacing.xs};
    font-size: ${props => props.theme.fontSizes.base};
  }

  p {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.textSecondary};
    margin: 0;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
`;

const ValuesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing['4xl']};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const ValueCard = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};

    .icon {
      transform: scale(1.1);
    }
  }
`;

const ValueIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}15, ${props => props.theme.colors.secondary}15);
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};
  transition: all 0.3s ease;

  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const ValueTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 600;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ValueDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const About = () => {
  const features = [
    "20+ Years Experience (Since 2002)",
    "45+ Major Clients Nationwide", 
    "Global Equipment Partners",
    "Complete Installation Services",
    "Technical Support & Consultation",
    "Feed Mill & Farm Machinery"
  ];

  const values = [
    {
      icon: <FiTarget size={32} />,
      title: "Our Mission",
      description: "To achieve the reputation of a quality, high standard & reliable solution & service provider company in the Poultry industry."
    },
    {
      icon: <FiEye size={32} />,
      title: "Our Vision", 
      description: "To achieve 100% customer satisfaction by delivering quality products and services at an affordable cost. We strive to become a leading entity in poultry industry."
    },
    {
      icon: <FiHeart size={32} />,
      title: "Our Values",
      description: "Excellence, trust and confidence build-up, innovation, transparency, teamwork, motivation, collective responsibility and professionalism guide our operations."
    }
  ];

  return (
    <AboutSection>
      <div className="container">
        <AboutContent>
          <AboutText>
            <AboutTitle
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Leading Pakistan's Poultry Equipment Industry Since 2002
            </AboutTitle>
            
            <AboutDescription
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              R.U.B Associates began its business operation as a Commercial Importer in the field of 
              poultry equipment and feed ingredients in 2002. We focus exclusively on high quality 
              and cost-effective solutions to provide the best suitable products for ultimate profit 
              at low cost, helping our clients manage farms and achieve optimal bird growth.
            </AboutDescription>

            <AboutFeatures
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <FeatureItem key={index}>
                  <FiCheck size={16} />
                  <span>{feature}</span>
                </FeatureItem>
              ))}
            </AboutFeatures>

            <AboutStats
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <StatItem>
                <span className="number">45+</span>
                <span className="label">Major Clients</span>
              </StatItem>
              <StatItem>
                <span className="number">20+</span>
                <span className="label">Years Experience</span>
              </StatItem>
              <StatItem>
                <span className="number">10+</span>
                <span className="label">Global Partners</span>
              </StatItem>
            </AboutStats>
          </AboutText>

          <AboutVisual
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <MainImage />
            
            <FloatingCard className="card-1">
              <FiAward className="icon" size={20} />
              <h4>Quality Certified</h4>
              <p>ISO 9001:2015 Certified</p>
            </FloatingCard>

            <FloatingCard className="card-2">
              <FiTrendingUp className="icon" size={20} />
              <h4>Proven Results</h4>
              <p>30% Productivity Increase</p>
            </FloatingCard>
          </AboutVisual>
        </AboutContent>

        <ValuesSection>
          {values.map((value, index) => (
            <ValueCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ValueIcon className="icon">
                {value.icon}
              </ValueIcon>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueDescription>{value.description}</ValueDescription>
            </ValueCard>
          ))}
        </ValuesSection>
      </div>
    </AboutSection>
  );
};

export default About;