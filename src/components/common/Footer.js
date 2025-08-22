// src/components/common/Footer.js - Create this file
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiFacebook, 
  FiInstagram, 
  FiLinkedin,
  FiClock,
  FiArrowUp
} from 'react-icons/fi';
import Logo from './Logo';

const FooterWrapper = styled.footer`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.primaryDark} 100%);
  color: ${props => props.theme.colors.white};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${props => props.theme.colors.secondary}, transparent);
  }
`;

const FooterContent = styled.div`
  padding: ${props => props.theme.spacing['3xl']} 0 ${props => props.theme.spacing.lg};
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
    gap: ${props => props.theme.spacing.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const FooterSection = styled.div`
  h3 {
    color: ${props => props.theme.colors.secondary};
    margin-bottom: ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: 600;
  }

  p, li {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: ${props => props.theme.spacing.xs};
    line-height: 1.6;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.base};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }

  svg {
    color: ${props => props.theme.colors.secondary};
    margin-top: 2px;
    flex-shrink: 0;
  }
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  display: block;
  margin-bottom: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} 0;
  transition: all 0.3s ease;
  border-radius: ${props => props.theme.borderRadius.base};

  &:hover {
    color: ${props => props.theme.colors.secondary};
    padding-left: ${props => props.theme.spacing.sm};
    background: rgba(255, 255, 255, 0.05);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.full};
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary};
    transform: translateY(-3px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${props => props.theme.spacing.lg} 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.sm};
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
`;

const BackToTop = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.secondary};
  background: rgba(255, 255, 255, 0.1);
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.base};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FooterWrapper>
      <div className="container">
        <FooterContent>
          <FooterGrid>
            {/* Company Info */}
            <FooterSection>
              <Logo />
              <p style={{ marginTop: '1rem' }}>
                R.U.B Associates provides one stop automated solution for your trade and industry 
                in the field of poultry equipment and farming. We are your trusted machinery 
                solution provider since 2002.
              </p>
              <SocialLinks>
                <SocialLink href="#" aria-label="Facebook">
                  <FiFacebook size={18} />
                </SocialLink>
                <SocialLink href="#" aria-label="Instagram">
                  <FiInstagram size={18} />
                </SocialLink>
                <SocialLink href="#" aria-label="LinkedIn">
                  <FiLinkedin size={18} />
                </SocialLink>
              </SocialLinks>
            </FooterSection>

            {/* Quick Links */}
            <FooterSection>
              <h3>Quick Links</h3>
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/products">Products</FooterLink>
              <FooterLink to="/gallery">Gallery</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </FooterSection>

            {/* Services */}
            <FooterSection>
              <h3>Our Services</h3>
              <FooterLink to="/products">Feed Additives</FooterLink>
              <FooterLink to="/products">Poultry Equipment</FooterLink>
              <FooterLink to="/products">Nutritional Consulting</FooterLink>
              <FooterLink to="/products">Technical Support</FooterLink>
              <FooterLink to="/contact">Custom Solutions</FooterLink>
            </FooterSection>

            {/* Contact Info */}
            <FooterSection>
              <h3>Contact Info</h3>
              <ContactItem>
                <FiMapPin size={16} />
                <div>
                  <strong>Corporate Office:</strong><br />
                  House No 80-C Near EOBI Office,<br />
                  Satellite Town, Rawalpindi, Pakistan
                </div>
              </ContactItem>
              
              <ContactItem>
                <FiPhone size={16} />
                <div>
                  <strong>Direct Line:</strong><br />
                  +92-51-4927177
                </div>
              </ContactItem>
              
              <ContactItem>
                <FiMail size={16} />
                <div>
                  <strong>Email:</strong><br />
                  rubinfo@dsl.net
                </div>
              </ContactItem>
              
              <ContactItem>
                <FiClock size={16} />
                <div>
                  <strong>Business Hours:</strong><br />
                  Mon - Fri: 8:00 AM - 6:00 PM<br />
                  Sat: 9:00 AM - 4:00 PM
                </div>
              </ContactItem>
            </FooterSection>
          </FooterGrid>

          <FooterBottom>
            <Copyright>
              © {new Date().getFullYear()} R.U.B Associates. All rights reserved.
            </Copyright>
            <BackToTop onClick={scrollToTop}>
              <FiArrowUp size={16} />
              Back to Top
            </BackToTop>
          </FooterBottom>
        </FooterContent>
      </div>
    </FooterWrapper>
  );
};

export default Footer;