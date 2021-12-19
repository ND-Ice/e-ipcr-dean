import React from "react";
import styled from "styled-components";
import { AppForm, FormControl } from "../forms";

export default function UpdateBasicInformation({ user }) {
  const { firstName, middleName, lastName } = user.name;

  const handleSubmit = (values) => console.log(values);
  return (
    <Container>
      <AppForm
        initialValues={{
          firstName: firstName || "",
          middleName: middleName || "",
          lastName: lastName || "",
          gender: user.gender || "",
          position: user.position || "",
          qualification: user.qualification || "",
        }}
        onSubmit={handleSubmit}
      >
        <NameContainer>
          <FormControl
            variant="input"
            name="firstName"
            title="First Name"
            className="p-2"
          />
          <FormControl
            variant="input"
            name="middleName"
            title="Middle Name"
            className="p-2"
          />
          <FormControl
            variant="input"
            name="lastName"
            title="Last Name"
            className="p-2"
          />
        </NameContainer>
        <FormControl
          variant="input"
          name="position"
          title="Position"
          className="p-2"
        />
        <FormControl
          variant="input"
          name="qualification"
          title="Highest Qualification"
          className="p-2"
        />

        <FormControl variant="button" title="Save" />
      </AppForm>
    </Container>
  );
}

const Container = styled.div``;
const NameContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
