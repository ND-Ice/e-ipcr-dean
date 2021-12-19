import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { AppForm, FormControl } from "../components/forms";
import { department } from "../utils";
import { Links } from "../components";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("This must be a valid email address.")
    .required("This Field is required."),
  firstName: Yup.string()
    .min(4, "This should be atleast 4 characters Long")
    .required("This field is required."),
  lastName: Yup.string()
    .min(4, "This should be atleast 4 characters Long")
    .required("This field is required."),
  dept: Yup.string().required("This field is required."),
  birthDate: Yup.date()
    .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
    .required("This field is required."),
});

export default function RegisterPage() {
  const dispatch = useDispatch();
  const handleSubmit = (values) => console.log(values);

  return (
    <AppContainer>
      <FormContainer>
        <AppForm
          initialValues={{
            email: "",
            firstName: "",
            middleName: "",
            lastName: "",
            birthDate: "",
            dept: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <h2>Register</h2>
          <p className="mb-4">kindly fill up the following field to proceed.</p>

          <NameContainer>
            <FormControl
              variant="input"
              title="First Name"
              name="firstName"
              className="p-2"
              // loading={deans.loading}
            />
            <FormControl
              variant="input"
              title="Last Name"
              name="lastName"
              className="p-2"
              // loading={deans.loading}
            />
            <FormControl
              variant="input"
              title="Middle Name (Optional)"
              name="middleName"
              className="p-2"
              // loading={deans.loading}
            />
          </NameContainer>

          <FormControl
            variant="input"
            title="Email Address"
            name="email"
            className="p-2"
            // loading={deans.loading}
          />
          <GridContainer>
            <FormControl
              variant="date"
              title="Birth Date"
              name="birthDate"
              className="p-2"
              menuItems={department}
              // loading={deans.loading}
            />
            <FormControl
              variant="select"
              title="Department"
              name="dept"
              className="p-2"
              menuItems={department}
              // loading={deans.loading}
            />
          </GridContainer>
          <div className="d-flex align-items-center justify-content-between">
            <FormControl
              variant="button"
              title="Register"
              className="p-2"
              // loading={deans.loading}
            />
            <Links to="/" title="Back to Login" />
          </div>
        </AppForm>
      </FormContainer>
    </AppContainer>
  );
}

const AppContainer = styled.section`
  padding: 1rem;
  display: grid;
  place-items: center;
  min-height: 100vh;
`;

const FormContainer = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 500px;
  }
`;

const NameContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

const GridContainer = styled.div`
  display: grid;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
`;
