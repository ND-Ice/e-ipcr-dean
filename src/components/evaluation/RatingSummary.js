import React, { useState } from "react";
import styled from "styled-components";
import { Button, FloatingLabel, Form, Modal, Table } from "react-bootstrap";

import { getRemarks, getSentiment } from "../../utils";
import { useSelector } from "react-redux";
import { getUser } from "../../store/user";
import responseApi from "../../api/response";
import { useHistory } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { Alert } from "bootstrap";

export default function RatingSummary({ response }) {
  const history = useHistory();
  const { coreFunctions, supportFunctions, _id } = response;
  const { currentUser } = useSelector(getUser);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  // get the core functions ratings
  const coreFuncRating = coreFunctions?.map((coreFunc) => {
    const ave = coreFunc?.rawAverage?.reduce((acc, curr) => acc + curr, 0);
    return (
      (ave / coreFunc?.successIndicators?.length) * (coreFunc?.percentage / 100)
    );
  });

  // get the support functions rating
  const supportFuncRating = supportFunctions?.map((suppFunc) => {
    const ave = suppFunc?.rawAverage?.reduce((acc, curr) => acc + curr, 0);
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
      await responseApi.rateEvaluation(
        _id,
        currentUser,
        Date.now(),
        recommendations,
        coreFunctions,
        supportFunctions,
        finalRating
      );
      setLoading(false);
      return history.goBack();
    } catch (error) {
      setLoading(false);
      return setErrorMessage(error);
    }
  };

  return (
    <Container>
      <Table bordered hover>
        <tbody>
          <tr>
            <td className="p-3">
              <h5 className="m-0"> Summary of Ratings </h5>
            </td>
            <td className="p-3">
              <h5 className="m-0"> Average</h5>
            </td>
            <td className="p-3">
              <h5 className="m-0"> Percentage</h5>
            </td>
            <td className="p-3">
              <h5 className="m-0"> Score</h5>
            </td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td className="p-3" colSpan={4}>
              <h6 className="m-0"> Core Functions </h6>
            </td>
          </tr>
          {/* core functions */}
          {coreFunctions?.map((coreFunc) => (
            <tr key={coreFunc?.id}>
              <td className="p-3">{coreFunc?.title}</td>
              <td className="p-3">
                {(
                  coreFunc?.rawAverage?.reduce((acc, curr) => acc + curr, 0) /
                  coreFunc?.successIndicators?.length
                ).toFixed(2)}
              </td>
              <td className="p-3">{coreFunc?.percentage}%</td>
              <td className="p-3">
                {(
                  (coreFunc?.rawAverage?.reduce((acc, curr) => acc + curr, 0) /
                    coreFunc?.successIndicators?.length) *
                  (coreFunc?.percentage / 100)
                ).toFixed(2)}
              </td>
            </tr>
          ))}

          <tr>
            <td colSpan={4}></td>
          </tr>

          {/* support functions */}
          <tr>
            <td className="p-3" colSpan={4}>
              <h6 className="m-0">Support Functions </h6>
            </td>
          </tr>

          {supportFunctions?.map((suppFunc) => (
            <tr key={suppFunc?.id}>
              <td className="p-3">{suppFunc?.title}</td>
              <td className="p-3">
                {(
                  suppFunc?.rawAverage?.reduce((acc, curr) => acc + curr, 0) /
                  suppFunc?.successIndicators?.length
                ).toFixed(2)}
              </td>
              <td className="p-3">{suppFunc?.percentage}%</td>
              <td className="p-3">
                {(
                  (suppFunc?.rawAverage?.reduce((acc, curr) => acc + curr, 0) /
                    suppFunc?.successIndicators?.length) *
                  (suppFunc?.percentage / 100)
                ).toFixed(2)}
              </td>
            </tr>
          ))}
          <tr>
            <td className="bg-secondary text-white"></td>
            <td className="bg-secondary text-white">Final Rating</td>
            <td className="bg-secondary text-white">Final Remarks</td>
            <td className="bg-secondary text-white">Final Sentiment</td>
          </tr>
          <tr>
            <td></td>
            <td>{finalRating}</td>
            <td>{getRemarks(finalRating)}</td>
            <td>{getSentiment(finalRating)}</td>
          </tr>
        </tbody>
      </Table>

      <FloatingLabel
        controlId="floatingTextarea2"
        label="Comments and Reccomendations"
        className="mb-3"
      >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
          onChange={(e) => setRecommendations(e.target.value)}
        />
      </FloatingLabel>
      <Button onClick={() => setShow(true)}>Submit</Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Wrapper>
            <div>
              <FiCheckCircle className="icon-check" />
              <span>
                I{" "}
                <strong>
                  {currentUser?.name?.firstName} {currentUser?.name?.lastName}{" "}
                </strong>{" "}
                certify that I discussed the assessment of the performance of
                the employee
              </span>
            </div>
            {errorMessage && (
              <Alert>
                {errorMessage?.response?.data ||
                  "Something went wrong. Please try again later."}
              </Alert>
            )}
          </Wrapper>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" disabled={loading} onClick={handleSubmit}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 0.5rem;

  .icon-check {
    width: 30px;
    height: 30px;
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.accent.emerald};
  }
`;
