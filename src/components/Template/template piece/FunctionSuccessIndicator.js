import React from "react";
import styled from "styled-components";

export default function FunctionSuccessIndicator({ title, description }) {
  return (
    <div>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </div>
  );
}

const Title = styled.h6`
  margin: 0;
  max-width: 35ch;
`;

const Description = styled.p`
  margin: 0;
  max-width: 30ch;
`;
