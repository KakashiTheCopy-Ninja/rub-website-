// src/components/common/FAQ.js - Create this file
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiChevronDown,
  FiChevronUp,
  FiHelpCircle,
  FiMessageCircle,
  FiPhone
} from 'react-icons/fi';

const FAQSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.background};
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

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-bottom: ${props => props.theme.spacing.md};
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const FAQQuestion = styled.div`
  padding: ${props => props.theme.spacing.lg};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.background};
  }

  h3 {
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: 600;
    color: ${props => props.theme.colors.textPrimary};
    margin: 0;
    flex: 1;
  }

  .icon {
    color: ${props => props.theme.colors.primary};
    transition: all 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

const FAQAnswer = styled(motion.div)`
  overflow: hidden;
`;

const FAQAnswerContent = styled.div`
  padding: 0 ${props => props.theme.spacing.lg} ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;

  p {
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  ul {
    margin: ${props => props.theme.spacing.sm} 0;
    padding-left: ${props => props.theme.spacing.lg};

    li {
      margin-bottom: ${props => props.theme.spacing.xs};
      list-style-type: disc;
    }
  }

  strong {
    color: ${props => props.theme.colors.textPrimary};
  }
`;

const ContactSection = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryDark});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  margin-top: ${props => props.theme.spacing['3xl']};
`;

const ContactTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.white};
`;

const ContactText = styled.p`
  margin-bottom: ${props => props.theme.spacing.lg};
  opacity: 0.9;
