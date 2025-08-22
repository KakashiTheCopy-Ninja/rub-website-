// src/pages/About.js - Replace with this complete About page
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
  FiCheck,
  FiCalendar,
  FiMapPin,
  FiPhone,
  FiMail,
  FiGlobe,
  FiShield,
  FiTool,
  FiPackage
} from 'react-icons/fi';

const AboutPage = styled.div`
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

const HeroTitle = styled(motion.h1)`
  font-size: ${props => props.theme.fontSizes['5xl']};
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
`;

const HeroStats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing.lg};
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  text-align: center;
  
  .number {
    display: block;
    font-size: ${props => props.theme.fontSizes['2xl']};
    font-weight: 700;
    color: ${props => props.theme.colors.secondary};
    margin-bottom: ${props => props.theme.spacing.xs};
  }
  
  .label {
    font-size: ${props => props.theme.fontSizes.sm};
    color: rgba(255, 255, 255, 0.8);
  }
`;

// Story Section
const StorySection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.white};
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['4xl']};
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const StoryContent = styled.div``;

const SectionTitle = styled(motion.h2)`
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
`;

const StoryText = styled(motion.div)`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.7;
  font-size: ${props => props.theme.fontSizes.lg};

  p {
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

const Timeline = styled(motion.div)`
  position: relative;
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  .year {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.base};
    font-weight: 600;
    min-width: 80px;
    text-align: center;
  }
  
  .content {
    flex: 1;
    
    h4 {
      color: ${props => props.theme.colors.textPrimary};
      margin-bottom: ${props => props.theme.spacing.xs};
    }
    
    p {
      color: ${props => props.theme.colors.textSecondary};
      margin: 0;
    }
  }
`;

// Values Section
const ValuesSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.background};
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const ValueCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.base};
  border: 1px solid ${props => props.theme.colors.border};
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.xl};
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

// Team Section
const TeamSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.white};
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const TeamCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.base};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const TeamImage = styled.div`
  height: 250px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}20, ${props => props.theme.colors.secondary}20);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes['4xl']};
  color: ${props => props.theme.colors.primary};
`;

const TeamInfo = styled.div`
  padding: ${props => props.theme.spacing.lg};
  text-align: center;
  
  h4 {
    color: ${props => props.theme.colors.textPrimary};
    margin-bottom: ${props => props.theme.spacing.xs};
  }
  
  .position {
    color: ${props => props.theme.colors.secondary};
    font-weight: 500;
    margin-bottom: ${props => props.theme.spacing.sm};
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: ${props => props.theme.fontSizes.sm};
    line-height: 1.5;
  }
`;

// Certifications Section
const CertificationsSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.background};
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const CertCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.base};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  .icon {
    color: ${props => props.theme.colors.secondary};
    margin-bottom: ${props => props.theme.spacing.sm};
  }
`;

