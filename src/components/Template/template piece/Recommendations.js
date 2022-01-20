import React, { useState } from "react";
import styled from "styled-components";
import { FiEdit, FiPlus } from "react-icons/fi";

import { Modal } from "react-bootstrap";
import { AddRecommendations, EditRecommendations } from ".";

export default function Recommendations({ response }) {
  const [showAddRecommendations, setShowAddRecommendations] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const feedback = response?.feedback?.recommendations;

  // modal close
  const handleAdd = () => setShowAddRecommendations(true);
  const handleEdit = () => setShowEdit(true);
  return (
    <>
      <Container>
        <header className="d-flex align-items-center mb-2">
          <h6 className="m-0 me-2">Recommendations</h6>
          {feedback?.title?.length !== 0 || feedback?.list?.length !== 0 ? (
            <Icon onClick={handleEdit}>
              <FiEdit className="icon" />
            </Icon>
          ) : (
            <Icon onClick={handleAdd}>
              <FiPlus className="icon" />
            </Icon>
          )}
        </header>
        {feedback?.title?.length !== 0 || feedback?.list?.length !== 0 ? (
          <div>
            <header>
              <Recommendation>{feedback?.title}</Recommendation>
            </header>
            <Content>
              {feedback?.list?.map((recommendation) => (
                <li key={recommendation?.id}>{recommendation?.item}</li>
              ))}
            </Content>
          </div>
        ) : (
          ""
        )}
      </Container>
      <Modal size="lg" show={showAddRecommendations}>
        <AddRecommendations
          response={response}
          open={setShowAddRecommendations}
        />
      </Modal>
      <Modal size="lg" show={showEdit}>
        <EditRecommendations response={response} open={setShowEdit} />
      </Modal>
    </>
  );
}

const Container = styled.div`
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const Recommendation = styled.p``;
const Content = styled.ul``;

const Icon = styled.div`
  cursor: pointer;

  .icon {
    transition: all 120ms;
    color: ${({ theme }) => theme.colors.accent.blue};

    :hover {
      transform: scale(1.2);
      transform-origin: bottom;
    }
  }
`;
