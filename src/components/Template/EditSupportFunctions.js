import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import * as Yup from "yup";

import { AppForm, FormControl } from "../forms";
import {
  editCoreFunction,
  editSupportFunctions,
  getTemplate,
} from "../../store/template";
import { useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "This should be atleast 10 characters long.")
    .required("This field is required."),
  description: Yup.string().min(
    10,
    "This should be atleast 10 characters long."
  ),
});

export default function EditSupportFunctions({ open }) {
  const dispatch = useDispatch();
  const { currentId, supportFunctions } = useSelector(getTemplate);
  const [editable, setEditable] = useState(false);

  const supportFunction = supportFunctions.filter(
    (sf) => sf?.id === currentId
  )[0];

  const handleSubmit = (values) => {
    dispatch(editSupportFunctions({ sfId: currentId, ...values }));
    return open(false);
  };

  return (
    <Container>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <Title>Edit Support Function</Title>
        <Form>
          <Form.Check
            type="checkbox"
            label="Allow Editing"
            checked={editable}
            onChange={() => setEditable(!editable)}
          />
        </Form>
      </div>
      <AppForm
        initialValues={{
          title: supportFunction?.title || "",
          description: supportFunction?.description || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="input"
          name="title"
          title="Function Title"
          loading={!editable}
        />
        <FormControl
          variant="multiline"
          name="description"
          title="Description(Optional)"
          loading={!editable}
        />
        <FormControl variant="button" title="Save Changes" className="mt-2" />
      </AppForm>
    </Container>
  );
}

const Container = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h5`
  font-weight: 500;
`;
