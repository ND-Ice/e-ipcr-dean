import React from "react";

export default function CoreHeader() {
  return (
    <>
      <tr className="text-center fw-bold text-uppercase">
        <td>Statement of Functions</td>
        <td>Success Indicators (Target Measure)</td>
        <td>Actual Accomplishments</td>
        <td colSpan={5}>Ratings</td>
      </tr>
      <tr className="bg-warning text-white fw-bold text-uppercase">
        <td colSpan={3}>Core Functions - 90%</td>
        <td className="text-center">Quality</td>
        <td className="text-center">Timeliness</td>
        <td className="text-center">Efficiency</td>
        <td className="text-center">Average</td>
        <td className="text-center">Remarks</td>
      </tr>
    </>
  );
}
