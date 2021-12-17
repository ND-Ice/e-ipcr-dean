import React, { useEffect, useState } from "react";
import { EvaluationCard } from "../components/Cards";
import styled from "styled-components";
import { CustomModal, IconButton, MyLoader } from "../components";
import { FiPlus } from "react-icons/fi";
import { CreateEvaluation } from "../components/Modals";
import { useDispatch, useSelector } from "react-redux";

import evaluationsApi from "../api/evaluations";
import {
  evaluationsRequestFailed,
  evaluationsRequested,
  evaluationsReceived,
  getEvaluations,
} from "../store/evaluations";
import { getUser } from "../store/user";

export default function Evaluations({ history }) {
  const [isActive, setIsActive] = useState(false);

  const user = useSelector(getUser);
  const evaluations = useSelector(getEvaluations);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchEvaluations(user.currentUser.dept);
  }, []);

  const fetchEvaluations = async (department) => {
    try {
      dispatch(evaluationsRequested());
      const response = await evaluationsApi.getEvaluations(department);
      dispatch(evaluationsReceived(response.data));
    } catch (error) {
      return dispatch(evaluationsRequestFailed(error));
    }
  };

  const handleCreateEvaluation = () => setIsActive(!isActive);

  return (
    <AppContainer>
      <AppHeader>
        <h2>List of Evaluations</h2>
        <IconButton
          icon={FiPlus}
          size={40}
          bg="#0064f9"
          iconColor="#ffffff"
          onClick={handleCreateEvaluation}
        />
      </AppHeader>
      {evaluations.loading ? (
        <MyLoader />
      ) : (
        <AppContent>
          {evaluations?.list?.map((evaluation) => (
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
      <CustomModal
        show={isActive}
        onHide={handleCreateEvaluation}
        heading="Create Evaluation Stream"
      >
        <CreateEvaluation />
      </CustomModal>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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
