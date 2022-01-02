import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { AppForm, FormControl } from "../components/forms";
import { department } from "../utils";
import { Links } from "../components";

import deansApi from "../api/deans";
import {
  getUser,
  userRegistered,
  userRequestFailed,
  userRequested,
} from "../store/user";
import { Alert } from "react-bootstrap";

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
  password: Yup.string()
    .min(8, "This should be atleast 8 characters long")
    .required("This field is required."),
  repeatPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export default function RegisterPage() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (values, { resetForm }) => {
    try {
      dispatch(userRequested());
      const dean = await deansApi.registerDean(values);
      dispatch(userRegistered(dean.data));
      setSuccessMessage(dean.data);
      setErrorMessage(null);
      return resetForm();
    } catch (error) {
      dispatch(userRequestFailed(error));
      setSuccessMessage(null);
      return setErrorMessage(error);
    }
  };

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
            password: "",
            repeatPassword: "",
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
              loading={user.loading}
            />
            <FormControl
              variant="input"
              title="Last Name"
              name="lastName"
              className="p-2"
              loading={user.loading}
            />
            <FormControl
              variant="input"
              title="Middle Name (Optional)"
              name="middleName"
              className="p-2"
              loading={user.loading}
            />
            <FormControl
              variant="date"
              title="Birth Date"
              name="birthDate"
              className="p-2"
              menuItems={department}
              loading={user.loading}
            />
          </NameContainer>

          <GridContainer>
            <FormControl
              variant="input"
              title="Email Address"
              name="email"
              className="p-2"
              loading={user.loading}
            />
            <FormControl
              variant="select"
              title="Department"
              name="dept"
              className="p-2"
              menuItems={department}
              loading={user.loading}
            />
            <FormControl
              variant="password"
              title="Password"
              name="password"
              className="p-2"
              loading={user.loading}
            />
            <FormControl
              variant="password"
              title="Repeat Password"
              name="repeatPassword"
              className="p-2"
              loading={user.loading}
            />
          </GridContainer>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && (
            <Alert variant="danger">
              {errorMessage.response.data ||
                "Something went wrong. Please try again later."}
            </Alert>
          )}
          <div className="d-flex align-items-center justify-content-between">
            <FormControl
              variant="button"
              title="Register"
              className="p-2"
              loading={user.loading}
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
    max-width: 600px;
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
