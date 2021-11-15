import React from "react";
import styled from "styled-components";
import SummaryCard from "./SummaryCard";
import SentimentCard from "./SentimentCard";
import { useHistory } from "react-router";

const evaluationSummary = [
  { id: 1, value: "Excellent" },
  { id: 2, value: "Very Satisfactory" },
  { id: 3, value: "Satisfactory" },
  { id: 4, value: "Poor" },
  { id: 5, value: "Very Poor" },
];

const evaluationSentiment = [
  { id: 1, value: "Positive" },
  { id: 2, value: "Neutral" },
  { id: 3, value: "Negative" },
];

export default function EvaluationSummary() {
  const history = useHistory();
  return (
    <AppContainer>
      <AppHeader>
        <AppHeading>Evaluation Summary</AppHeading>
      </AppHeader>
      <AppContent>
        <SummaryContainer>
          <h5 className="my-2">Remarks</h5>
          {evaluationSummary.map((summary) => (
            <SummaryCard
              key={summary.id}
              summaryInfo={summary}
              onClick={() =>
                history.push(`/dashboard/evaluations/result/${summary.value}`)
              }
            />
          ))}
        </SummaryContainer>
        <SummaryContainer>
          <h5 className="my-2">Sentiment</h5>
          {evaluationSentiment.map((sentimentInfo) => (
            <SentimentCard
              key={sentimentInfo.id}
              sentimentInfo={sentimentInfo}
              onClick={() =>
                history.push(
                  `/dashboard/evaluations/sentiment/${sentimentInfo.value}`
                )
              }
            />
          ))}
        </SummaryContainer>
      </AppContent>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background: ${(props) => props.theme.colors.secondary};
`;

const AppHeader = styled.div``;

const AppHeading = styled.h4`
  border-bottom: 4px solid white;
  padding-bottom: 0.5rem;
`;

const AppContent = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const SummaryContainer = styled.div``;
