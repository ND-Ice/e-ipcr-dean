import React from "react";
import styled from "styled-components";
import * as Yup from "yup";

import { AppForm, FormControl } from "../forms";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/user";
import evaluationsApi from "../../api/evaluations";
import {
  evaluationsAdded,
  evaluationsRequested,
  evaluationsRequestFailed,
  getEvaluations,
} from "../../store/evaluations";
import { Alert } from "react-bootstrap";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "This must be atleast 10 characters long.")
    .required("This Field is required."),
  due: Yup.date().required("This field is required"),
  desc: Yup.string(),
});

export default function CreateEvaluation() {
  const user = useSelector(getUser);
  const evaluations = useSelector(getEvaluations);
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      dispatch(evaluationsRequested());
      const response = await evaluationsApi.createEvaluation({
        ...values,
        dept: user.currentUser.dept,
      });
      dispatch(evaluationsAdded(response.data));
      return resetForm();
    } catch (error) {
      return dispatch(evaluationsRequestFailed(error.response));
    }
  };

  return (
    <AppContainer>
      <AppForm
        initialValues={{ title: "", due: "", desc: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <ColumnContainer>
          <FormControl
            variant="input"
            title="Evaluation Title"
            name="title"
            className="p-2"
            loading={evaluations.loading}
          />
          <FormControl
            variant="date"
            title="Due Date"
            name="due"
            className="p-2"
            loading={evaluations.loading}
          />
        </ColumnContainer>

        <FormControl
          variant="multiline"
          title="Description"
          name="desc"
          className="p-2"
          loading={evaluations.loading}
        />
        {evaluations.successMessage && (
          <Alert variant="success">{evaluations?.successMessage}</Alert>
        )}
        {evaluations.errorMessage && (
          <Alert variant="danger">
            {evaluations.errorMessage.data ||
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

const AppContainer = styled.section``;

const ColumnContainer = styled.div`
  display: grid;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;
