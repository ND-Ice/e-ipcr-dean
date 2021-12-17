import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as Yup from "yup";

import authApi from "../api/auth";
import { Links } from "../components";
import { AppForm, FormControl } from "../components/forms";

import {
  changePasswordRequest,
  getUser,
  userRequested,
  userRequesetFailed,
} from "../store/user";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("This must be a valid email address")
    .required("This Field is required"),
});

export default function PasswordRecoveryPage() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      dispatch(userRequested());
      const response = await authApi.forgotPassword(values.email);
      return dispatch(changePasswordRequest(response.data));
    } catch (error) {
      return dispatch(userRequesetFailed(error));
    }
  };
  return (
    <AppContainer>
      <FormContainer>
        <AppForm
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <h1 className="mb-2">Recover your Account with Ease.</h1>
          <p className="mb-4">
            Account recovery only works for those who already have an account
            that forgot their password.
          </p>

          <FormControl
            variant="input"
            title="Email Address"
            name="email"
            className="p-2"
          />
          {user.successMessage && (
            <Alert variant="success">{user.successMessage}</Alert>
          )}
          {user.errorMessage && (
            <Alert variant="danger">
              {user.errorMessage.response.data ||
                "Something went wrong. Please try again later."}
            </Alert>
          )}

          <FormControl
            variant="button"
            title="Start Recovering"
            className="w-100 p-2"
          />
          <LinkContainer>
            <Links to="/" title="Back to Login" />
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
  padding: 1.5rem;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 500px;
  }
`;

const LinkContainer = styled.div`
  display: grid;
  place-items: center;
  padding: 1rem;
`;
