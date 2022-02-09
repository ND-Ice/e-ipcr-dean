import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { FiCalendar } from "react-icons/fi";

import {
  Loader,
  ResponseCountSummary,
  ToApproveByHEAD,
  ToApproveByHR,
  ToApproveByPMT,
  TobeApprovedByDirector,
} from "../components";

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
import { getUser } from "../store/user";

export default function EvaluationPreview({ match }) {
  const dispatch = useDispatch();
  const id = match.params.id;
  const { currentUser } = useSelector(getUser);
  const evaluations = useSelector(getEvaluations);
  const evaluation = evaluations.preview;
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      dispatch(evaluationsRequested());
      const response = await responseApi.getEvaluationResponse(evaluationId);
      setLoading(false);
      return dispatch(evaluationResponseReceived(response.data));
    } catch (error) {
      setLoading(false);
      dispatch(evaluationReponseRequestFailed(error));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <AppContainer>
          <header>
            <Title>
              Individual Performance Commitment Review (IPCR){" "}
              <strong>
                {evaluation?.targetYear - 1}-{evaluation?.targetYear}
              </strong>
            </Title>
            <DueDate>
              <FiCalendar className="icon" /> Due{" "}
              {moment(evaluation?.due).endOf("day").fromNow()}
            </DueDate>
          </header>

          <AppContent>
            {currentUser?.position === "INTERMEDIATE SUPERVISOR" && (
              <SummaryWrapper>
                <ResponseCountSummary evaluation={evaluations} />
              </SummaryWrapper>
            )}
            {currentUser?.position === "DIRECTOR" && (
              <TobeApprovedByDirector evaluations={evaluations} />
            )}
            {currentUser?.position === "PMT" && (
              <ToApproveByPMT evaluations={evaluations} />
            )}
            {currentUser?.position === "HEAD" && (
              <ToApproveByHEAD evaluations={evaluations} />
            )}
            {currentUser?.position === "HR" && (
              <ToApproveByHR evaluations={evaluations} />
            )}
          </AppContent>
        </AppContainer>
      )}
    </>
  );
}

const AppContainer = styled.div`
  padding: 0 1rem;
  height: 600px;
  overflow: auto;
`;

const AppContent = styled.div``;

const SummaryWrapper = styled.div`
  margin-top: 2rem;
  width: 300px;
`;

const Title = styled.h5`
  max-width: 40ch;
  text-transform: uppercase;
  font-weight: 700;
`;

const DueDate = styled.div`
  display: flex;
  align-items: center;

  .icon {
    margin-right: 0.5rem;
  }
`;
