import React from "react";
import styled from "styled-components";

export default function TemplateIcon({ icon: Icon, fg, bg, ...otherProps }) {
  return (
    <IconContainer bg={bg} fg={fg} {...otherProps}>
      <Icon className="icon" />
    </IconContainer>
  );
}

const IconContainer = styled.div`
  display: inline-grid;
  place-items: center;
  border-radius: 2px;
  width: 30px;
  height: 30px;
  color: ${({ fg }) => fg};
  background: ${({ bg }) => bg};
  cursor: pointer;
`;
