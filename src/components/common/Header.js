// src/components/common/Header.js - Create this file
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FiMenu, FiX, FiPhone, FiMail } from 'react-icons/fi';
import Logo from './Logo';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  background: ${props => props.isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.isScrolled ? props.theme.shadows.md : 'none'};
`;

const TopBar = styled.div`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xs} 0;
  font-size: ${props => props.theme.fontSizes.sm};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const TopBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContactInfo = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const MainNav = styled.nav`
  padding: ${props => props.theme.spacing.sm} 0;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: ${props => props.theme.spacing.xl};
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.colors.white};
    flex-direction: column;
    justify-content: center;
    transform: translateX(${props => props.isOpen ? '0' : '100%'});
    transition: transform 0.3s ease;
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const NavLink = styled(Link)`
  font-weight: 500;
  color: ${props => props.isScrolled ? props.theme.colors.textPrimary : props.theme.colors.white};
  position: relative;
  padding: ${props => props.theme.spacing.xs} 0;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }

  &.active {
    color: ${props => props.theme.colors.secondary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    background: ${props => props.theme.colors.secondary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    color: ${props => props.theme.colors.textPrimary};
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const MenuButton = styled.button`
  display: none;
  color: ${props => props.isScrolled ? props.theme.colors.textPrimary : props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes['2xl']};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
    z-index: 1001;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.lg};
  right: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.textPrimary};
  font-size: ${props => props.theme.fontSizes['2xl']};
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/products', label: 'Products' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <HeaderWrapper isScrolled={isScrolled}>
      {!isScrolled && (
        <TopBar>
          <div className="container">
            <TopBarContent>
              <ContactInfo>
                <ContactItem>
                  <FiPhone size={14} />
                  <span>+92-51-4927177</span>
                </ContactItem>
                <ContactItem>
                  <FiMail size={14} />
                  <span>rubinfo@dsl.net</span>
                </ContactItem>
              </ContactInfo>
              <div>Poultry Equipment & Feed Solutions Since 2002</div>
            </TopBarContent>
          </div>
        </TopBar>
      )}

      <MainNav>
        <div className="container">
          <NavContent>
            <Logo />
            
            <NavLinks isOpen={isMobileMenuOpen}>
              <CloseButton onClick={() => setIsMobileMenuOpen(false)}>
                <FiX />
              </CloseButton>
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    isScrolled={isScrolled}
                    isActive={location.pathname === item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </NavLinks>

            <MenuButton
              isScrolled={isScrolled}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <FiMenu />
            </MenuButton>
          </NavContent>
        </div>
      </MainNav>
    </HeaderWrapper>
  );
};

export default Header;