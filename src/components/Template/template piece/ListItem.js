import React from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";

export default function ListItem({ item, onDelete }) {
  return (
    <Container>
      <Title>{item?.item} </Title>
      <Icon onClick={() => onDelete(item?.id)}>
        <FiX />
      </Icon>
    </Container>
  );
}

const Title = styled.p`
  margin: 0;
  flex: 1;
`;

const Container = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  border-radius: 2px;
  margin: 0.3rem 0;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const Icon = styled.div`
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 2px;
  transition: all 300ms;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;
