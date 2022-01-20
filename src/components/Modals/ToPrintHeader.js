import React from "react";
import styled from "styled-components";

export default function ToPrintHeader() {
  return (
    <>
      <tr className="text-center fw-bold">
        <td colSpan={7}>
          <Title>INDIVIDUAL PERFORMANCE COMMITMENT REVIEW </Title>
        </td>
      </tr>
      <tr className="text-center ">
        <td colSpan={7}></td>
      </tr>
      {/* table header */}
      <tr className="text-center fw-bold">
        <td>
          <h6 className="m-0">Full Name</h6>
        </td>
        <td>
          <h6 className="m-0">Email Address</h6>
        </td>
        <td>
          <h6 className="m-0">Position</h6>
        </td>
        <td>
          <h6 className="m-0">Department</h6>
        </td>
        <td>
          <h6 className="m-0">Date Submitted</h6>
        </td>
        <td>
          <h6 className="m-0">Final Rating</h6>
        </td>
        <td>
          <h6 className="m-0">Final Adjectival Rating</h6>
        </td>
      </tr>
    </>
  );
}

const Title = styled.h5`
  font-weight: 500;
  margin: 0;
`;
