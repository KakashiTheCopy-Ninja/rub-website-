// src/components/common/Logo.js - Create this file
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const LogoSvg = styled.svg`
  height: 50px;
  width: auto;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 40px;
  }
`;

const Logo = () => {
  return (
    <LogoWrapper to="/">
      <LogoSvg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
        {/* Background Circle */}
        <circle cx="60" cy="60" r="45" fill="#2B5D41" stroke="#1B4332" strokeWidth="2"/>
        
        {/* Poultry/Feed Icon */}
        <g transform="translate(35, 35)">
          {/* Wheat/Feed Symbol */}
          <path 
            d="M25 15 L25 45 M20 20 L30 20 M18 25 L32 25 M20 30 L30 30 M22 35 L28 35" 
            stroke="#F4D03F" 
            strokeWidth="2.5" 
            fill="none" 
            strokeLinecap="round"
          />
          {/* Small leaves */}
          <circle cx="18" cy="20" r="2" fill="#F4D03F"/>
          <circle cx="32" cy="20" r="2" fill="#F4D03F"/>
          <circle cx="16" cy="25" r="2" fill="#F4D03F"/>
          <circle cx="34" cy="25" r="2" fill="#F4D03F"/>
        </g>
        
        {/* Company Name */}
        <text x="120" y="40" fontFamily="'Poppins', sans-serif" fontSize="28" fontWeight="bold" fill="#2B5D41">
          RUB
        </text>
        
        {/* Full Company Name */}
        <text x="120" y="60" fontFamily="'Poppins', sans-serif" fontSize="12" fill="#5A6B5D">
          R.U.B Associates
        </text>
        
        {/* Tagline */}
        <text x="120" y="78" fontFamily="'Poppins', sans-serif" fontSize="10" fill="#7A8B7D">
          Your Machinery Solution Provider
        </text>
        
        {/* Decorative Line */}
        <line x1="120" y1="85" x2="280" y2="85" stroke="#F4D03F" strokeWidth="2"/>
      </LogoSvg>
    </LogoWrapper>
  );
};

export default Logo;