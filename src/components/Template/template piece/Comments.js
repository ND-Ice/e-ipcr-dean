import React, { useState } from "react";
import styled from "styled-components";
import { FiEdit, FiPlus } from "react-icons/fi";
import { Modal } from "react-bootstrap";

import { AddComments, EditComments } from ".";

export default function Comments({ response }) {
  const [showAddComments, setShowAddComments] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const feedback = response?.feedback?.comments;

  const handleAddComments = () => setShowAddComments(true);
  const handleEdit = () => setShowEdit(true);

  return (
    <>
      <Container>
        <header className="d-flex align-items-center mb-2">
          <h6 className="m-0 me-2">Comments</h6>
          {feedback?.title?.length !== 0 || feedback?.list?.length !== 0 ? (
            <Icon onClick={handleEdit}>
              <FiEdit className="icon" />
            </Icon>
          ) : (
            <Icon onClick={handleAddComments}>
              <FiPlus className="icon" />
            </Icon>
          )}
        </header>
        {feedback?.title?.length !== 0 || feedback?.list?.length !== 0 ? (
          <div>
            <header>
              <Comment>{feedback?.title}</Comment>
            </header>
            <Content>
              {feedback?.list?.map((comment) => (
                <li key={comment?.id}>{comment?.item}</li>
              ))}
            </Content>
          </div>
        ) : (
          ""
        )}
      </Container>
      <Modal show={showAddComments} size="lg">
        <AddComments response={response} open={setShowAddComments} />
      </Modal>
      <Modal show={showEdit} size="lg">
        <EditComments response={response} open={setShowEdit} />
      </Modal>
    </>
  );
}

const Container = styled.div`
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const Comment = styled.p`
  max-width: 130ch;
`;
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
