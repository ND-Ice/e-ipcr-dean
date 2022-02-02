import React, { useRef, useState } from "react";
import styled from "styled-components";
import SignaturePad from "react-signature-canvas";
import { Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { AppForm, FormControl } from "../forms";
import { getUser } from "../../store/user";
import templateApi from "../../api/template";
import { addTemplate } from "../../store/template";

const facultyPosition = [
  { id: 1, value: "Regular Faculty" },
  { id: 2, value: "Dean" },
  { id: 3, value: "Chair Person" },
];

const validationSchema = Yup.object().shape({
  target: Yup.string().required("This field is required."),
});

export default function ReuseTemplate({ template, open }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(getUser);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  let sigPadRef = useRef({});

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const templates = await templateApi.submitTemplate(
        template?.coreFunctionsMeasure,
        template?.supportFunctionsMeasure,
        template?.coreFunctions,
        template?.supportFunctions,
        values.target,
        currentUser,
        sigPadRef.current.getTrimmedCanvas().toDataURL()
      );
      setErrorMessage(null);
      setLoading(false);
      dispatch(addTemplate(templates.data));
      return open(false);
    } catch (error) {
      setLoading(false);
      return setErrorMessage(error);
    }
  };
  return (
    <Container>
      <h5 className="mb-4">Reuse Template</h5>

      <Content>
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
                  width: 700,
                  height: 200,
                  className: "sigCanvas",
                  border: "2px solid black",
                }}
              />
            </SigPad>
            <Button
              variant="outline-danger"
              onClick={() => sigPadRef.current.clear()}
            >
              Clear
            </Button>
          </div>
          {errorMessage && (
            <Alert variant="danger">
              {errorMessage?.response?.data ||
                "Something went wrong. Please try again later"}
            </Alert>
          )}
          <FormControl
            variant="button"
            title={loading ? "Processing..." : "Reuse"}
            loading={loading}
          />
        </AppForm>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;

const Content = styled.div`
  margin-top: 2rem;
  margin-bottom: 0.5rem;
`;

const SigPad = styled.div`
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.accent.blue};
`;
