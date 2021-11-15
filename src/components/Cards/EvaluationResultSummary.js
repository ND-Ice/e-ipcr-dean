import React, { useState } from "react";
import styled from "styled-components";

import { Avatar, LetterAvatar } from "..";
import {
  getLetterAvatarBg,
  getSentimentColor,
  getColorMark,
} from "../../utils";

export default function EvaluationResultSummary({ evaluation, onClick }) {
  const [isImageError, setIsImageError] = useState(false);
  console.log(evaluation);
  return (
    <CardContainer onClick={onClick}>
      <CardHeader>
        <div>
          {isImageError || !evaluation.user.image ? (
            <LetterAvatar user={evaluation.user} size={60} />
          ) : (
            <Avatar
              user={evaluation.user}
              size={60}
              onError={() => setIsImageError(true)}
            />
          )}
        </div>
        <InformationContainer>
          <h3 className="m-0">{evaluation.user?.name}</h3>
          <p className="m-0">{evaluation?.user?.email}</p>
          <Badge user={evaluation.dept}>{evaluation?.dept}</Badge>
        </InformationContainer>
      </CardHeader>
      <p className="my-2">{evaluation?.title}</p>
      <RemarksContainer>
        <Remarks remarks={evaluation?.remarks}>{evaluation?.remarks}</Remarks>
        <Sentiment sentiment={evaluation?.sentiment}>
          {evaluation?.sentiment}
        </Sentiment>
      </RemarksContainer>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background: ${(props) => props.theme.colors.secondary};
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

const CardHeader = styled.div`
  display: flex;

  .email-address {
    word-break: break-all;
  }
`;

const InformationContainer = styled.div`
  margin-left: 1rem;
`;

const Badge = styled.span`
  display: inline-grid;
  padding: 0.2rem 0.5rem;
  background-color: ${(props) => getLetterAvatarBg(props.user)};
  color: ${(props) => props.theme.colors.white};
  border-radius: 2rem;
  font-weight: 500;
  font-size: ${(props) => props.theme.fontSize.paragraph.xs};
`;

const RemarksContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;

const Remarks = styled.div`
  border-left: 10px solid ${(props) => getColorMark(props.remarks)};
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background: #ffffff;
  flex: 1;
`;

const Sentiment = styled.div`
  border-left: 10px solid ${(props) => getSentimentColor(props.sentiment)};
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background: #ffffff;
  flex: 1;
  margin-left: 5px;
`;
