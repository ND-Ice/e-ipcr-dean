import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addCoreRemarks, getEvaluationResponses } from "../../store/response";
import { AppForm, FormControl } from "../forms";

export default function AddCoreRemarks({ open }) {
  const dispatch = useDispatch();
  const { targetIndicator } = useSelector(getEvaluationResponses);
  const { responseId, funcId, indicatorId } = targetIndicator;

  const handleSubmit = (values) => {
    dispatch(
      addCoreRemarks({ responseId, funcId, succId: indicatorId, ...values })
    );
    return open(false);
  };
  return (
    <Container>
      <h5 className="mb-4">Add Remarks</h5>
      <AppForm initialValues={{ remarks: "" }} onSubmit={handleSubmit}>
        <FormControl
          variant="multiline"
          name="remarks"
          title="Remarks"
          style={{ minHeight: "100px" }}
        />
        <FormControl variant="button" title="Insert" className="mt-2" />
      </AppForm>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
