import React, { useState } from "react";
import styled from "styled-components";
import SignaturePad from "react-signature-canvas";
import { Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { AppForm, FormControl } from "../forms";
import { getUser } from "../../store/user";
import templateApi from "../../api/template";
import { addTemplate } from "../../store/template";

const facultyPosition = [
  { id: 1, value: "Regular Faculty" },
  { id: 2, value: "Dean" },
  { id: 3, value: "Chair Person" },
];

const validationSchema = Yup.object().shape({
  target: Yup.string().required("This field is required."),
});

export default function ReuseTemplate({ template, open }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(getUser);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const templates = await templateApi.submitTemplate(
        template?.coreFunctionsMeasure,
        template?.supportFunctionsMeasure,
        template?.coreFunctions,
        template?.supportFunctions,
        values.target,
        currentUser
      );
      setErrorMessage(null);
      setLoading(false);
      dispatch(addTemplate(templates.data));
      return open(false);
    } catch (error) {
      setLoading(false);
      return setErrorMessage(error);
    }
  };
  return (
    <Container>
      <h5 className="mb-4 text-uppercase fw-bold">Reuse Template</h5>

      <Content>
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
                "Something went wrong. Please try again later"}
            </Alert>
          )}
          <FormControl
            className="mt-2"
            variant="button"
            title={loading ? "Processing..." : "Reuse"}
            loading={loading}
          />
        </AppForm>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;

const Content = styled.div`
  margin-top: 2rem;
  margin-bottom: 0.5rem;
`;
