import React, { useEffect } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { EvaluationCard } from "../components/Cards";
import evaluationsApi from "../api/evaluations";
import {
  evaluationsRequestFailed,
  evaluationsRequested,
  ongoingReceived,
  getEvaluations,
} from "../store/evaluations";
import { getUser } from "../store/user";
import { MyLoader } from "../components";

export default function OngoingEvaluations({ history }) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const evaluations = useSelector(getEvaluations);

  useEffect(() => {
    fetchOngoingEvaluations(user.currentUser.dept);
  }, []);

  const fetchOngoingEvaluations = async (dept) => {
    try {
      dispatch(evaluationsRequested());
      const response = await evaluationsApi.getOngoinEvaluations(dept);
      return dispatch(ongoingReceived(response.data));
    } catch (error) {
      return dispatch(evaluationsRequestFailed(error));
    }
  };
  return (
    <AppContainer>
      <AppHeader>
        <h2>List of Ongoing Evaluations</h2>
      </AppHeader>
      {evaluations.loading ? (
        <MyLoader />
      ) : (
        <AppContent>
          {evaluations?.ongoing?.map((evaluation) => (
            <EvaluationCard
              evaluationInfo={evaluation}
              key={evaluation._id}
              onPreview={() =>
                history.push(`/dashboard/evaluations/${evaluation._id}`)
              }
            />
          ))}
        </AppContent>
      )}
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding: 0.5rem;
`;

const AppHeader = styled.div`
  margin-bottom: 1rem;
  border-bottom: 4px solid rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
`;

const AppContent = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
