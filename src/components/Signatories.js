import React from "react";
import styled from "styled-components";

export default function Signatories({ response }) {
  const { signatures, user, isApproved } = response;
  // const { approvedBy } = isApproved;

  return <Container>{/* hr */}</Container>;
}

const Container = styled.div`
  display: grid;
  gap: 1rem;
  min-height: 120px;
  grid-template-columns: repeat(3, 1fr);
`;
