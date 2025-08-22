// src/components/home/Hero.js - Create this file
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FiArrowRight, FiPlay, FiAward, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary} 0%,
    ${props => props.theme.colors.primaryDark} 50%,
    #0F2419 100%
  );

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23F4D03F" fill-opacity="0.05"><circle cx="30" cy="30" r="1"/></g></g></svg>');
    animation: float 6s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 200%;
    background: radial-gradient(circle, rgba(244, 208, 63, 0.1) 0%, transparent 70%);
    animation: ${pulse} 4s ease-in-out infinite;
  }
`;

const HeroContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['4xl']};
  align-items: center;
  min-height: 80vh;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
    text-align: center;
  }
`;

const HeroText = styled.div`
  color: ${props => props.theme.colors.white};
`;

const HeroTitle = styled(motion.h1)`
  font-size: ${props => props.theme.fontSizes['6xl']};
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, #ffffff 0%, ${props => props.theme.colors.secondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.fontSizes['4xl']};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  max-width: 500px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing['2xl']};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(Link)`
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

const SecondaryButton = styled.button`
  background: transparent;
  color: ${props => props.theme.colors.white};
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.base};
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.lg};
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: ${props => props.theme.colors.secondary};
    transform: translateY(-3px);
  }
`;

const HeroStats = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: center;
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
    color: rgba(255, 255, 255, 0.7);
  }
`;

const HeroVisual = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.white};
  position: absolute;
  min-width: 200px;

  &.card-1 {
    top: 20%;
    right: 0;
    animation: float 6s ease-in-out infinite;
  }

  &.card-2 {
    bottom: 20%;
    left: 0;
    animation: float 6s ease-in-out infinite reverse;
  }

  &.card-3 {
    top: 50%;
    right: 20%;
    animation: float 8s ease-in-out infinite;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }

  .icon {
    color: ${props => props.theme.colors.secondary};
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  h4 {
    color: ${props => props.theme.colors.white};
    margin-bottom: ${props => props.theme.spacing.xs};
    font-size: ${props => props.theme.fontSizes.lg};
  }

  p {
    font-size: ${props => props.theme.fontSizes.sm};
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }
`;

const CentralGraphic = styled.div`
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, ${props => props.theme.colors.secondary} 0%, ${props => props.theme.colors.accent} 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes['4xl']};
  color: ${props => props.theme.colors.primary};
  font-weight: 700;
  box-shadow: ${props => props.theme.shadows.xl};
  animation: ${pulse} 3s ease-in-out infinite;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 200px;
    height: 200px;
    font-size: ${props => props.theme.fontSizes['2xl']};
  }
`;

const Hero = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    clients: 0,
    products: 0,
    experience: 0
  });

  useEffect(() => {
    const targets = { clients: 500, products: 150, experience: 15 };
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;

    const intervals = Object.keys(targets).map(key => {
      const increment = targets[key] / steps;
      let current = 0;
      
      return setInterval(() => {
        current += increment;
        if (current >= targets[key]) {
          current = targets[key];
          clearInterval(intervals.find(interval => interval === this));
        }
        setAnimatedNumbers(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, stepTime);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <HeroSection>
      <div className="container">
        <HeroContainer>
          <HeroContent>
            <HeroText>
              <HeroTitle
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Complete Poultry{' '}
                <span style={{ color: '#F4D03F' }}>Machinery Solutions</span>
              </HeroTitle>

              <HeroSubtitle
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Your trusted machinery solution provider since 2002. We offer automated solutions 
                for poultry equipment and farming, providing optimum and customized products for 
                ultimate profit at low cost.
              </HeroSubtitle>

              <HeroButtons
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <PrimaryButton to="/products">
                  Explore Products
                  <FiArrowRight />
                </PrimaryButton>
                <SecondaryButton>
                  <FiPlay />
                  Watch Demo
                </SecondaryButton>
              </HeroButtons>

              <HeroStats
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <StatItem>
                  <span className="number">{animatedNumbers.clients}+</span>
                  <span className="label">Happy Clients</span>
                </StatItem>
                <StatItem>
                  <span className="number">{animatedNumbers.products}+</span>
                  <span className="label">Products</span>
                </StatItem>
                <StatItem>
                  <span className="number">{animatedNumbers.experience}+</span>
                  <span className="label">Years Experience</span>
                </StatItem>
              </HeroStats>
            </HeroText>

            <HeroVisual
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <CentralGraphic>
                RUB
              </CentralGraphic>

              <FeatureCard className="card-1">
                <FiAward className="icon" size={24} />
                <h4>Premium Quality</h4>
                <p>ISO certified feed additives for optimal nutrition</p>
              </FeatureCard>

              <FeatureCard className="card-2">
                <FiUsers className="icon" size={24} />
                <h4>Expert Support</h4>
                <p>24/7 technical assistance from our specialists</p>
              </FeatureCard>

              <FeatureCard className="card-3">
                <FiTrendingUp className="icon" size={24} />
                <h4>Proven Results</h4>
                <p>Increase productivity by up to 30%</p>
              </FeatureCard>
            </HeroVisual>
          </HeroContent>
        </HeroContainer>
      </div>
    </HeroSection>
  );
};

export default Hero;