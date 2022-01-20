import React from "react";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";

export default function FunctionHeader({ title, percentage, onAdd }) {
  return (
    <Container>
      <h6 className="m-0">
        {title} ({percentage}%)
      </h6>
      <FiPlus className="icon" onClick={onAdd} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .icon {
    cursor: pointer;
    font-size: 1.2rem;
    border-radius: 2px;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.accent.blue};
  }
`;