const About = () => {
  const timelineData = [
    {
      year: "2002",
      title: "Company Established",
      description: "R.U.B Associates began operations as a commercial importer in poultry equipment and feed ingredients."
    },
    {
      year: "2005",
      title: "First Major Contracts",
      description: "Secured partnerships with leading poultry farms across Punjab and established our reputation for quality."
    },
    {
      year: "2010",
      title: "International Partnerships",
      description: "Formed strategic alliances with global manufacturers from USA, China, Thailand, and Europe."
    },
    {
      year: "2015",
      title: "Technology Integration",
      description: "Introduced automated feeding and ventilation systems, revolutionizing farm efficiency."
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched digital consultation services and remote monitoring solutions for clients."
    },
    {
      year: "2023",
      title: "Expansion & Growth",
      description: "Expanded operations nationwide with 45+ major clients and comprehensive service offerings."
    }
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

  const teamMembers = [
    {
      name: "Rizwan Ahmad",
      position: "Chief Executive Officer",
      description: "Leading the company vision with 20+ years of industry experience and strategic partnerships."
    },
    {
      name: "Usman Billal",
      position: "Technical Director",
      description: "Expert in poultry equipment installation and technical support services across Pakistan."
    },
    {
      name: "Bilal Sheikh",
      position: "Operations Manager",
      description: "Managing day-to-day operations and ensuring quality delivery of products and services."
    }
  ];

  const certifications = [
    {
      icon: <FiShield size={24} />,
      title: "ISO 9001:2015",
      description: "Quality Management"
    },
    {
      icon: <FiAward size={24} />,
      title: "HACCP Certified",
      description: "Food Safety Standards"
    },
    {
      icon: <FiGlobe size={24} />,
      title: "International Partners",
      description: "Global Quality Standards"
    },
    {
      icon: <FiCheck size={24} />,
      title: "Local Compliance",
      description: "Pakistan Standards"
    }
  ];

  return (
    <AboutPage>
      {/* Hero Section */}
      <HeroSection>
        <div className="container">
          <HeroContent>
            <HeroTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About R.U.B Associates
            </HeroTitle>
            
            <HeroSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your trusted machinery solution provider since 2002, delivering excellence 
              in poultry equipment and feed ingredients across Pakistan.
            </HeroSubtitle>

            <HeroStats
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
              <StatItem>
                <span className="number">100%</span>
                <span className="label">Satisfaction Rate</span>
              </StatItem>
            </HeroStats>
          </HeroContent>
        </div>
      </HeroSection>

      {/* Company Story */}
      <StorySection>
        <div className="container">
          <StoryGrid>
            <StoryContent>
              <SectionTitle
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Our Story
              </SectionTitle>
              
              <StoryText
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p>
                  R.U.B Associates began its journey in 2002 as a commercial importer specializing 
                  in poultry equipment and feed ingredients. Founded with a vision to revolutionize 
                  Pakistan's poultry industry, we have consistently delivered high-quality, 
                  cost-effective solutions.
                </p>
                <p>
                  Over two decades, we have built strong relationships with leading global 
                  manufacturers and have become the preferred partner for poultry farms 
                  across the nation. Our commitment to excellence and customer satisfaction 
                  has made us a trusted name in the industry.
                </p>
                <p>
                  Today, we continue to innovate and expand our services, helping our clients 
                  achieve optimal productivity and profitability in their poultry operations.
                </p>
              </StoryText>
            </StoryContent>

            <Timeline
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {timelineData.map((item, index) => (
                <TimelineItem key={index}>
                  <div className="year">{item.year}</div>
                  <div className="content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </TimelineItem>
              ))}
            </Timeline>
          </StoryGrid>
        </div>
      </StorySection>

      {/* Values Section */}
      <ValuesSection>
        <div className="container">
          <SectionTitle
            style={{ textAlign: 'center', marginBottom: '3rem' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Mission, Vision & Values
          </SectionTitle>

          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <ValueIcon>
                  {value.icon}
                </ValueIcon>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </ValueCard>
            ))}
          </ValuesGrid>
        </div>
      </ValuesSection>

      {/* Leadership Team */}
      <TeamSection>
        <div className="container">
          <SectionTitle
            style={{ textAlign: 'center', marginBottom: '3rem' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Leadership Team
          </SectionTitle>

          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TeamImage>
                  <FiUsers size={48} />
                </TeamImage>
                <TeamInfo>
                  <h4>{member.name}</h4>
                  <div className="position">{member.position}</div>
                  <p>{member.description}</p>
                </TeamInfo>
              </TeamCard>
            ))}
          </TeamGrid>
        </div>
      </TeamSection>

      {/* Certifications */}
      <CertificationsSection>
        <div className="container">
          <SectionTitle
            style={{ textAlign: 'center', marginBottom: '3rem' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Certifications & Standards
          </SectionTitle>

          <CertGrid>
            {certifications.map((cert, index) => (
              <CertCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="icon">
                  {cert.icon}
                </div>
                <h4>{cert.title}</h4>
                <p>{cert.description}</p>
              </CertCard>
            ))}
          </CertGrid>
        </div>
      </CertificationsSection>
    </AboutPage>
  );
};

export default About;