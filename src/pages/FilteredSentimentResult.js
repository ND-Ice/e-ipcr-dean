import React from "react";
import styled from "styled-components";
import EvaluationResultSummary from "../components/Cards/EvaluationResultSummary";

const evaluationResults = [
  {
    id: 1,
    title: "20201 E-ipcr Evaluation for CAS",
    dept: "CAS",
    user: {
      image:
        "https://www.asurascans.com/wp-content/uploads/2021/10/promo-banner.jpg",
      name: "Asura Scans",
      email: "asurascans@gmail.com",
      dept: "CAS",
    },
    remarks: "Satisfactory",
    sentiment: "Positive",
  },
  {
    id: 2,
    title: "20201 E-ipcr Evaluation for CAS",
    dept: "CAS",
    user: {
      image:
        "https://ww.asurascans.com/wp-content/uploads/2021/10/promo-banner.jpg",
      name: "Reaper Scans",
      email: "reaperscans@gmail.com",
      dept: "CAS",
    },
    remarks: "Poor",
    sentiment: "Negative",
  },
  {
    id: 3,
    title: "20201 E-ipcr Evaluation for CAS",
    dept: "CAS",
    user: {
      image:
        "https://ww.asurascans.com/wp-content/uploads/2021/10/promo-banner.jpg",
      name: "Emperor Scans",
      email: "emperorscans@gmail.com",
      dept: "CAS",
    },
    remarks: "Poor",
    sentiment: "Negative",
  },
];

export default function FilteredSentimentResult({ match }) {
  const sentiment = match.params.result;
  return (
    <AppContainer>
      <AppHeader>
        <h1>{sentiment}</h1>
      </AppHeader>
      <AppContent>
        {evaluationResults.map((result) => (
          <EvaluationResultSummary evaluation={result} key={result.id} />
        ))}
      </AppContent>
    </AppContainer>
  );
}

const AppContainer = styled.div``;

const AppHeader = styled.div`
  padding: 1rem;
`;

const AppContent = styled.div`
  padding: 1rem;
  display: grid;
  gap: 1rem;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
