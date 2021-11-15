import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";

export default function ResponseCountSummary() {
  return (
    <Container>
      <h4>Responses</h4>
      <SummaryItems>
        <SummaryItem>
          All Responses <Badge bg="#0064f9">{20}</Badge>
        </SummaryItem>
        <SummaryItem>
          Missing <Badge bg="#EF4444">{2}</Badge>
        </SummaryItem>
        <SummaryItem>
          Late <Badge bg="#f0c810">{3}</Badge>
        </SummaryItem>
      </SummaryItems>
      <Button className="w-100">View All</Button>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 0.5rem;
  height: max-content;
`;

const SummaryItems = styled.div`
  margin: 0.5rem 0;
  padding: 0.5rem 0;
  border: 4px solid white;
  border-left: 0;
  border-right: 0;
`;

const SummaryItem = styled.div`
  margin: 2px 0;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 1rem;
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
