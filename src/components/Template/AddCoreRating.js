import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as Yup from "yup";
import { addCoreRating, getEvaluationResponses } from "../../store/response";

import { AppForm, FormControl } from "../forms";

const validationSchema = Yup.object().shape({
  quality: Yup.number().required("This Field is required."),
  timeliness: Yup.number().required("This Field is required."),
  efficiency: Yup.number().required("This Field is required."),
});

const ratingScale = [
  { id: 1, value: 5 },
  { id: 2, value: 4 },
  { id: 3, value: 3 },
  { id: 4, value: 2 },
  { id: 5, value: 1 },
];

export default function AddCoreRating({ response, open }) {
  const dispatch = useDispatch();
  const { targetIndicator } = useSelector(getEvaluationResponses);
  const { responseId, funcId, indicatorId: succId } = targetIndicator;

  const cf = response?.coreFunctions.filter((cf) => cf?.id === funcId)[0];
  const succ = cf?.successIndicators?.filter((succ) => succ?.id === succId)[0];

  const handleSubmit = (values) => {
    dispatch(addCoreRating({ responseId, funcId, succId, ...values }));
    return open(false);
  };

  return (
    <Container>
      <Header>
        <h5>Add Rating</h5>
      </Header>

      <div>
        <h6 className="m-0">{succ?.title}</h6>
        <p>{succ?.description}</p>
      </div>

      <div className="mt-4">
        <h6 className="m-0">{succ?.actualAccomplishments?.title}</h6>
        <p>{succ?.actualAccomplishments?.description}</p>
      </div>

      <AppForm
        initialValues={{ quality: "", timeliness: "", efficiency: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <GridContainer>
          <FormControl
            variant="select"
            name="quality"
            title="Quality"
            menuItems={ratingScale}
          />
          <FormControl
            variant="select"
            name="timeliness"
            title="Timeliness"
            menuItems={ratingScale}
          />
          <FormControl
            variant="select"
            name="efficiency"
            title="Efficiency"
            menuItems={ratingScale}
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
