import React, { useState } from "react";
import styled from "styled-components";

import { Avatar, LetterAvatar } from "../components";
import InformationCard from "../components/Cards/InformationCard";
import background from "../image/background.jpg";

const user = {
  image:
    "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg",
  name: "Joshua Dela Cruz",
  dept: "CAS",
};

const introInfo = [
  { id: 1, title: "Lives in San Juan Metro Manila, Philippines" },
  { id: 2, title: "Bachelor of Science in Computer Science" },
];

const basicInfo = [
  { id: 1, title: "Joshua Dela Cruz" },
  { id: 2, title: "July 02, 2000" },
  { id: 3, title: "Ligaya, Gabaldon Nueva Ecija" },
  { id: 4, title: "Male" },
  { id: 5, title: "21 yrs. old" },
];

const contactInfo = [
  { id: 1, title: "delacruzjoshua691@gmail.com" },
  { id: 2, title: "09662048118" },
];

// const BasicInfo

export default function FacultyPreview({ match }) {
  const [imageError, setImageError] = useState(false);
  return (
    <AppContainer>
      <AppHeader>
        {!imageError && (
          <Avatar size={150} user={user} onError={() => setImageError(true)} />
        )}
        {imageError && <LetterAvatar size={150} user={user} />}
        <h1 className="text-white mt-2">Joshua Dela Cruz</h1>
      </AppHeader>

      <AppContent>
        <GridContainer>
          <InformationCard infoItem={introInfo} title="Introduction" />
          <InformationCard infoItem={contactInfo} title="Contact Information" />
        </GridContainer>
        <InformationCard infoItem={basicInfo} title="Basic Information" />
      </AppContent>
    </AppContainer>
  );
}

const AppContainer = styled.div``;
const AppHeader = styled.div`
  padding: 2rem;
  background: url(${background});
  background-position: center;
  background-size: cover;
  display: grid;
  place-items: center;
  border-radius: 0.5rem;
`;

const AppContent = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 1rem;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const GridContainer = styled.div`
  display: grid;
  gap: 1rem;
`;
