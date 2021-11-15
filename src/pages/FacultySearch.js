import React from "react";
import styled from "styled-components";
import { UserCard } from "../components/Cards";
import SearchBox from "../components/SearchBox";

const faculties = [
  {
    id: 1,
    name: "Joshua Dela Cruz",
    email: "delacruz.joshua.bscs@gmail.com",
    image:
      "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    dept: "CAS",
  },
  {
    id: 2,
    name: "Hazel Annuncio",
    email: "annuncio.hazel.cas@gmail.com",
    dept: "CEN",
  },
  {
    id: 3,
    name: "Arlene Evangelista",
    email: "evangelista.arlene.cen@gmail.com",
    dept: "CAFA",
  },
  {
    id: 4,
    name: "Jesus Mangubat",
    email: "mangubat.jesus.cas@gmail.com",
    dept: "CBA",
  },
  {
    id: 5,
    name: "Raymond Bolalin",
    email: "bolalin.raymond.cas@gmail.com",
    dept: "CHM",
  },
  {
    id: 6,
    name: "Jefferson Costales",
    email: "costales.jefferson.cas@gmail.com",
    dept: "CIT",
  },
];
export default function FacultySearch({ history }) {
  return (
    <AppContainer>
      <SearchBox />
      <AppContent>
        {faculties?.map((faculty) => (
          <UserCard
            user={faculty}
            key={faculty.id}
            onClick={() => history.push(`/dashboard/faculties/${faculty.id}`)}
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
