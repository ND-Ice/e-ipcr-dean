import React, { useState } from "react";
import { Badge, Button, Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { PMTdata } from "./Cards";
import { getEvaluationResponses } from "../store/response";
import { ApprovedResponses } from "./Modals";

export default function TobeApprovedByDirector() {
  const { list } = useSelector(getEvaluationResponses);
  const history = useHistory();
  const [showApproved, setShowApproved] = useState(false);

  const filteredList = list.filter(
    (response) => !response?.status?.PMT?.isApproved
  );

  const approved = list.filter((response) => response?.status?.PMT?.isApproved);

  const handleViewApproved = () => setShowApproved(true);

  const handlePreview = (id) => history.push(`/to-approve-by-PMT/${id}`);
  return (
    <>
      <Container>
        <div className="mt-4 mb-4 d-flex align-items-center justify-content-between">
          <h5 className="text-uppercase fw-bold">PMT</h5>
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
              <PMTdata
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
          title="pmt approved"
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
