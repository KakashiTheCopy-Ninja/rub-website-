// src/pages/Contact.js - Replace with this complete Contact page
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiClock,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiCheckCircle,
  FiFacebook,
  FiLinkedin,
  FiInstagram,
  FiGlobe,
  FiBuilding
} from 'react-icons/fi';

const ContactPage = styled.div`
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

// Main Contact Section
const ContactSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.background};
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['4xl']};
  align-items: start;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

// Contact Information
const ContactInfo = styled.div``;

const InfoCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.base};
  border: 1px solid ${props => props.theme.colors.border};
  margin-bottom: ${props => props.theme.spacing.lg};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};

  .icon {
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}15, ${props => props.theme.colors.secondary}15);
    border-radius: ${props => props.theme.borderRadius.lg};
    padding: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.primary};
  }
`;

const InfoTitle = styled.h3`
  color: ${props => props.theme.colors.textPrimary};
  margin: 0;
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: 600;
`;

const InfoDetails = styled.div`
  margin-left: 60px;

  p {
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: ${props => props.theme.spacing.sm};
    line-height: 1.6;
  }

  .highlight {
    color: ${props => props.theme.colors.primary};
    font-weight: 500;
  }

  a {
    color: ${props => props.theme.colors.primary};
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }
`;

// Contact Form
const ContactForm = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.base};
  border: 1px solid ${props => props.theme.colors.border};
`;

const FormTitle = styled.h3`
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 600;
  text-align: center;
`;

const Form = styled.form``;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  position: relative;

  label {
    display: block;
    color: ${props => props.theme.colors.textPrimary};
    margin-bottom: ${props => props.theme.spacing.sm};
    font-weight: 500;
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.base};
  font-size: ${props => props.theme.fontSizes.base};
  transition: all 0.3s ease;
  background: ${props => props.theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(43, 93, 65, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textLight};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.base};
  font-size: ${props => props.theme.fontSizes.base};
  background: ${props => props.theme.colors.white};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(43, 93, 65, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.base};
  font-size: ${props => props.theme.fontSizes.base};
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(43, 93, 65, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textLight};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryDark});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.base};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

// Success Message
const SuccessMessage = styled(motion.div)`
  background: ${props => props.theme.colors.success};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.base};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

// Map Section
const MapSection = styled.section`
  padding: ${props => props.theme.spacing['3xl']} 0;
  background: ${props => props.theme.colors.white};
`;

const MapContainer = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.base};
  border: 1px solid ${props => props.theme.colors.border};
  height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.lg};
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};

  .map-icon {
    color: ${props => props.theme.colors.primary};
  }
