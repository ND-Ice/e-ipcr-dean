import React from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";

import { BrandName, IconButton } from "..";

export default function Sidebar({ onSidebarToggle, isToggle, children }) {
  return (
    <SidebarContainer active={isToggle}>
      <SidebarHeader>
        <BrandName />
        <IconButton icon={FiX} size={35} onClick={onSidebarToggle} />
      </SidebarHeader>
      {children}
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  background: ${(props) => props.theme.colors.secondary};
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0.3s;
  transform: translateX(${(props) => (props.active ? 0 : "-100%")});

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 4px solid ${(props) => props.theme.colors.white};
`;
