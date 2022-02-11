import React from "react";
import styled from "styled-components";
import { RotateLoader } from "react-spinners";

export default function MyLoader() {
  return (
    <Container>
      <RotateLoader loading={true} color="#0064f9" />
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  min-height: 400px;
  display: grid;
  place-items: center;
`;
