import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import styled from "styled-components";
import * as Yup from "yup";
import SignaturePad from "react-signature-canvas";

import { getTemplate } from "../../../store/template";
import templateApi from "../../../api/template";
import { AppForm, FormControl } from "../../forms";
import { getUser } from "../../../store/user";

const validationSchema = Yup.object().shape({
  target: Yup.string().required("This field is required."),
});

const facultyPosition = [
  { id: 1, value: "Regular Faculty" },
  { id: 2, value: "Dean" },
  { id: 3, value: "Chair Person" },
];

export default function Confirmation() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { currentUser } = useSelector(getUser);
  const history = useHistory();
  let sigPadRef = useRef({});

  const {
    coreFunctions,
    supportFunctions,
    coreFunctionsMeasure,
    supportFunctionsMeasure,
  } = useSelector(getTemplate);

  const handleSubmit = async (values) => {
    if (coreFunctions.length === 0 && supportFunctions.length === 0) {
      return setErrorMessage("Core and Support Functions cannot be emptied.");
    } else
      try {
        setLoading(true);
        await templateApi.submitTemplate(
          coreFunctionsMeasure,
          supportFunctionsMeasure,
          coreFunctions,
          supportFunctions,
          values.target,
          currentUser,
          sigPadRef.current.getTrimmedCanvas().toDataURL()
        );
        setErrorMessage(null);
        setLoading(false);
        return history.goBack();
      } catch (error) {
        setLoading(false);
        return setErrorMessage(error);
      }
  };
  return (
    <Container>
      <h6>Confimation</h6>
      <AppForm
        initialValues={{ target: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="select"
          name="target"
          title="Target Position"
          menuItems={facultyPosition}
        />
        <div className="my-3">
          <h6>Draw your Signature here:</h6>
          <SigPad>
            <SignaturePad
              penColor="black"
              ref={sigPadRef}
              canvasProps={{
                width: 450,
                height: 200,
                className: "sigCanvas",
                border: "2px solid black",
              }}
            />
          </SigPad>
        </div>

        {errorMessage && (
          <Alert variant="danger">
            {errorMessage?.response?.data ||
              errorMessage ||
              "Something went wrong please try again later"}
          </Alert>
        )}
        <FormControl
          variant="button"
          className="mt-2"
          loading={loading}
          title={loading ? "Generating..." : "Generate"}
        />
      </AppForm>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;

const SigPad = styled.div`
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.accent.blue};
`;
