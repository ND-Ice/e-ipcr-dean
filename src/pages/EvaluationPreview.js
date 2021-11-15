import React from "react";
import styled from "styled-components";
import { EvaluationSummary, ResponseCountSummary } from "../components";
import background from "../image/background.jpg";

export default function EvaluationPreview() {
  return (
    <AppContainer>
      <AppHeader bg={background}>
        <AppHeading>2021-2022 E-IPCR for CAS</AppHeading>
        <Description>
          This is just some quick text to be a place holder for description
          field, it can be 20 or 40 lines long of just random strings. this type
          of quick text can only be done or written by a legendary person. that
          person is a porn addict.
        </Description>
      </AppHeader>
      <AppContent>
        <ResponseCountSummary />
        <EvaluationSummary />
      </AppContent>
    </AppContainer>
  );
}

const AppContainer = styled.div``;

const AppHeader = styled.div`
  padding: 2rem;
  border-radius: 0.5rem;
  background: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
`;

const AppHeading = styled.h1`
  color: ${(props) => props.theme.colors.white};
  max-width: 40ch;
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.white};

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    max-width: 80ch;
  }
`;

const AppContent = styled.div`
  display: grid;
  margin-top: 0.5rem;
  gap: 0.5rem;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 3fr;
  }
`;
