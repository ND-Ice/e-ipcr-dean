import React from "react";
import styled from "styled-components";

export default function BrandName() {
  return (
    <BrandContainer>
      <h3>IPCR</h3>
    </BrandContainer>
  );
}

const BrandContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;
