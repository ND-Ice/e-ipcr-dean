import React from "react";
import styled from "styled-components";

export default function FunctionDetails({ title, description, percentage }) {
  return (
    <div>
      <Title>
        {title} ({percentage}%)
      </Title>
      <Description>{description}</Description>
    </div>
  );
}

const Title = styled.h6`
  margin: 0;
`;

const Description = styled.p`
  margin: 0;
  max-width: 50ch;
`;
