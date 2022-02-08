import React from "react";
import { Table } from "react-bootstrap";
import { FiX } from "react-icons/fi";
import styled from "styled-components";
import { ApprovedData } from "../Cards";

export default function Approved({ responses, onPreview, title, open }) {
  return (
    <Container>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h5 className="text-uppercase m-0 fw-bold">{title}</h5>
        <IconContainer onClick={() => open(false)}>
          <FiX className="icon" />
        </IconContainer>
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
            <td>department</td>
            <td>college</td>
          </tr>
          <tr>
            <td colSpan={8}></td>
          </tr>
          {responses?.map((response) => (
            <ApprovedData
              key={response?._id}
              response={response}
              onPreview={() => onPreview(response?._id)}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  min-height: 100vh;
  overflow: auto;
  cursor: pointer;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 3px;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 120ms;

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;
