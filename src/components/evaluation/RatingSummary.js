import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form, Modal, Table } from "react-bootstrap";

import { getRemarks, getSentiment } from "../../utils";
import { useSelector } from "react-redux";
import { getUser } from "../../store/user";
import responseApi from "../../api/response";
import { useHistory } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

export default function RatingSummary({ response }) {
  const history = useHistory();
  const { coreFunctions, supportFunctions, _id } = response;
  const { currentUser } = useSelector(getUser);
  const [show, setShow] = useState(false);

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
      await responseApi.rateEvaluation(
        _id,
        currentUser,
        coreFunctions,
        supportFunctions,
        finalRating
      );
      return history.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Table bordered>
        <tbody>
          <tr>
            <td className="p-3">
              <h5 className="m-0"> Summary of Ratings </h5>
            </td>
            <td className="p-3">
              <h5 className="m-0"> Average</h5>
            </td>
            <td className="p-3">
              <h5 className="m-0"> Percent</h5>
            </td>
            <td className="p-3">
              <h5 className="m-0"> Score</h5>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="p-3">
              <h5 className="m-0"> Core Functions </h5>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {/* core functions */}
          {coreFunctions?.map((coreFunc) => (
            <tr key={coreFunc?.id}>
              <td className="p-3">
                <h6 className="m-0">{coreFunc?.title} </h6>
              </td>
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
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          {/* support functions */}
          <tr>
            <td className="p-3">
              <h5 className="m-0">Support Functions </h5>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          {supportFunctions?.map((suppFunc) => (
            <tr key={suppFunc?.id}>
              <td className="p-3">
                <h6 className="m-0">{suppFunc?.title} </h6>
              </td>
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
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td className="bg-primary text-white"></td>
            <td className="bg-primary text-white">Final Rating</td>
            <td className="bg-primary text-white">Final Remarks</td>
            <td className="bg-primary text-white">Final Sentiment</td>
          </tr>
          <tr>
            <td></td>
            <td>{finalRating}</td>
            <td>{getRemarks(finalRating)}</td>
            <td>{getSentiment(finalRating)}</td>
          </tr>
        </tbody>
      </Table>
      <Button onClick={() => setShow(true)}>Submit</Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Wrapper>
            <FiCheckCircle className="icon-check" />
            <span>
              I{" "}
              <strong>
                {currentUser?.name?.firstName} {currentUser?.name?.lastName}{" "}
              </strong>{" "}
              certify that I discussed the assessment of the performance of the
              employee
            </span>
          </Wrapper>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
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
