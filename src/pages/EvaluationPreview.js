import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { EvaluationSummary, ResponseCountSummary } from "../components";
import background from "../image/background.jpg";

import evaluationsApi from "../api/evaluations";
import {
  evaluationsRequested,
  evaluationPreviewed,
  evaluationsRequestFailed,
  getEvaluations,
} from "../store/evaluations";

export default function EvaluationPreview({ match }) {
  const dispatch = useDispatch();
  const id = match.params.id;
  const evaluations = useSelector(getEvaluations);
  const evaluation = evaluations.preview;

  useEffect(() => {
    getEvaluationPreview(id);
  }, []);

  const getEvaluationPreview = async (evaluationId) => {
    try {
      dispatch(evaluationsRequested());
      const evaluation = await evaluationsApi.getEvaluationPreview(
        evaluationId
      );
      return dispatch(evaluationPreviewed(evaluation.data));
    } catch (error) {
      return dispatch(evaluationsRequestFailed(error));
    }
  };

  return (
    <AppContainer>
      <AppHeader bg={background}>
        <AppHeading>{evaluation?.title}</AppHeading>
        <Description>{evaluation?.desc}</Description>
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
  min-height: 200px;
  border-radius: 0.5rem;
  background: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
`;

const AppHeading = styled.h2`
  color: ${(props) => props.theme.colors.white};
  max-width: 40ch;
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.white};

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    max-width: 70ch;
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
