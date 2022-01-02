import React, { useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { FiCalendar } from "react-icons/fi";

import { ResponseCountSummary } from "../components";

import evaluationsApi from "../api/evaluations";
import responseApi from "../api/response";

import {
  evaluationsRequested,
  evaluationPreviewed,
  evaluationsRequestFailed,
  getEvaluations,
} from "../store/evaluations";
import {
  evaluationReponseRequestFailed,
  evaluationResponseReceived,
} from "../store/response";

export default function EvaluationPreview({ match }) {
  const dispatch = useDispatch();
  const id = match.params.id;
  const evaluations = useSelector(getEvaluations);
  const evaluation = evaluations.preview;

  useEffect(() => {
    getEvaluationPreview(id);
    getEvaluationResponse(id);
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

  const getEvaluationResponse = async (evaluationId) => {
    try {
      dispatch(evaluationsRequested());
      const response = await responseApi.getEvaluationResponse(evaluationId);
      return dispatch(evaluationResponseReceived(response.data));
    } catch (error) {
      dispatch(evaluationReponseRequestFailed(error));
    }
  };

  return (
    <AppContainer>
      <header>
        <Title>
          Individual Performance Commitment Review (IPCR){" "}
          <strong>
            {evaluation?.targetYear - 1}-{evaluation?.targetYear}
          </strong>
        </Title>
        <DueDate>
          <FiCalendar className="icon" /> {moment(evaluation?.due).format("LL")}
        </DueDate>
      </header>

      <AppContent>
        <ResponseCountSummary evaluation={evaluations} />
      </AppContent>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding: 0.5rem;
`;

const AppContent = styled.div`
  display: grid;
  margin-top: 1rem;
  gap: 0.5rem;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 3fr;
  }
`;

const Title = styled.h4`
  max-width: 40ch;
`;

const DueDate = styled.div`
  display: flex;
  align-items: center;

  .icon {
    margin-right: 0.5rem;
  }
`;
