import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FiCheckCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Alert, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SignaturePad from "react-signature-canvas";
import logsApi from "../../api/logs";

import { getUser } from "../../store/user";
import responseApi from "../../api/response";

export default function ConfirmSubmission({ response, open }) {
  const history = useHistory();
  const { currentUser } = useSelector(getUser);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { status } = response;
  const { faculty } = status;
  let sigPadRef = useRef({});

  const coreFuncRating = response?.coreFunctions?.map((coreFunc) => {
    const ave = coreFunc?.rawAverage?.reduce(
      (acc, curr) => acc + curr?.average,
      0
    );
    return (
      (ave / coreFunc?.successIndicators?.length) * (coreFunc?.percentage / 100)
    );
  });

  // get the support functions rating
  const supportFuncRating = response?.supportFunctions?.map((suppFunc) => {
    const ave = suppFunc?.rawAverage?.reduce(
      (acc, curr) => acc + curr?.average,
      0
    );
    return (
      (ave / suppFunc?.successIndicators?.length) * (suppFunc?.percentage / 100)
    );
  });

  const finalRating = [...supportFuncRating, ...coreFuncRating]
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await responseApi.evaluateResponse(
        response?._id,
        response?.coreFunctions,
        response?.supportFunctions,
        response?.attachments,
        response?.feedback,
        faculty?.user,
        faculty?.signature,
        currentUser,
        sigPadRef.current.getTrimmedCanvas().toDataURL(),
        finalRating
      );

      await logsApi.addEvaluationLogs(
        response?.evaluationId,
        currentUser,
        "approved the evaluation of",
        faculty?.user
      );
      setLoading(false);
      open(false);
      return history.push(`/dashboard/evaluations/${response?.evaluationId}`);
    } catch (error) {
      setLoading(false);
      return setErrorMessage(error);
    }
  };

  return (
    <Container>
      <h6 className="mb-4">Confirmation</h6>
      <div className="mb-4">
        <FiCheckCircle className="icon" />
        <span>
          I{" "}
          <strong>
            {currentUser?.name?.firstName} {currentUser?.name?.lastName}
          </strong>{" "}
          I certify that I discussed the assessment of the performance of the
          employee
        </span>
      </div>
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
            "Something went wrong. Please try again later."}
        </Alert>
      )}
      <Button
        disabled={loading}
        variant="outline-primary"
        onClick={handleSubmit}
      >
        {loading ? "Processing..." : "Approve"}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;

  .icon {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.accent.emerald};
  }
`;

const SigPad = styled.div`
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.accent.blue};
`;
