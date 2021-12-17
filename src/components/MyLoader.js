import React from "react";
import styled from "styled-components";
import { HashLoader } from "react-spinners";

export default function MyLoader() {
  return (
    <Container>
      <HashLoader loading={true} size={60} color="#0064f9" />
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  min-height: 500px;
  display: grid;
  place-items: center;
`;
