import React from "react";

export default function ToPrintHeader() {
  return (
    <>
      <tr className="text-center fw-bold">
        <td className="p-3" colSpan={7}>
          INDIVIDUAL PERFORMANCE COMMITMENT REVIEW
        </td>
      </tr>
      <tr className="fw-bold text-uppercase">
        <td className="p-3" colSpan={7}>
          Evaluation Responses
        </td>
      </tr>
      <tr>
        <td colSpan={7}></td>
      </tr>
      {/* table header */}
      <tr className="fw-bold text-uppercase">
        <td className="p-3">Full Name</td>
        <td className="p-3">Email Address</td>
        <td className="p-3">Position</td>
        <td className="p-3">Department</td>
        <td className="p-3">Date Submitted</td>
        <td className="p-3">Final Rating</td>
        <td className="p-3">Final Adjectival Rating</td>
      </tr>
    </>
  );
}