`;

// Social Links
const SocialSection = styled.section`
  padding: ${props => props.theme.spacing['3xl']} 0;
  background: ${props => props.theme.colors.background};
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const SocialCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.base};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  .icon {
    background: linear-gradient(135deg, ${props => props.color}15, ${props => props.theme.colors.secondary}15);
    border-radius: ${props => props.theme.borderRadius.full};
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${props => props.theme.spacing.md};
    color: ${props => props.color};
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <FiMapPin size={24} />,
      title: "Corporate Office",
      details: [
        "House No 80-C Near EOBI Office,",
        "Satellite Town, Rawalpindi,", 
        "Punjab, Pakistan"
      ]
    },
    {
      icon: <FiPhone size={24} />,
      title: "Phone Numbers",
      details: [
        <span key="direct" className="highlight">Direct Line: +92-51-4927177</span>,
        "Mobile: +92-300-5555555",
        "WhatsApp: +92-300-5555555"
      ]
    },
    {
      icon: <FiMail size={24} />,
      title: "Email Addresses",
      details: [
        <a key="email1" href="mailto:rubinfo@dsl.net">rubinfo@dsl.net</a>,
        <a key="email2" href="mailto:info@rubassociates.com">info@rubassociates.com</a>,
        <a key="email3" href="mailto:sales@rubassociates.com">sales@rubassociates.com</a>
      ]
    },
    {
      icon: <FiClock size={24} />,
      title: "Business Hours",
      details: [
        <span key="weekdays" className="highlight">Monday - Friday: 8:00 AM - 6:00 PM</span>,
        "Saturday: 9:00 AM - 4:00 PM",
        "Sunday: Closed"
      ]
    }
  ];

  const socialLinks = [
    {
      icon: <FiFacebook size={24} />,
      title: "Facebook",
      description: "Follow us for latest updates and industry news",
      color: "#1877F2"
    },
    {
      icon: <FiLinkedin size={24} />,
      title: "LinkedIn", 
      description: "Connect with us professionally",
      color: "#0A66C2"
    },
    {
      icon: <FiInstagram size={24} />,
      title: "Instagram",
      description: "See our products and installations in action",
      color: "#E4405F"
    }
  ];

  return (
    <ContactPage>
      {/* Hero Section */}
      <HeroSection>
        <div className="container">
          <HeroContent>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}
            >
              Contact Us
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'rgba(255, 255, 255, 0.9)' }}
            >
              Get in touch with our experts for customized poultry solutions and professional consultation
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F4D03F' }}>24/7</div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>Expert Support</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F4D03F' }}>45+</div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>Happy Clients</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F4D03F' }}>100%</div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>Satisfaction Rate</div>
              </div>
            </motion.div>
          </HeroContent>
        </div>
      </HeroSection>

      {/* Main Contact Section */}
      <ContactSection>
        <div className="container">
          <ContactGrid>
            {/* Contact Information */}
            <ContactInfo>
              <motion.h2
                style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '2rem', color: '#2B5D41' }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Get In Touch
              </motion.h2>
              
              {contactInfo.map((info, index) => (
                <InfoCard
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <InfoHeader>
                    <div className="icon">
                      {info.icon}
                    </div>
                    <InfoTitle>{info.title}</InfoTitle>
                  </InfoHeader>
                  <InfoDetails>
                    {info.details.map((detail, idx) => (
                      <p key={idx}>{detail}</p>
                    ))}
                  </InfoDetails>
                </InfoCard>
              ))}
            </ContactInfo>

            {/* Contact Form */}
            <ContactForm
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <FormTitle>Send Us a Message</FormTitle>
              
              {showSuccess && (
                <SuccessMessage
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <FiCheckCircle size={20} />
                  Thank you! Your message has been sent successfully.
                </SuccessMessage>
              )}

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <label htmlFor="name">Full Name *</label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="email">Email Address *</label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="phone">Phone Number</label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="company">Company/Farm Name</label>
                  <Input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter your company or farm name"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="subject">Subject *</label>
                  <Select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="quote-request">Quote Request</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="general">General Inquiry</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <label htmlFor="message">Message *</label>
                  <TextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your requirements or ask any questions..."
                    required
                  />
                </FormGroup>

                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div style={{ 
                        width: '16px', 
                        height: '16px', 
                        border: '2px solid transparent', 
                        borderTop: '2px solid white', 
                        borderRadius: '50%', 
                        animation: 'spin 1s linear infinite' 
                      }}></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend size={16} />
                      Send Message
                    </>
                  )}
                </SubmitButton>
              </Form>
            </ContactForm>
          </ContactGrid>
        </div>
      </ContactSection>

      {/* Map Section */}
      <MapSection>
        <div className="container">
          <motion.h2
            style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', fontWeight: 700, color: '#2B5D41' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Find Us
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <MapContainer>
              <FiMapPin className="map-icon" size={48} />
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#2B5D41' }}>Visit Our Office</h4>
                <p style={{ margin: 0, lineHeight: 1.6 }}>
                  House No 80-C Near EOBI Office,<br />
                  Satellite Town, Rawalpindi, Punjab, Pakistan
                </p>
              </div>
              <div style={{ 
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                background: '#2B5D41',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                fontSize: '0.875rem'
              }}>
                Interactive Map Coming Soon
              </div>
            </MapContainer>
          </motion.div>
        </div>
      </MapSection>

      {/* Social Links */}
      <SocialSection>
        <div className="container">
          <motion.h2
            style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', fontWeight: 700, color: '#2B5D41' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Connect With Us
          </motion.h2>

          <SocialGrid>
            {socialLinks.map((social, index) => (
              <SocialCard
                key={index}
                color={social.color}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="icon">
                  {social.icon}
                </div>
                <h4 style={{ marginBottom: '0.5rem', color: '#2B5D41' }}>{social.title}</h4>
                <p style={{ margin: 0, color: '#5A6B5D', fontSize: '0.875rem' }}>
                  {social.description}
                </p>
              </SocialCard>
            ))}
          </SocialGrid>
        </div>
      </SocialSection>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </ContactPage>
  );
};

export default Contact;