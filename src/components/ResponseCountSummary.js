import React from "react";
import styled from "styled-components";
import moment from "moment";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getEvaluationResponses } from "../store/response";

export default function ResponseCountSummary({ evaluation }) {
  const history = useHistory();
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
        <SummaryItem onClick={() => history.push("/dashboard/responses")}>
          All Responses
          <Badge bg="#0064f9">{list?.length}</Badge>
        </SummaryItem>
        <SummaryItem onClick={() => history.push("/dashboard/late-responses")}>
          Late Responses <Badge bg="#f0c810">{late?.length}</Badge>
        </SummaryItem>
        <SummaryItem onClick={() => history.push("/dashboard/to-approved")}>
          To Evaluate<Badge bg="#f97316">{toBeRate?.length}</Badge>
        </SummaryItem>
        <SummaryItem onClick={() => history.push("/dashboard/approved")}>
          Approved<Badge bg="#059669">{approved?.length}</Badge>
        </SummaryItem>
      </SummaryItems>

      <Divider />
      <SummaryItem onClick={() => history.push("/dashboard/responses")}>
        View All
      </SummaryItem>
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
