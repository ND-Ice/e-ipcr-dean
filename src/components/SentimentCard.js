import React from "react";
import styled from "styled-components";
import getSentimentColor from "../utils/getSentimentColor";

export default function SentimentCard({ sentimentInfo, onClick }) {
  return (
    <Info markColor={sentimentInfo.value} onClick={onClick}>
      {sentimentInfo.value} <Badge markColor={sentimentInfo.value}>{20}</Badge>
    </Info>
  );
}

const Info = styled.div`
  display: flex;
  margin: 2px 0;
  align-items: center;
  border-left: 10px solid ${(props) => getSentimentColor(props.markColor)};
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
  background: ${(props) => getSentimentColor(props.markColor)};
`;
