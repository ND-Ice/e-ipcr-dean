import React from "react";
import { EvaluationCard } from "../components/Cards";
import styled from "styled-components";

const evaluations = [
  {
    id: 1,
    title: "2021-2022 IPCR Evaluation for CAS",
    dept: "CAS",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta porro iste sapiente nisi quaerat. Dolor nostrum quos tempora libero facilis!",
    postDate: "2021/10/30",
    due: "2021/12/20",
  },
  {
    id: 2,
    title: "2021-2022 IPCR Evaluation for CAS",
    dept: "CHM",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta porro iste sapiente nisi quaerat. Dolor nostrum quos tempora libero facilis!",
    postDate: "2021/10/30",
    due: "2021/12/20",
  },
  {
    id: 3,
    title: "2021-2022 IPCR Evaluation for CAS",
    dept: "CAFA",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta porro iste sapiente nisi quaerat. Dolor nostrum quos tempora libero facilis!",
    postDate: "2021/10/30",
    due: "2021/12/20",
  },
  {
    id: 4,
    title: "2021-2022 IPCR Evaluation for CAS",
    dept: "CBA",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta porro iste sapiente nisi quaerat. Dolor nostrum quos tempora libero facilis!",
    postDate: "2021/10/30",
    due: "2021/12/20",
  },
];

export default function OngoingEvaluations({ history }) {
  return (
    <AppContainer>
      <AppHeader>
        <h1>List of Ongoing Evaluations</h1>
      </AppHeader>
      <AppContent>
        {evaluations.map((evaluation) => (
          <EvaluationCard
            evaluationInfo={evaluation}
            key={evaluation.id}
            onPreview={() =>
              history.push(`/dashboard/evaluations/${evaluation.id}`)
            }
          />
        ))}
      </AppContent>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding: 0.5rem;
`;

const AppHeader = styled.div`
  margin-bottom: 1rem;
  border-bottom: 4px solid rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
`;

const AppContent = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
