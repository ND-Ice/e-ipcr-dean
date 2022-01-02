import React, { useState } from "react";
import { Alert, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as Yup from "yup";

import {
  getEvaluationResponses,
  rateSupportFunctions,
} from "../../store/response";
import { AppForm, FormControl } from "../forms";

const ratingScale = [
  { id: 1, value: 5 },
  { id: 2, value: 4 },
  { id: 3, value: 3 },
  { id: 4, value: 2 },
  { id: 5, value: 1 },
];

const validationSchema = Yup.object().shape({
  quality: Yup.string().required(),
  timeliness: Yup.string().required(),
  efficiency: Yup.string().required(),
});

export default function RateSupportFunctions({ response, open }) {
  const dispatch = useDispatch();
  const evaluationResponses = useSelector(getEvaluationResponses);
  const { supportFunctions } = response;
  const [successMessage, setSuccessMessage] = useState(null);
  const { responseId, funcId, indicatorId } =
    evaluationResponses.targetIndicator;

  const supportFunc = supportFunctions?.filter(
    (suppFunc) => suppFunc?.id === funcId
  )[0];

  const successIndicator = supportFunc?.successIndicators?.filter(
    (successIndicator) => successIndicator?.id === indicatorId
  )[0];

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      rateSupportFunctions({ ...values, responseId, funcId, indicatorId })
    );
    setSuccessMessage("Successfuly added.");
    resetForm();
    return open(false);
  };

  return (
    <Container>
      <Table bordered>
        <tbody>
          <tr>
            <td className="p-3">Success Indicator (Target Measure)</td>
            <td className="p-3">Actual Accomplishment</td>
          </tr>
          <tr>
            <td className="p-3">
              <Description>{successIndicator?.title} </Description>
            </td>
            <td className="p-3">
              {successIndicator?.actualAccomplishments?.title}
            </td>
          </tr>
        </tbody>
      </Table>
      <AppForm
        initialValues={{ quality: "", timeliness: "", efficiency: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <GridContainer>
          <FormControl
            variant="select"
            menuItems={ratingScale}
            title="Quality"
            name="quality"
          />
          <FormControl
            variant="select"
            menuItems={ratingScale}
            title="Timeliness"
            name="timeliness"
          />
          <FormControl
            variant="select"
            menuItems={ratingScale}
            title="Efficiency"
            name="efficiency"
          />
        </GridContainer>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <FormControl className="mt-2" variant="button" title="Rate" />
      </AppForm>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

const Description = styled.div`
  max-width: 30ch;
`;
