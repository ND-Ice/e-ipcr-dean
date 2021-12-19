import React from "react";
import styled from "styled-components";

import { AppForm, FormControl } from "../forms";

export default function UpdatePrimaryInfo({ user }) {
  const handleSubmit = (values) => console.log(values);
  return (
    <Container>
      <AppForm
        initialValues={{
          contact: user?.contact || "",
          birthDate: user?.birthDate || "",
          houseNumber: user?.address?.houseNumber || "",
          street: user?.address?.street || "",
          barangay: user?.address?.barangay || "",
          city: user?.address?.city || "",
          province: user?.address?.province || "",
        }}
        onSubmit={handleSubmit}
      >
        <GridContainer>
          <FormControl
            variant="input"
            name="contact"
            title="Contact Number"
            className="p-2"
          />
          <FormControl
            variant="date"
            name="birthDate"
            title="Birth Date"
            className="p-2"
          />
        </GridContainer>
        <AddressContainer>
          <FormControl
            variant="input"
            name="houseNumber"
            title="House Number"
            className="p-2"
          />
          <FormControl
            variant="input"
            name="street"
            title="Street"
            className="p-2"
          />
          <FormControl
            variant="input"
            name="barangay"
            title="Barangay"
            className="p-2"
          />
          <FormControl
            variant="input"
            name="city"
            title="City"
            className="p-2"
          />
          <FormControl
            variant="input"
            name="province"
            title="Province"
            className="p-2"
          />
        </AddressContainer>
        <FormControl variant="button" title="Save" />
      </AppForm>
    </Container>
  );
}

const Container = styled.div``;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

const AddressContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
