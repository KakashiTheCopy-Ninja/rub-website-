// src/components/common/Newsletter.js - Create this file
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiSend, 
  FiCheck,
  FiUser,
  FiPhone
} from 'react-icons/fi';

const NewsletterSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.primaryDark} 100%);
  padding: ${props => props.theme.spacing['4xl']} 0;
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
`;

const NewsletterContainer = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const NewsletterTitle = styled(motion.h2)`
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: 700;
  color: ${props => props.theme.colors.white};
  margin-bottom: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes['2xl']};
  }
`;

const NewsletterSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.lg};
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: ${props => props.theme.spacing.xl};
  line-height: 1.6;
`;

const NewsletterForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const InputGroup = styled.div`
  position: relative;
  flex: 1;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-bottom: ${props => props.theme.spacing.sm};
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: ${props => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textLight};
  z-index: 1;
`;

const FormInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.md} ${props => props.theme.spacing.md} 50px;
  border: 2px solid transparent;
  border-radius: ${props => props.theme.borderRadius.base};
  font-size: ${props => props.theme.fontSizes.base};
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.textPrimary};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
    box-shadow: 0 0 0 3px rgba(244, 208, 63, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textLight};
  }

  &:invalid {
    border-color: ${props => props.theme.colors.error};
  }
`;

const SubmitButton = styled.button`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.base};
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.base};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 140px;
  height: 56px;

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid ${props => props.theme.colors.success};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.base};
  margin-top: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};

  svg {
    color: ${props => props.theme.colors.success};
  }
`;

const ErrorMessage = styled(motion.div)`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid ${props => props.theme.colors.error};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.base};
  margin-top: ${props => props.theme.spacing.sm};
  text-align: center;
  font-size: ${props => props.theme.fontSizes.sm};
`;

const Benefits = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing['3xl']};
  text-align: left;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    text-align: center;
  }
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
  color: rgba(255, 255, 255, 0.9);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .icon {
    color: ${props => props.theme.colors.secondary};
    margin-top: 4px;
    flex-shrink: 0;
  }

  .content {
    h4 {
      color: ${props => props.theme.colors.white};
      margin-bottom: ${props => props.theme.spacing.xs};
      font-weight: 600;
    }

    p {
      font-size: ${props => props.theme.fontSizes.sm};
      opacity: 0.8;
      line-height: 1.5;
    }
  }
`;

const PrivacyNote = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.7);
  margin-top: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const Newsletter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and email are required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an actual API call
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '' });
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
      
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: <FiMail size={20} />,
      title: "Industry Insights",
      description: "Get the latest poultry farming trends and market updates delivered to your inbox."
    },
    {
      icon: <FiCheck size={20} />,
      title: "Exclusive Offers",
      description: "Be the first to know about special discounts and new product launches."
    },
    {
      icon: <FiUser size={20} />,
      title: "Expert Tips",
      description: "Receive practical advice from our nutrition specialists and farming experts."
    }
  ];

  return (
    <NewsletterSection>
      <div className="container">
        <NewsletterContainer>
          <NewsletterTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Stay Connected with RUB Associates
          </NewsletterTitle>
          
          <NewsletterSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Subscribe to our newsletter for the latest updates on poultry nutrition, 
            industry news, and exclusive offers designed to boost your farm's success.
          </NewsletterSubtitle>

          {!isSuccess ? (
            <NewsletterForm
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <InputGroup>
                <InputIcon>
                  <FiUser size={18} />
                </InputIcon>
                <FormInput
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>

              <InputGroup>
                <InputIcon>
                  <FiMail size={18} />
                </InputIcon>
                <FormInput
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>

              <InputGroup>
                <InputIcon>
                  <FiPhone size={18} />
                </InputIcon>
                <FormInput
                  type="tel"
                  name="phone"
                  placeholder="Phone (Optional)"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </InputGroup>

              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? (
                  'Subscribing...'
                ) : (
                  <>
                    Subscribe <FiSend size={16} />
                  </>
                )}
              </SubmitButton>
              
              {error && (
                <ErrorMessage
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </ErrorMessage>
              )}
            </NewsletterForm>
          ) : (
            <SuccessMessage
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FiCheck size={24} />
              <div>
                <strong>Success!</strong> You've been subscribed to our newsletter. 
                Thank you for joining the RUB Associates community!
              </div>
            </SuccessMessage>
          )}

          <Benefits
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <BenefitItem key={index}>
                <div className="icon">
                  {benefit.icon}
                </div>
                <div className="content">
                  <h4>{benefit.title}</h4>
                  <p>{benefit.description}</p>
                </div>
              </BenefitItem>
            ))}
          </Benefits>

          <PrivacyNote>
            We respect your privacy. Unsubscribe at any time. 
            Read our <strong>Privacy Policy</strong> for more details.
          </PrivacyNote>
        </NewsletterContainer>
      </div>
    </NewsletterSection>
  );
};

export default Newsletter;