import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useSelector } from "react-redux";

import { CustomModal } from ".";
import { getEvaluationResponses } from "../store/response";
import { AllResponse, Late } from "./Modals";

export default function ResponseCountSummary({ evaluation }) {
  const [showAllResponse, setShowAllResponse] = useState(false);
  const [showlateResponse, setShowLateResponse] = useState(false);
  const { preview } = evaluation;

  const { list } = useSelector(getEvaluationResponses);
  const late = list?.filter((response) =>
    moment(parseInt(response?.dateSubmitted)).isAfter(preview?.due)
  );

  return (
    <Container>
      <SummaryItems>
        <SummaryItem onClick={() => setShowAllResponse(true)}>
          All Responses
          <Badge bg="#0064f9">{list?.length}</Badge>
        </SummaryItem>
        <SummaryItem onClick={() => setShowLateResponse(true)}>
          Late Responses <Badge bg="#f0c810">{late?.length}</Badge>
        </SummaryItem>
      </SummaryItems>

      <Divider />
      <SummaryItem onClick={() => setShowAllResponse(true)}>
        View All
      </SummaryItem>
      <CustomModal
        fullscreen={true}
        show={showAllResponse}
        heading={`Individual Performance Commitment Review (IPCR) ${
          preview?.targetYear - 1
        }-${preview?.targetYear}`}
        onHide={() => setShowAllResponse(false)}
      >
        <AllResponse />
      </CustomModal>

      {/* lates */}
      <CustomModal
        fullscreen={true}
        show={showlateResponse}
        heading={`Individual Performance Commitment Review (IPCR) ${
          preview?.targetYear - 1
        }-${preview?.targetYear}`}
        onHide={() => setShowLateResponse(false)}
      >
        <Late response={late} />
      </CustomModal>
    </Container>
  );
}

const Container = styled.div``;

const SummaryItems = styled.div`
  margin: 5px 0;
`;

const SummaryItem = styled.div`
  margin: 2px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 1rem;

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const Badge = styled.span`
  display: inline-grid;
  place-items: center;
  width: 20px;
  height: 20px;
  font-size: 10px;
  font-weight: 500;
  margin-left: 5px;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.bg};
  border-radius: 1rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-bottom: 0.5rem;
  background: ${({ theme }) => theme.colors.secondary};
`;
