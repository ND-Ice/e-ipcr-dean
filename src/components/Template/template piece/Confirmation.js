import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import styled from "styled-components";
import * as Yup from "yup";

import { getTemplate } from "../../../store/template";
import templateApi from "../../../api/template";
import { AppForm, FormControl } from "../../forms";
import { getUser } from "../../../store/user";

const validationSchema = Yup.object().shape({
  target: Yup.string().required("This field is required."),
});

const facultyPosition = [
  { id: 1, value: "Regular Faculty" },
  { id: 2, value: "Dean" },
  { id: 3, value: "Chair Person" },
  { id: 4, value: "Non Teaching" },
];

export default function Confirmation() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { currentUser } = useSelector(getUser);
  const history = useHistory();

  const {
    coreFunctions,
    supportFunctions,
    coreFunctionsMeasure,
    supportFunctionsMeasure,
  } = useSelector(getTemplate);

  const handleSubmit = async (values) => {
    if (coreFunctions.length === 0 && supportFunctions.length === 0) {
      return setErrorMessage("Core and Support Functions cannot be emptied.");
    } else
      try {
        setLoading(true);
        await templateApi.submitTemplate(
          coreFunctionsMeasure,
          supportFunctionsMeasure,
          coreFunctions,
          supportFunctions,
          values?.target,
          currentUser
        );
        setErrorMessage(null);
        setLoading(false);
        return history.goBack();
      } catch (error) {
        setLoading(false);
        return setErrorMessage(error);
      }
  };
  return (
    <Container>
      <h5>Confimation</h5>
      <AppForm
        initialValues={{ target: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="select"
          name="target"
          title="Target Position"
          menuItems={facultyPosition}
        />

        {errorMessage && (
          <Alert variant="danger">
            {errorMessage?.response?.data ||
              errorMessage ||
              "Something went wrong please try again later"}
          </Alert>
        )}
        <FormControl
          variant="button"
          className="mt-2"
          loading={loading}
          title={loading ? "Generating..." : "Generate"}
        />
      </AppForm>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;

const SigPad = styled.div`
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.accent.blue};
`;
