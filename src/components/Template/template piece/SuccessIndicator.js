import React from "react";
import styled from "styled-components";

export default function SuccessIndicator({ succ, onEdit }) {
  const { title, description } = succ;
  return (
    <ListItem onClick={onEdit}>
      <h6 className="m-0">{title}</h6>
      <p>{description}</p>
    </ListItem>
  );
}

const ListItem = styled.li`
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    color: ${({ theme }) => theme.colors.accent.blue};
  }
`;
