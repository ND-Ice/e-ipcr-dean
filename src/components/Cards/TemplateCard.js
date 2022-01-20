import React from "react";
import styled from "styled-components";
import moment from "moment";

const getRelativeTime = (timeStamp) => moment(parseInt(timeStamp)).format("LL");

export default function TemplateCard({ template }) {
  return (
    <Container>
      <h4>Template - ({template?._id})</h4>
      <p className="m-0">Target - {template?.target}</p>
      <p className="m-0">
        Generated on - {getRelativeTime(template?.dateGenerated)}
      </p>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  transition: all 0.3s;
  cursor: pointer;

  :hover {
    border-bottom-color: ${({ theme }) => theme.colors.accent.emerald};
  }
`;
