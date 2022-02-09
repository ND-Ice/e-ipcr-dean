import React, { useState } from "react";
import { Badge, Button, Table, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { DirectorData } from "./Cards";
import { ApprovedResponses } from "./Modals";
import { getEvaluationResponses } from "../store/response";

export default function TobeApprovedByDirector() {
  const { list } = useSelector(getEvaluationResponses);
  const history = useHistory();
  const [showApproved, setShowApproved] = useState(false);

  const filteredList = list.filter(
    (response) => !response?.status?.director?.isApproved
  );

  const approved = list.filter(
    (response) => response?.status?.director?.isApproved
  );

  const handlePreview = (id) => history.push(`/to-approve-by-director/${id}`);
  const handleViewApproved = () => setShowApproved(true);
  return (
    <>
      <Container>
        <div className="mt-4 mb-4 d-flex align-items-center justify-content-between">
          <h5 className="text-uppercase fw-bold">DIRECTOR</h5>
          <Button onClick={handleViewApproved}>
            Approved
            {approved?.length !== 0 && (
              <Badge variant="pll" bg="danger" className="ms-2">
                {approved?.length}
              </Badge>
            )}
          </Button>
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
              <DirectorData
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
          title="director approved"
          responses={approved}
          open={setShowApproved}
          onPreview={handlePreview}
        />
      </Modal>
    </>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
