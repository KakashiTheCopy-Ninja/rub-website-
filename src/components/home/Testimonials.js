// src/components/home/Testimonials.js - Create this file
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiStar, 
  FiMessageSquare,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
} from 'react-icons/fi';

const TestimonialsSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: linear-gradient(135deg, ${props => props.theme.colors.white} 0%, ${props => props.theme.colors.background} 100%);
  position: relative;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['4xl']};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: 700;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.md};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    border-radius: 2px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const TestimonialsContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
`;

const TestimonialSlider = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius.xl};
`;

const TestimonialCard = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing['3xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.xl};
  text-align: center;
  border: 1px solid ${props => props.theme.colors.border};
`;

const QuoteIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}15, ${props => props.theme.colors.secondary}15);
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};

  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const TestimonialText = styled.p`
  font-size: ${props => props.theme.fontSizes.xl};
  font-style: italic;
  color: ${props => props.theme.colors.textPrimary};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
`;

const AuthorAvatar = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.lg};
`;

const AuthorInfo = styled.div`
  text-align: left;

  .name {
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: 600;
    color: ${props => props.theme.colors.textPrimary};
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  .title {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  .company {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.primary};
    font-weight: 500;
  }
`;

const StarRating = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.lg};

  svg {
    color: ${props => props.theme.colors.secondary};
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
`;

const NavButton = styled.button`
  width: 50px;
  height: 50px;
  background: ${props => props.theme.colors.white};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textSecondary};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    transform: translateY(-3px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.lg};
`;

const Indicator = styled.button`
  width: 12px;
  height: 12px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    transform: scale(1.2);
  }
`;

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      text: "R.U.B Associates has been our trusted partner for over 8 years. Their feed additives have significantly improved our poultry performance and profitability. The quality is consistently excellent.",
      author: "Muhammad Ahmad",
      title: "Farm Owner",
      company: "Ahmad Poultry Farm",
      rating: 5,
      avatar: "MA"
    },
    {
      id: 2,
      text: "The automated feeding system from R.U.B has revolutionized our operations. Installation was smooth and their technical support is outstanding. Highly recommended!",
      author: "Fatima Khan",
      title: "Operations Manager",
      company: "Khan Farms Ltd",
      rating: 5,
      avatar: "FK"
    },
    {
      id: 3,
      text: "Outstanding service and premium quality products. Their vitamin premix has helped us achieve 25% better feed conversion rates. The investment was worth every penny.",
      author: "Ali Hassan",
      title: "Poultry Consultant",
      company: "Hassan Agri Solutions",
      rating: 5,
      avatar: "AH"
    },
    {
      id: 4,
      text: "Working with R.U.B Associates for 5 years now. Their expertise in poultry nutrition and equipment solutions is unmatched. They truly understand our business needs.",
      author: "Sarah Ahmed",
      title: "Managing Director",
      company: "Green Valley Farms",
      rating: 5,
      avatar: "SA"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  return (
    <TestimonialsSection 
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="container">
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What Our Clients Say
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Trusted by hundreds of poultry farmers across Pakistan for premium feed solutions and exceptional service.
          </SectionSubtitle>
        </SectionHeader>

        <TestimonialsContainer>
          <TestimonialSlider>
            <AnimatePresence mode="wait">
              <TestimonialCard
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <QuoteIcon>
                  <FiMessageSquare size={24} />
                </QuoteIcon>

                <StarRating>
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <FiStar key={i} size={20} fill="currentColor" />
                  ))}
                </StarRating>

                <TestimonialText>
                  "{testimonials[currentIndex].text}"
                </TestimonialText>

                <TestimonialAuthor>
                  <AuthorAvatar>
                    {testimonials[currentIndex].avatar}
                  </AuthorAvatar>
                  <AuthorInfo>
                    <div className="name">{testimonials[currentIndex].author}</div>
                    <div className="title">{testimonials[currentIndex].title}</div>
                    <div className="company">{testimonials[currentIndex].company}</div>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            </AnimatePresence>
          </TestimonialSlider>

          <NavigationButtons>
            <NavButton onClick={prevTestimonial}>
              <FiChevronLeft size={20} />
            </NavButton>
            <NavButton onClick={nextTestimonial}>
              <FiChevronRight size={20} />
            </NavButton>
          </NavigationButtons>

          <Indicators>
            {testimonials.map((_, index) => (
              <Indicator
                key={index}
                isActive={index === currentIndex}
                onClick={() => goToTestimonial(index)}
              />
            ))}
          </Indicators>
        </TestimonialsContainer>
      </div>
    </TestimonialsSection>
  );
};

export default Testimonials;