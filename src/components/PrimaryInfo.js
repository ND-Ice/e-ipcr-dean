import React from "react";
import styled from "styled-components";

export default function PrimaryInfo({ user }) {
  return (
    <Container>
      <p>{user.email}</p>
      <p>{user.contat || "Not yet defined"}</p>
      <p>{user.email}</p>
      <p>{user.email}</p>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  background: ${({ theme }) => theme.colors.white};
`;
