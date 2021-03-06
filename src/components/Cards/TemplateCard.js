import React from "react";
import styled from "styled-components";
import moment from "moment";
import { FaRecycle } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

const getRelativeTime = (timeStamp) => moment(parseInt(timeStamp)).format("LL");

export default function TemplateCard({
  template,
  onRecycle,
  onDelete,
  onPreview,
}) {
  return (
    <Container>
      <Title onClick={onPreview}>
        Individual Performance Commitment Review (IPCR) Template{" "}
        <strong>
          ({template?.targetYear}) - ({parseInt(template?.targetYear) + 1})
        </strong>
      </Title>
      <p className="m-0 mt-4">Target - {template?.target}</p>
      <p className="m-0">
        Generated on - {getRelativeTime(template?.dateGenerated)}
      </p>
      <IconContainer>
        <ReuseIcon onClick={onRecycle}>
          <FaRecycle />
        </ReuseIcon>
        <DeleteIcon onClick={onDelete}>
          <FiTrash />
        </DeleteIcon>
      </IconContainer>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  transition: all 0.3s;
  position: relative;

  :hover {
    border-bottom-color: ${({ theme }) => theme.colors.accent.emerald};
  }
`;

const Title = styled.h5`
  max-width: 40ch;
  cursor: pointer;
  transition: all 12ms;

  :hover {
    text-decoration: underline;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
`;

const ReuseIcon = styled.div`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  color: white;
  cursor: pointer;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.accent.blue};
`;

const DeleteIcon = styled(ReuseIcon)`
  background: ${({ theme }) => theme.colors.accent.red};
  margin-left: 0.3rem;
`;
