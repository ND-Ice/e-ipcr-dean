import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { AppForm, FormControl } from "../forms";
import {
  deleteCoreRating,
  editCoreRating,
  getEvaluationResponses,
} from "../../store/response";
import { Button } from "react-bootstrap";

const quality = [
  { id: "q1", value: 5, label: "Outstanding" },
  { id: "q2", value: 4, label: "Very Satisfactory" },
  { id: "q3", value: 3, label: "Satisfactory" },
  { id: "q4", value: 2, label: "Unsatisfactory" },
  { id: "q5", value: 1, label: "Poor" },
];
const timeliness = [
  { id: "t1", value: 5, label: "Outstanding" },
  { id: "t2", value: 4, label: "Very Satisfactory" },
  { id: "t3", value: 3, label: "Satisfactory" },
  { id: "t4", value: 2, label: "Unsatisfactory" },
  { id: "t5", value: 1, label: "Poor" },
];
const efficiency = [
  { id: "e1", value: 5, label: "Outstanding" },
  { id: "e2", value: 4, label: "Very Satisfactory" },
  { id: "e3", value: 3, label: "Satisfactory" },
  { id: "e4", value: 2, label: "Unsatisfactory" },
  { id: "e5", value: 1, label: "Poor" },
];

export default function EditCoreRating({ id, successIndicator, open }) {
  const { targetIndicator } = useSelector(getEvaluationResponses);
  const dispatch = useDispatch();
  const sentiment = successIndicator?.actualAccomplishments?.sentiment || {};
  const sentimentValue = sentiment[0]?.classifications[0]?.tag_name;

  const handleSubmit = (values) => {
    dispatch(
      editCoreRating({
        currentId: id,
        funcId: targetIndicator?.funcId,
        succId: targetIndicator?.indicatorId,
        ...values,
      })
    );
    return open(false);
  };

  const handleDeleteRating = () => {
    dispatch(
      deleteCoreRating({
        currentId: id,
        funcId: targetIndicator?.funcId,
        succId: targetIndicator?.indicatorId,
      })
    );
    return open(false);
  };

  return (
    <Container>
      <Header>
        <h5 className="text-uppercase fw-bold">Edit Rating</h5>
      </Header>

      <div className="mb-4">
        <h6 className="m-0">{successIndicator?.title}</h6>
        <p>{successIndicator?.description}</p>
      </div>
      <div className="mb-4">
        <h6 className="m-0">
          {successIndicator?.actualAccomplishments?.title}
        </h6>
        <p>{successIndicator?.actualAccomplishments?.description}</p>
      </div>

      <AppForm
        initialValues={{
          quality: "",
          timeliness: "",
          efficiency: "",
        }}
        onSubmit={handleSubmit}
      >
        <GridContainer>
          <FormControl
            variant="conditionalRadio"
            title="Quality"
            name="quality"
            sentiment={sentimentValue}
            menuItems={quality}
          />
          <FormControl
            variant="conditionalRadio"
            title="Timeliness"
            name="timeliness"
            sentiment={sentimentValue}
            menuItems={timeliness}
          />
          <FormControl
            variant="conditionalRadio"
            title="Efficiency"
            name="efficiency"
            sentiment={sentimentValue}
            menuItems={efficiency}
          />
        </GridContainer>
        <div className="mt-2 d-flex align-items-center justify-content-between">
          <FormControl variant="button" title="Rate" className="mt-2" />
          <Button variant="danger" onClick={handleDeleteRating}>
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

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1rem 0;
`;
