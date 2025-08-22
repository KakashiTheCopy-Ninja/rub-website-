// src/styles/GlobalStyles.js - Copy this entire file to your project
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    font-size: ${props => props.theme.fontSizes.base};
    line-height: 1.6;
    color: ${props => props.theme.colors.textPrimary};
    background-color: ${props => props.theme.colors.background};
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.primary};
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.textPrimary};
  }

  h1 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    font-weight: 700;
  }

  h2 {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }

  h3 {
    font-size: ${props => props.theme.fontSizes['2xl']};
  }

  p {
    margin-bottom: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.textSecondary};
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.3s ease;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ul, ol {
    list-style: none;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  /* Container */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing.lg};

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      padding: 0 ${props => props.theme.spacing.sm};
    }
  }

  /* Button Styles */
  .btn {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
    border-radius: ${props => props.theme.borderRadius.base};
    font-weight: 500;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${props => props.theme.spacing.xs};
    transition: all 0.3s ease;
    cursor: pointer;
    font-size: ${props => props.theme.fontSizes.base};
  }

  .btn-primary {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    
    &:hover {
      background: ${props => props.theme.colors.primaryDark};
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.lg};
    }
  }

  .btn-secondary {
    background: transparent;
    color: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};
    
    &:hover {
      background: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.white};
      transform: translateY(-2px);
    }
  }

  .btn-accent {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.textPrimary};
    
    &:hover {
      background: ${props => props.theme.colors.accent};
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.lg};
    }
  }

  /* Section Spacing */
  .section {
    padding: ${props => props.theme.spacing['3xl']} 0;

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      padding: ${props => props.theme.spacing['2xl']} 0;
    }
  }

  /* Animation Classes */
  .fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default GlobalStyles;
