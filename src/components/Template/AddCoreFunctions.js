import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

import { AppForm, FormControl } from "../forms";
import { addCoreFunction, getTemplate } from "../../store/template";
import { Alert } from "react-bootstrap";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "This should be atleast 10 characters long.")
    .required("This field is required."),
  percentage: Yup.number().required("This field is required."),
  description: Yup.string().min(
    10,
    "This should be atleast 10 characters long."
  ),
});

export default function AddCoreFunctions({ open }) {
  const { coreFunctionsMeasure } = useSelector(getTemplate);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = (values, { resetForm }) => {
    if (coreFunctionsMeasure === 0) {
      return setErrorMessage("The percentage allocation already reached 0.");
    }
    if (values.percentage > coreFunctionsMeasure) {
      return setErrorMessage(
        `Percentage should not exceed - ${coreFunctionsMeasure}`
      );
    }
    dispatch(
      addCoreFunction({
        id: uuidv4(),
        ...values,
        successIndicators: [],
        rawAverage: [],
        rating: {},
      })
    );
    resetForm();
    return open(false);
  };

  return (
    <Container>
      <Title>Add Core Functions</Title>
      <AppForm
        initialValues={{
          title: "",
          percentage: coreFunctionsMeasure || 0,
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormControl variant="input" name="title" title="Function Title" />
        <FormControl
          variant="input"
          name="percentage"
          title="Percentage Allocation"
        />
        <FormControl
          variant="multiline"
          name="description"
          title="Description(Optional)"
        />
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <FormControl variant="button" title="Insert" className="mt-2" />
      </AppForm>
    </Container>
  );
}

const Container = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h5`
  font-weight: 500;
  margin-bottom: 1rem;
`;
