import React from "react";
import styled from "styled-components";
import { RotateLoader } from "react-spinners";

export default function Loader() {
  return (
    <Container>
      <RotateLoader color="#0064f9" />
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  display: grid;
  place-items: center;
  min-height: 500px;
`;
