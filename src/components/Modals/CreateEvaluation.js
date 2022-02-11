import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

import { AppForm, FormControl } from "../forms";
import { getUser } from "../../store/user";
import evaluationsApi from "../../api/evaluations";
import {
  evaluationsAdded,
  evaluationsRequested,
  evaluationsRequestFailed,
  getEvaluations,
} from "../../store/evaluations";

const validationSchema = Yup.object().shape({
  targetYear: Yup.string().required("This field is required."),
  due: Yup.date().required("This field is required."),
});

export default function CreateEvaluation({ open }) {
  const user = useSelector(getUser);
  const evaluations = useSelector(getEvaluations);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (values, { resetForm }) => {
    try {
      dispatch(evaluationsRequested());
      const response = await evaluationsApi.createEvaluation({
        ...values,
        dept: user?.currentUser?.dept,
      });
      setSuccessMessage("Created Successfuly");
      setErrorMessage(null);
      dispatch(evaluationsAdded(response.data));
      resetForm();
      return open(false);
    } catch (error) {
      setSuccessMessage(null);
      setErrorMessage(error);
      return dispatch(evaluationsRequestFailed(error.response));
    }
  };

  return (
    <AppContainer>
      <AppHeader>
        <h5 className="m-0 text-uppercase fw-bold">Create Stream</h5>
      </AppHeader>
      <AppForm
        initialValues={{ targetYear: "", due: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <ColumnContainer>
          <FormControl
            variant="date"
            title="Due Date"
            name="due"
            className="p-2"
            loading={evaluations.loading}
          />
          <FormControl
            variant="input"
            title="Target Year"
            name="targetYear"
            className="p-2"
            loading={evaluations.loading}
          />
        </ColumnContainer>

        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && (
          <Alert variant="danger">
            {errorMessage.response.data ||
              "Something went wrong. Please try again later."}
          </Alert>
        )}
        <FormControl
          variant="button"
          title="Create Stream"
          className="p-2"
          loading={evaluations.loading}
        />
      </AppForm>
    </AppContainer>
  );
}

const AppContainer = styled.section`
  padding: 1rem;
`;

const AppHeader = styled.div`
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const ColumnContainer = styled.div`
  margin-bottom: 1rem;
`;
