import React from "react";
import { FiInfo } from "react-icons/fi";
import styled from "styled-components";

export default function InfoCardItem({ title }) {
  return (
    <Container>
      <IconContainer>
        <FiInfo className="icon" />
      </IconContainer>
      <Title>{title}</Title>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 2px 0;
  padding: 0.5rem;
  border: 2px solid ${(props) => props.theme.colors.secondary};
  border-radius: 0.5rem;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  background: ${(props) => props.theme.colors.accent.emerald};
  display: grid;
  place-items: center;
  border-radius: 50%;

  .icon {
    width: 24px;
    height: 24px;
    color: #ffffff;
  }
`;

const Title = styled.span`
  font-size: 1.2rem;
  flex: 1;
  margin-left: 1rem;
  word-break: break-all;
`;
