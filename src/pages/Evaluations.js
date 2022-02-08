import React, { useEffect, useState } from "react";
import { EvaluationCard } from "../components/Cards";
import styled from "styled-components";
import { MyLoader } from "../components";
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
import { Button, Modal } from "react-bootstrap";

export default function Evaluations({ history }) {
  const [isActive, setIsActive] = useState(false);

  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const evaluations = useSelector(getEvaluations);

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
        <h5 className="m-0 text-uppercase fw-bold">Evaluations</h5>
        <Button onClick={handleCreateEvaluation}>Create</Button>
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
      <Modal centered show={isActive} size="md" onHide={handleCreateEvaluation}>
        <CreateEvaluation open={setIsActive} />
      </Modal>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding: 0.5rem;
`;

const AppHeader = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const AppContent = styled.div`
  display: grid;
  gap: 1rem;
`;
