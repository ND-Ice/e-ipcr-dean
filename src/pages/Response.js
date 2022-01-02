import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

import {
  CoreFunctions,
  RatingSummary,
  SupportFunctions,
} from "../components/evaluation";
import { getEvaluationResponses } from "../store/response";

export default function Response({ match }) {
  const id = match.params.id;
  const evaluationResponses = useSelector(getEvaluationResponses);

  const response = evaluationResponses?.list?.filter(
    (response) => response._id === id
  )[0];

  return (
    <AppContainer>
      <CoreFunctions response={response} />
      <SupportFunctions response={response} />
      <RatingSummary response={response} />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding: 0.5rem;
  padding: 2rem;
`;
