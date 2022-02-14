import React from "react";
import { FiX } from "react-icons/fi";
import styled from "styled-components";

import { IndividualCollegeRanking, CollegeRanking } from "../Ranking";

export default function Ranking({ responses, open }) {
  return (
    <Container>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h5 className="m-0 text-uppercase fw-bold">RANKING</h5>
        <IconContainer onClick={() => open(false)}>
          <FiX className="icon" />
        </IconContainer>
      </div>
      {/* content */}
      <div>
        <GraphContainer>
          <CollegeRanking responses={responses} />
          <IndividualCollegeRanking responses={responses} textProperty="CAFA" />
          <IndividualCollegeRanking responses={responses} textProperty="CAS" />
          <IndividualCollegeRanking responses={responses} textProperty="CED" />
          <IndividualCollegeRanking responses={responses} textProperty="CEN" />
          <IndividualCollegeRanking responses={responses} textProperty="CHM" />
          <IndividualCollegeRanking responses={responses} textProperty="CIT" />
          <IndividualCollegeRanking responses={responses} textProperty="CPAC" />
        </GraphContainer>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  height: 100vh;
  overflow: auto;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 3px;
  display: grid;
  place-items: center;
  transition: all 120ms;

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const GraphContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
`;
