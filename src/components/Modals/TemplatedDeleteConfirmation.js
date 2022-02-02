import React, { useState } from "react";
import styled from "styled-components";
import { Alert, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import templateApi from "../../api/template";
import { deleteTemplate } from "../../store/template";

export default function TemplatedDeleteConfirmation({ template, open }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await templateApi.deleteTemplate(template?._id);
      setLoading(false);
      dispatch(deleteTemplate({ id: template?._id }));
      return open(false);
    } catch (error) {
      setErrorMessage(error);
      return setLoading(false);
    }
  };

  return (
    <Container>
      <h5>Confirmation</h5>
      <p>Are you sure you want to delete this tempate?</p>
      {errorMessage && (
        <Alert variant="danger">
          {errorMessage?.response?.data ||
            "Something went wrong. Please try again later."}
        </Alert>
      )}
      <div className="d-flex align-items-center justify-content-between mt-4">
        <Button disabled={loading} variant="danger" onClick={handleDelete}>
          {loading ? "Deleting..." : "Yes"}
        </Button>
        <Button onClick={() => open(false)}>Cancel</Button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
