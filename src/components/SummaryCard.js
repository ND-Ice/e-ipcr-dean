import React from "react";
import styled from "styled-components";
import getColorMark from "../utils/getColorMark";

export default function SummaryCard({ summaryInfo, onClick }) {
  return (
    <Info markColor={summaryInfo.value} onClick={onClick}>
      {summaryInfo.value} <Badge markColor={summaryInfo.value}>{20}</Badge>
    </Info>
  );
}

const Info = styled.div`
  display: flex;
  margin: 2px 0;
  align-items: center;
  border-left: 10px solid ${(props) => getColorMark(props.markColor)};
  padding: 1em;
  font-size: 1.2rem;
  cursor: pointer;
  background: ${(props) => props.theme.colors.white};
  transition: all 0.3s;

  :hover {
    background: ${(props) => props.theme.colors.secondary};
  }
`;

const Badge = styled.div`
  display: inline-grid;
  place-items: center;
  font-weight: 500;
  margin-left: 5px;
  width: 20px;
  height: 20px;
  color: #ffffff;
  border-radius: 50%;
  font-size: 10px;
  background: ${(props) => getColorMark(props.markColor)};
`;
