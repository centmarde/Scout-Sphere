import React from 'react'
import LoginPage from '../components/login'
import styled from 'styled-components'
import { ThemeProvider, useTheme } from '@/theme/theme'

const HeroContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

// We'll create a component that uses the theme
const ThemedHero = () => {
  const theme = useTheme();
  
  const ImageSection = styled.div`
    flex: 1;
    background-image: url('/images/buena.jpg');
    background-size: cover;
    background-position: center;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(32, 87, 129, 0.3); /* Using primary color with opacity */
    }

    @media (max-width: 768px) {
      display: none;
    }
  `;

  const ContentSection = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.background};
    
    @media (max-width: 768px) {
      flex: 1;
    }
  `;

  const HeroOverlayText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
    z-index: 1;
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: white;
    }
    
    p {
      font-size: 1.2rem;
      color: white;
    }
  `;

  return (
    <HeroContainer>
      <ImageSection>
        <HeroOverlayText>
          <h1>Preserving Our Cultural Heritage</h1>
          <p>Join us in documenting and protecting our shared legacy</p>
        </HeroOverlayText>
      </ImageSection>
      <ContentSection>
        <LoginPage />
      </ContentSection>
    </HeroContainer>
  );
};

// Main component wrapped with ThemeProvider
const Hero = () => {
  return (
    <ThemeProvider>
      <ThemedHero />
    </ThemeProvider>
  );
};

export default Hero;
