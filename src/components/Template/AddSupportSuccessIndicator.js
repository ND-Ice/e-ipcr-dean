import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { AppForm, FormControl } from "../forms";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { useSelector } from "react-redux";
import {
  addCoreSuccessIndicator,
  addSupportSuccessIndicator,
  getTemplate,
} from "../../store/template";

const validationSchema = Yup.object().shape({
  successIndicator: Yup.string()
    .min(10, "This should be atleast 10 characters long.")
    .required("This field is required."),
  description: Yup.string().min(
    10,
    " This should be atleast 10 characters long."
  ),
});

export default function ({ open }) {
  const dispatch = useDispatch();
  const { currentId } = useSelector(getTemplate);

  const handleSubmit = (values) => {
    dispatch(
      addSupportSuccessIndicator({
        sfId: currentId,
        id: uuidv4(),
        title: values.successIndicator,
        description: values.description,
      })
    );
    return open(false);
  };

  return (
    <Container>
      <Title>Add Success Indicator</Title>
      <AppForm
        initialValues={{ successIndicator: "", description: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="input"
          title="Target Measure (Success Indicator)"
          name="successIndicator"
        />
        <FormControl
          variant="multiline"
          title="Description(Optional)"
          name="description"
          style={{ minHeight: "120px" }}
        />
        {/* div */}
        <FormControl variant="button" title="Add Data" className="mt-2" />
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
