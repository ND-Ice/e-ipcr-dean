import React from "react";
import styled from "styled-components";

export default function SidebarItem({
  icon: Icon,
  onNavigate,
  sidebarInfo,
  isActive,
}) {
  return (
    <Container onClick={onNavigate} active={isActive}>
      <div>{Icon && <Icon className="sidebar-icon" />}</div>
      <SidebarTitle>{sidebarInfo?.title}</SidebarTitle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  transition: all 0.3s;
  cursor: pointer;
  color: ${(props) =>
    props.active ? props.theme.colors.white : props.theme.colors.black};
  background: ${(props) =>
    props.active
      ? props.theme.colors.accent.blue
      : props.theme.colors.secondary};

  :hover {
    color: ${(props) =>
      props.active ? props.theme.colors.white : props.theme.colors.accent.blue};
  }
`;

const SidebarTitle = styled.span`
  margin-left: 1rem;
  text-transform: uppercase;
`;
