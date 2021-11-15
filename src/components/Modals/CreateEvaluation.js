import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { AppForm, FormControl } from "../forms";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "This must be atleast 10 characters long.")
    .required("This Field is required."),
  dueDate: Yup.date().required("This field is required"),
  description: Yup.string(),
});

export default function CreateEvaluation() {
  const handleSubmit = (values) => console.log(values);

  return (
    <AppContainer>
      <AppForm
        initialValues={{ title: "", dueDate: "", description: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <ColumnContainer>
          <FormControl
            variant="input"
            title="Evaluation Title"
            name="title"
            className="p-2"
          />
          <FormControl
            variant="date"
            title="Due Date"
            name="dueDate"
            className="p-2"
          />
        </ColumnContainer>

        <FormControl
          variant="multiline"
          title="Description"
          name="description"
          className="p-2"
        />
        <FormControl variant="button" title="Create Stream" className="p-2" />
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
