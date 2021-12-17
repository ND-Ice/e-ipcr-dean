import moment from "moment";
import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import { getConcatenated, getLetterAvatarBg } from "../../utils";

export default function EvaluationCard({ evaluationInfo, onPreview }) {
  const diffInHours = moment().diff(
    moment(parseInt(evaluationInfo.timeStamp)),
    "hours"
  );

  const due = moment(evaluationInfo.due).calendar(null, {
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    lastDay: "[Yesterday]",
    lastWeek: "[Last] dddd",
    sameElse: "DD/MM/YYYY",
  });

  return (
    <StyledCard onClick={onPreview}>
      <Card.Body>
        <Card.Title>{getConcatenated(evaluationInfo.title, 25)}</Card.Title>
        <Badge dept={evaluationInfo.dept}>{evaluationInfo.dept}</Badge>
        <Description>
          <Card.Text className="mt-2">
            {getConcatenated(evaluationInfo.desc, 80)}
          </Card.Text>
        </Description>
        <CardFooter>
          <DueDate isFinished={evaluationInfo.isFinished}>
            {evaluationInfo.isFinished ? "Finished" : `${due}`}
          </DueDate>
          {diffInHours < 5 && <NewBadge>New</NewBadge>}
        </CardFooter>
      </Card.Body>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  transition: all 0.3s;
  cursor: pointer;
  position: relative;

  :hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;

const Badge = styled.span`
  display: inline-grid;
  font-size: ${(props) => props.theme.fontSize.paragraph.sm};
  font-weight: 500;
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  background: ${(props) => getLetterAvatarBg(props.dept)};
  color: ${(props) => props.theme.colors.white};
`;

const Description = styled.div`
  height: 70px;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DueDate = styled.span`
  display: grid;
  place-items: center;
  width: max-content;
  padding: 5px 10px;
  margin-top: 5px;
  font-size: 10px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.white};
  border-radius: 2px;
  background: ${(props) =>
    props.isFinished
      ? props.theme.colors.accent.red
      : props.theme.colors.accent.emerald};
`;

const NewBadge = styled.span`
  padding: 0.3rem 0.5rem;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.accent.red};
  font-size: 10px;
  font-weight: 500;
  position: absolute;
  top: 10px;
  right: 0;
`;
