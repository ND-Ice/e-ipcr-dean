import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useSelector } from "react-redux";

import { CustomModal } from ".";
import { getEvaluationResponses } from "../store/response";
import { AllResponse, Approved, Late, ToBeRate } from "./Modals";

export default function ResponseCountSummary({ evaluation }) {
  const [showAllResponse, setShowAllResponse] = useState(false);
  const [showlateResponse, setShowLateResponse] = useState(false);
  const [showToBeRate, setShowToBeRate] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const { preview } = evaluation;

  const { list } = useSelector(getEvaluationResponses);
  const late = list?.filter((response) =>
    moment(parseInt(response?.dateSubmitted)).isAfter(preview?.due)
  );

  const toBeRate = list?.filter((response) => !response?.isApproved);
  const approved = list?.filter((response) => response.isApproved);

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
        <SummaryItem onClick={() => setShowToBeRate(true)}>
          Need to Rate<Badge bg="#f97316">{toBeRate?.length}</Badge>
        </SummaryItem>
        <SummaryItem onClick={() => setShowApproved(true)}>
          Approved<Badge bg="#059669">{approved?.length}</Badge>
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
      {/* to be rate */}
      <CustomModal
        fullscreen={true}
        show={showToBeRate}
        heading={`Individual Performance Commitment Review (IPCR) ${
          preview?.targetYear - 1
        }-${preview?.targetYear}`}
        onHide={() => setShowToBeRate(false)}
      >
        <ToBeRate response={toBeRate} />
      </CustomModal>
      <CustomModal
        fullscreen={true}
        show={showApproved}
        heading={`Individual Performance Commitment Review (IPCR) ${
          preview?.targetYear - 1
        }-${preview?.targetYear}`}
        onHide={() => setShowApproved(false)}
      >
        <Approved response={approved} />
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
