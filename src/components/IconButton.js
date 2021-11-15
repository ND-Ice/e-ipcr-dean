import React from "react";
import styled from "styled-components";

export default function IconButton({
  icon: Icon,
  size,
  iconColor,
  bg,
  ...otherProps
}) {
  return (
    <IconContainer size={size} color={iconColor} bg={bg} {...otherProps}>
      <Icon className="icon" />
    </IconContainer>
  );
}

const IconContainer = styled.div`
  display: inline-grid;
  place-items: center;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  border-radius: 50%;
  cursor: pointer;
  background: ${(props) => props.bg};
  transition: all 0.3s;

  .icon {
    width: ${(props) => `${props.size * 0.7}px`};
    height: ${(props) => `${props.size * 0.7}px`};
    color: ${(props) => props.color};
  }

  :hover {
    opacity: 0.4;
  }
`;