`;

const ContactButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const ContactButton = styled.button`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.base};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      question: "What makes R.U.B Associates' feed additives different from competitors?",
      answer: `Our feed additives are sourced from premium global manufacturers and undergo rigorous quality testing. We offer:
      
      • **Premium Grade Ingredients**: Only the highest quality vitamins, minerals, and amino acids
      • **Proven Results**: Documented improvements in feed conversion ratios up to 25%
      • **Expert Formulation**: Custom blends designed by our nutrition specialists
      • **Quality Assurance**: Every batch is lab-tested for purity and potency
      • **Technical Support**: Ongoing consultation to optimize your feeding program`
    },
    {
      question: "How long does equipment installation typically take?",
      answer: `Installation timeframes vary depending on the system complexity:
      
      • **Feeding Systems**: 3-5 days for complete installation
      • **Ventilation Equipment**: 2-3 days including testing
      • **Drinking Systems**: 2-4 days with system calibration
      • **Complete Farm Setup**: 2-3 weeks with commissioning
      
      Our experienced technicians ensure minimal disruption to your operations and provide comprehensive training on all equipment.`
    },
    {
      question: "Do you provide technical support after purchase?",
      answer: `Yes, we provide comprehensive after-sales support including:
      
      • **24/7 Helpline**: Emergency technical support available round the clock
      • **Regular Maintenance**: Scheduled maintenance visits and system checks
      • **Training Programs**: Ongoing training for your farm staff
      • **Performance Monitoring**: Regular assessment and optimization recommendations
      • **Warranty Coverage**: Complete warranty support for all equipment
      • **Spare Parts**: Quick availability of genuine spare parts`
    },
    {
      question: "What are your delivery areas across Pakistan?",
      answer: `We provide nationwide delivery across Pakistan including:
      
      • **Punjab**: Lahore, Karachi, Faisalabad, Rawalpindi, Multan, Gujranwala
      • **Sindh**: Karachi, Hyderabad, Sukkur, Larkana
      • **KPK**: Peshawar, Mardan, Kohat, Bannu
      • **Balochistan**: Quetta, Turbat, Gwadar
      • **Remote Areas**: Special arrangements for distant locations
      
      Delivery typically takes 3-7 days depending on location and product type.`
    },
    {
      question: "Can I get custom feed formulations for my specific requirements?",
      answer: `Absolutely! We specialize in custom feed solutions:
      
      • **Nutritional Assessment**: Detailed analysis of your current feeding program
      • **Custom Formulation**: Tailored vitamin and mineral premixes
      • **Trial Periods**: Small batch testing before full implementation
      • **Performance Monitoring**: Regular evaluation and adjustments
      • **Cost Optimization**: Formulations designed for maximum ROI
      
      Our nutrition experts work closely with you to develop the perfect solution for your poultry operation.`
    },
    {
      question: "What financing options are available for equipment purchases?",
      answer: `We offer flexible financing solutions:
      
      • **Installment Plans**: 6, 12, and 24-month payment options
      • **Leasing Programs**: Equipment leasing with buyout options
      • **Trade-in Programs**: Credit for your existing equipment
      • **Seasonal Payment Plans**: Aligned with your cash flow cycles
      • **Bank Partnerships**: Special rates through partner banks
      
      Contact our sales team to discuss the best financing option for your needs.`
    },
    {
      question: "How do I place an order and what are the payment terms?",
      answer: `Placing an order is simple:
      
      **Order Process:**
      1. Contact our sales team or visit our office
      2. Receive detailed quotation and specifications
      3. Confirm order with signed agreement
      4. Production/sourcing begins immediately
      
      **Payment Terms:**
      • 30% advance payment with order confirmation
      • 60% before dispatch
      • 10% after successful installation and testing
      • Special terms available for bulk orders and regular customers`
    },
    {
      question: "Do you offer training for equipment operation and maintenance?",
      answer: `Yes, comprehensive training is included with every equipment purchase:
      
      • **Initial Training**: On-site training during installation
      • **Operation Manual**: Detailed guides in English and Urdu
      • **Video Tutorials**: Access to our online training library
      • **Refresher Sessions**: Periodic training updates
      • **Troubleshooting Guide**: Step-by-step problem-solving instructions
      • **Expert Consultation**: Direct access to our technical team
      
      We ensure your team is fully equipped to operate and maintain all equipment efficiently.`
    }
  ];

  return (
    <FAQSection>
      <div className="container">
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Find answers to common questions about our products, services, and support.
          </SectionSubtitle>
        </SectionHeader>

        <FAQContainer>
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FAQQuestion
                onClick={() => toggleItem(index)}
                isOpen={openItems.has(index)}
              >
                <h3>{faq.question}</h3>
                <div className="icon">
                  {openItems.has(index) ? (
                    <FiChevronUp size={24} />
                  ) : (
                    <FiChevronDown size={24} />
                  )}
                </div>
              </FAQQuestion>
              
              <AnimatePresence>
                {openItems.has(index) && (
                  <FAQAnswer
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FAQAnswerContent>
                      {faq.answer.split('\n').map((paragraph, pIndex) => {
                        if (paragraph.trim().startsWith('•')) {
                          return <li key={pIndex}>{paragraph.replace('• ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>;
                        } else if (paragraph.trim()) {
                          return (
                            <p 
                              key={pIndex}
                              dangerouslySetInnerHTML={{
                                __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              }}
                            />
                          );
                        }
                        return null;
                      })}
                    </FAQAnswerContent>
                  </FAQAnswer>
                )}
              </AnimatePresence>
            </FAQItem>
          ))}
        </FAQContainer>

        <ContactSection>
          <FiHelpCircle size={48} style={{ margin: '0 auto 1rem', display: 'block', color: '#F4D03F' }} />
          <ContactTitle>Still have questions?</ContactTitle>
          <ContactText>
            Our expert team is here to help. Contact us directly for personalized assistance 
            with your poultry nutrition and equipment needs.
          </ContactText>
          <ContactButtons>
            <ContactButton>
              <FiPhone size={18} />
              Call: +92-51-4927177
            </ContactButton>
            <ContactButton>
              <FiMessageCircle size={18} />
              Email: rubinfo@dsl.net
            </ContactButton>
          </ContactButtons>
        </ContactSection>
      </div>
    </FAQSection>
  );
};

export default FAQ;