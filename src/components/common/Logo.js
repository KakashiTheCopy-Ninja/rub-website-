// src/components/common/Logo.js - Updated to use your image logo
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: transform 0.3s ease;
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.base};
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    transform: scale(1.05);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const LogoImage = styled.img`
  height: 45px;
  width: auto;
  object-fit: contain;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 35px;
  }
`;

// Alternative fallback if image doesn't load
const LogoText = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 700;
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.primary};

  .dot {
    color: ${props => props.theme.colors.secondary};
  }

  .associates {
    font-size: ${props => props.theme.fontSizes.base};
    font-weight: 600;
    color: ${props => props.theme.colors.textSecondary};
    display: block;
    margin-top: -5px;
  }
`;

const Logo = () => {
  return (
    <LogoWrapper to="/">
      {/* Option 1: Using your uploaded image directly */}
      <LogoImage 
        src="/assets/images/rub-logo.png" 
        alt="R.U.B Associates Logo"
        onError={(e) => {
          // Fallback if image doesn't load
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'block';
        }}
      />
      
      {/* Fallback text logo */}
      <LogoText style={{ display: 'none' }}>
        R<span className="dot">.</span>U<span className="dot">.</span>B<span className="dot">.</span>
        <span className="associates">ASSOCIATES</span>
      </LogoText>
    </LogoWrapper>
  );
};

export default Logo;