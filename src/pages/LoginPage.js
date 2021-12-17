import React, { useEffect, useReducer } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";

import { Links } from "../components";
import { AppForm, FormControl } from "../components/forms";
import {
  currentUserReceived,
  getUser,
  userRequesetFailed,
  userRequested,
} from "../store/user";
import authApi from "../api/auth";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("This must be a valid email address.")
    .required("This field is required."),
  password: Yup.string()
    .min(8, "This should be atleast 8 characters long.")
    .required("This field is required."),
});

export default function LoginPage({ history }) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    if (user.currentUser) return history.push("/dashboard");
  }, [user]);

  const handleSubmit = async (values) => {
    dispatch(userRequested());
    try {
      const response = await authApi.login(values);
      const decodedToken = jwtDecode(response.data);

      const currentUser = await authApi.getCurrentUser(decodedToken._id);
      dispatch(currentUserReceived(currentUser.data));
      return history.push("/dashboard");
    } catch (error) {
      return dispatch(userRequesetFailed(error));
    }
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
            loading={user.loading}
          />
          <FormControl
            variant="password"
            className="p-2"
            title="Password"
            name="password"
            loading={user.loading}
          />
          {user.errorMessage && (
            <Alert variant="danger">
              {user?.errorMessage?.response?.data ||
                "Something went wrong. Please try again later."}
            </Alert>
          )}
          <FormControl
            variant="button"
            className="w-100 p-2"
            title="Login"
            loading={user.loading}
          />
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
