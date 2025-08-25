// src/components/common/Stats.js - Create this file
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiPackage, 
  FiAward, 
  FiTrendingUp,
  FiMapPin,
  FiClock,
  FiShield,
  FiStar
} from 'react-icons/fi';

const StatsSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryDark});
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

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23F4D03F" fill-opacity="0.03"><circle cx="30" cy="30" r="1"/></g></g></svg>');
  }
`;

const StatsContainer = styled.div`
  position: relative;
  z-index: 2;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['4xl']};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.md};
  background: linear-gradient(135deg, #ffffff 0%, ${props => props.theme.colors.secondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.xl};
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.theme.spacing.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const StatCard = styled(motion.div)`
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.15);
    border-color: ${props => props.theme.colors.secondary};

    .icon {
      transform: scale(1.1);
      color: ${props => props.theme.colors.secondary};
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.accent});
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: translateX(0);
  }
`;

const StatIcon = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};
  transition: all 0.3s ease;

  svg {
    color: ${props => props.theme.colors.white};
    transition: all 0.3s ease;
  }
`;

const StatNumber = styled(motion.div)`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: 700;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: ${props => props.theme.spacing.sm};
  line-height: 1;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const StatLabel = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: 600;
  color: ${props => props.theme.colors.white};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
`;

const useInView = (threshold = 0.1) => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [inView, threshold]);

  return [ref, inView];
};

const useCountUp = (end, duration = 2000, startWhen = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startWhen) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, startWhen]);

  return count;
};

// Create individual stat card component to use hooks properly
const StatCardComponent = ({ stat, index, inView }) => {
  const animatedNumber = useCountUp(stat.number, 2000, inView);
  
  return (
    <StatCard
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <StatIcon className="icon">
        {stat.icon}
      </StatIcon>
      
      <StatNumber>
        {animatedNumber}{stat.suffix}
      </StatNumber>
      
      <StatLabel>{stat.label}</StatLabel>
      <StatDescription>{stat.description}</StatDescription>
    </StatCard>
  );
};

const Stats = () => {
  const [statsRef, inView] = useInView(0.3);

  const statsData = [
    {
      icon: <FiUsers size={32} />,
      number: 500,
      suffix: '+',
      label: 'Happy Clients',
      description: 'Satisfied poultry farmers across Pakistan'
    },
    {
      icon: <FiPackage size={32} />,
      number: 150,
      suffix: '+',
      label: 'Premium Products',
      description: 'High-quality feed additives and equipment'
    },
    {
      icon: <FiClock size={32} />,
      number: 15,
      suffix: '+',
      label: 'Years Experience',
      description: 'Trusted industry expertise since 2002'
    },
    {
      icon: <FiMapPin size={32} />,
      number: 50,
      suffix: '+',
      label: 'Cities Covered',
      description: 'Nationwide delivery across Pakistan'
    }
  ];

  const achievementsData = [
    {
      icon: <FiAward size={24} />,
      label: 'ISO Certified Quality'
    },
    {
      icon: <FiStar size={24} />,
      label: '4.9/5 Customer Rating'
    },
    {
      icon: <FiShield size={24} />,
      label: '100% Genuine Products'
    },
    {
      icon: <FiTrendingUp size={24} />,
      label: '30% ROI Improvement'
    }
  ];

  return (
    <StatsSection ref={statsRef}>
      <div className="container">
        <StatsContainer>
          <SectionHeader>
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Trusted by Industry Leaders
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our commitment to excellence has made us Pakistan's leading poultry solutions provider
            </SectionSubtitle>
          </SectionHeader>

          <StatsGrid>
            {statsData.map((stat, index) => (
              <StatCardComponent
                key={index}
                stat={stat}
                index={index}
                inView={inView}
              />
            ))}
          </StatsGrid>

          {/* Additional Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              marginTop: '3rem',
              padding: '2rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {achievementsData.map((achievement, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem',
                  color: 'white'
                }}
              >
                <div style={{
                  color: '#F4D03F',
                  flexShrink: 0
                }}>
                  {achievement.icon}
                </div>
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  {achievement.label}
                </span>
              </div>
            ))}
          </motion.div>
        </StatsContainer>
      </div>
    </StatsSection>
  );
};

export default Stats;