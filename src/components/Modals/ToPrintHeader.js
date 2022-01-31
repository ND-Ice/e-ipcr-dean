import React from "react";
import styled from "styled-components";

export default function ToPrintHeader() {
  return (
    <>
      <tr className="text-center fw-bold">
        <td colSpan={7}>INDIVIDUAL PERFORMANCE COMMITMENT REVIEW</td>
      </tr>
      <tr className="fw-bold text-uppercase">
        <td colSpan={7}>Evaluation Responses</td>
      </tr>
      <tr>
        <td colSpan={7}></td>
      </tr>
      {/* table header */}
      <tr className="fw-bold text-uppercase">
        <td>Full Name</td>
        <td>Email Address</td>
        <td>Position</td>
        <td>Department</td>
        <td>Date Submitted</td>
        <td>Final Rating</td>
        <td>Final Adjectival Rating</td>
      </tr>
    </>
  );
}
