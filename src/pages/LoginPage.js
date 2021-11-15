import React from "react";
import styled from "styled-components";
import * as Yup from "yup";

import { Links } from "../components";
import { AppForm, FormControl } from "../components/forms";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("This must be a valid email address.")
    .required("This field is required."),
  password: Yup.string()
    .min(8, "This should be atleast 8 characters long.")
    .required("This field is required."),
});

export default function LoginPage({ history }) {
  const handleSubmit = (values) => {
    history.push("/dashboard");
    return console.log(values);
  };
  return (
    <AppContainer>
      <FormContainer>
        <AppForm
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <h1 className="mb-2">Welcome.</h1>
          <p className="mb-4">
            By logging in we assume that you agree to our{" "}
            <Links to="/" title="Privacy Policy" /> and{" "}
            <Links to="/" title="Terms of Service" />.
          </p>
          <FormControl
            variant="input"
            className="p-2"
            title="Email Address"
            name="email"
          />
          <FormControl
            variant="password"
            className="p-2"
            title="Password"
            name="password"
          />
          <FormControl variant="button" className="w-100 p-2" title="Login" />
          <LinkContainer>
            <Links to="/forgot-password" title="Forgot Password" />
            <Links to="/activate-account" title="Activate Account?" />
          </LinkContainer>
        </AppForm>
      </FormContainer>
    </AppContainer>
  );
}

const AppContainer = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

const FormContainer = styled.div`
  width: 100%;
  padding: 1.5rem;

  @media (min-width: 768px) {
    max-width: 500px;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;
