import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { addSupportRating, getEvaluationResponses } from "../../store/response";
import { AppForm, FormControl } from "../forms";

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

export default function AddSupportRating({ id, successIndicator, open }) {
  const { targetIndicator } = useSelector(getEvaluationResponses);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(
      addSupportRating({
        currentId: id,
        funcId: targetIndicator?.funcId,
        succId: targetIndicator?.indicatorId,
        ...values,
      })
    );
    return open(false);
  };

  return (
    <Container>
      <Header>
        <h5 className="text-uppercase fw-bold">Add Rating</h5>
      </Header>

      <div className="mb-4">
        <h6 className="m-0 ">{successIndicator?.title}</h6>
        <p>{successIndicator?.description}</p>
      </div>
      <div className="mb-4">
        <h6 className="m-0">
          {successIndicator?.actualAccomplishments?.title}
        </h6>
        <p>{successIndicator?.actualAccomplishments?.description}</p>
      </div>

      <AppForm
        initialValues={{ quality: "", timeliness: "", efficiency: "" }}
        onSubmit={handleSubmit}
      >
        <GridContainer>
          <FormControl
            variant="radio"
            name="quality"
            title="Quality"
            menuItems={quality}
          />
          <FormControl
            variant="radio"
            name="timeliness"
            title="Timeliness"
            menuItems={timeliness}
          />
          <FormControl
            variant="radio"
            name="efficiency"
            title="Efficiency"
            menuItems={efficiency}
          />
        </GridContainer>
        <FormControl variant="button" title="Rate" className="mt-2" />
      </AppForm>
    </Container>
  );
}

const Container = styled.div`
  padding: 1.5rem;
`;

const GridContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(3, 1fr);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
