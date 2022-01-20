import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { AppForm, FormControl } from "../forms";
import { useDispatch, useSelector } from "react-redux";

import {
  editSupportSuccessIndicator,
  deleteSupportSuccessIndicator,
  getTemplate,
} from "../../store/template";
import { Button, Form } from "react-bootstrap";

const validationSchema = Yup.object().shape({
  successIndicator: Yup.string()
    .min(10, "This should be atleast 10 characters long.")
    .required("This field is required."),
  description: Yup.string().min(
    10,
    " This should be atleast 10 characters long."
  ),
});

export default function EditSupportSuccessIndicator({ open }) {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const { supportFunctions, targetIndicator } = useSelector(getTemplate);

  const supportFunction = supportFunctions?.filter(
    (cf) => cf?.id === targetIndicator?.funcId
  )[0];

  const successIndicator = supportFunction?.successIndicators.filter(
    (succ) => succ?.id === targetIndicator?.indicatorId
  )[0];

  const handleDelete = () => {
    dispatch(
      deleteSupportSuccessIndicator({
        sfId: targetIndicator?.funcId,
        succId: targetIndicator?.indicatorId,
      })
    );
    return open(false);
  };

  const handleSubmit = (values) => {
    dispatch(
      editSupportSuccessIndicator({
        sfId: targetIndicator?.funcId,
        indicatorId: targetIndicator?.indicatorId,
        title: values.successIndicator,
        description: values.description,
      })
    );
    return open(false);
  };

  return (
    <Container>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <Title>Edit Success Indicator</Title>
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
          successIndicator: successIndicator?.title || "",
          description: successIndicator?.description || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="input"
          title="Target Measure (Success Indicator)"
          name="successIndicator"
          loading={!editable}
        />
        <FormControl
          variant="multiline"
          title="Description(Optional)"
          name="description"
          style={{ minHeight: "120px" }}
          loading={!editable}
        />
        {/* div */}
        <div className="d-flex align-items-center justify-content-between mt-3">
          <FormControl variant="button" title="Save Changes" />
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
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
