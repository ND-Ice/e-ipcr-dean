import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { UserCard } from "../components/Cards";
import SearchBox from "../components/SearchBox";
import { getFaculties } from "../store/faculties";

export default function FacultySearch({ history }) {
  const faculties = useSelector(getFaculties);
  return (
    <AppContainer>
      <SearchBox />
      <AppContent>
        {faculties?.list?.map((faculty) => (
          <UserCard
            user={faculty}
            key={faculty._id}
            onClick={() => history.push(`/dashboard/faculties/${faculty._id}`)}
          />
        ))}
      </AppContent>
    </AppContainer>
  );
}

const AppContainer = styled.div``;

const AppContent = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 0.5rem;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
