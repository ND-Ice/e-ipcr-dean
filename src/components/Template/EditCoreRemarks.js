import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import {
  addCoreRemarks,
  deleteCoreRemarks,
  getEvaluationResponses,
} from "../../store/response";
import { AppForm, FormControl } from "../forms";

export default function EditCoreRemarks({ response, open }) {
  const { targetIndicator } = useSelector(getEvaluationResponses);
  const { responseId, funcId, indicatorId } = targetIndicator;
  const { coreFunctions } = response;
  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch();

  const cf = coreFunctions?.filter((cf) => cf?.id === funcId)[0];
  const succ = cf?.successIndicators?.filter(
    (succ) => succ?.id === indicatorId
  )[0];

  const handleSubmit = (values) => {
    dispatch(
      addCoreRemarks({ responseId, funcId, succId: indicatorId, ...values })
    );
    return open(false);
  };

  const handleDelete = () => {
    dispatch(deleteCoreRemarks({ responseId, funcId, succId: indicatorId }));
    return open(false);
  };

  return (
    <Container>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h6 className="m-0">Edit Remarks</h6>
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
        initialValues={{ remarks: succ?.remarks || "" }}
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="multiline"
          name="remarks"
          title="Remarks"
          style={{ minHeight: "100px" }}
          loading={!editable}
        />
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
  padding: 1rem;
`;
