import React, { useState } from "react";
import { Table, Modal, Button, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { ApprovedResponses, Ranking } from "./Modals";
import { HRData } from "./Cards";
import { getEvaluationResponses } from "../store/response";

export default function ToApproveByHR() {
  const { list } = useSelector(getEvaluationResponses);
  const history = useHistory();
  const [showApproved, setShowApproved] = useState(false);
  const [showRanking, setShowRanking] = useState(false);

  const filteredList = list.filter(
    (response) =>
      response?.status?.HEAD?.isApproved && !response?.status?.HR?.isApproved
  );

  const approved = list.filter((response) => response?.status?.HR?.isApproved);

  const handlePreview = (id) => history.push(`/to-approve-by-HR/${id}`);
  const handleViewApproved = () => setShowApproved(true);
  return (
    <>
      <Container>
        <div className="mt-4 mb-4 d-flex align-items-center justify-content-between">
          <h5 className="text-uppercase fw-bold">HR</h5>
          <div>
            <Button className="me-2" onClick={() => setShowRanking(true)}>
              Ranking
            </Button>
            <Button onClick={handleViewApproved}>
              Approved
              {approved?.length !== 0 && (
                <Badge variant="pll" bg="danger" className="ms-2">
                  {approved?.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        <Table className="w-100 ">
          <tbody>
            <tr className="text-uppercase">
              <td>Profile</td>
              <td>Name</td>
              <td>Email Address</td>
              <td>Date Submitted</td>
              <td>Final Average</td>
              <td>Adjectival Rating</td>
            </tr>
            <tr>
              <td colSpan={7}></td>
            </tr>
            {filteredList?.map((response) => (
              <HRData
                key={response?._id}
                response={response}
                onPreview={handlePreview}
              />
            ))}
          </tbody>
        </Table>
      </Container>
      <Modal
        fullscreen
        show={showApproved}
        onHide={() => setShowApproved(false)}
      >
        <ApprovedResponses
          title="HR approved"
          responses={approved}
          open={setShowApproved}
          onPreview={handlePreview}
        />
      </Modal>

      <Modal fullscreen show={showRanking} onHide={() => setShowRanking(false)}>
        <Ranking responses={approved} open={setShowRanking} />
      </Modal>
    </>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
