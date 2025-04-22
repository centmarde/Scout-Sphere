"use client"

import * as React from "react"
import { MainSidebar } from "@/components/sidebar"
import styled from "styled-components"
import { useIsMobile } from "@/utils/mobile"

// Update the type definitions for styled components to include the isMobile prop
interface LayoutProps {
  isMobile?: boolean;
}

const LayoutContainer = styled.div<LayoutProps>`
  display: flex;
  min-height: 100vh;
  width: 100%;
  flex-direction: ${props => props.isMobile ? "column" : "row"};
`;

const ContentArea = styled.main<LayoutProps>`
  flex: 1;
  padding: ${props => props.isMobile ? "calc(60px + 1rem) 1rem 1rem 1rem" : "1.5rem"};
  overflow-y: auto;
`;

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <LayoutContainer isMobile={isMobile}>
      <MainSidebar isMobile={isMobile} />
      <ContentArea isMobile={isMobile}>
        {children}
      </ContentArea>
    </LayoutContainer>
  );
}
