// src/components/common/Loading.js - Create this new file
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing['4xl']} ${props => props.theme.spacing.lg};
  min-height: ${props => props.fullScreen ? '100vh' : '400px'};
  background: ${props => props.fullScreen ? props.theme.colors.background : 'transparent'};
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid ${props => props.theme.colors.border};
  border-top: 4px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const LoadingText = styled(motion.p)`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.lg};
  text-align: center;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoadingDots = styled.span`
  &::after {
    content: '';
    animation: ${pulse} 1.5s ease-in-out infinite;
  }
`;

// Page Loading Component
export const PageLoader = ({ message = "Loading..." }) => (
  <LoadingWrapper fullScreen>
    <LoadingSpinner />
    <LoadingText
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {message}
      <LoadingDots />
    </LoadingText>
  </LoadingWrapper>
);

// Section Loading Component
export const SectionLoader = ({ message = "Loading content..." }) => (
  <LoadingWrapper>
    <LoadingSpinner />
    <LoadingText
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {message}
    </LoadingText>
  </LoadingWrapper>
);

// Skeleton Loading for Cards
const SkeletonWrapper = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.base};
  border: 1px solid ${props => props.theme.colors.border};
`;

const SkeletonItem = styled.div`
  background: linear-gradient(90deg, 
    ${props => props.theme.colors.background} 25%, 
    #f0f0f0 50%, 
    ${props => props.theme.colors.background} 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: ${props => props.theme.borderRadius.base};
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const SkeletonTitle = styled(SkeletonItem)`
  height: 24px;
  width: 80%;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SkeletonText = styled(SkeletonItem)`
  height: 16px;
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const SkeletonImage = styled(SkeletonItem)`
  height: 200px;
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const CardSkeleton = () => (
  <SkeletonWrapper>
    <SkeletonImage />
    <SkeletonTitle />
    <SkeletonText />
    <SkeletonText style={{ width: '60%' }} />
  </SkeletonWrapper>
);

// Error Component
const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing['4xl']} ${props => props.theme.spacing.lg};
  text-align: center;
  min-height: 400px;
`;

const ErrorIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.theme.colors.error}20;
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  svg {
    color: ${props => props.theme.colors.error};
  }
`;

const ErrorTitle = styled.h3`
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.fontSizes.xl};
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.lg};
  max-width: 400px;
`;

const RetryButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.base};
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

export const ErrorBoundary = ({ 
  title = "Something went wrong", 
  message = "We're having trouble loading this content. Please try again.", 
  onRetry 
}) => (
  <ErrorWrapper>
    <ErrorIcon>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </ErrorIcon>
    <ErrorTitle>{title}</ErrorTitle>
    <ErrorMessage>{message}</ErrorMessage>
    {onRetry && <RetryButton onClick={onRetry}>Try Again</RetryButton>}
  </ErrorWrapper>
);

export default PageLoader;