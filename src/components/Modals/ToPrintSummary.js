import React from "react";
import useSummary from "../../hooks/useSummary";

export default function ToPrintSummary({ responses }) {
  const { outStanding, verySatisfactory, satisfactory, unSatisfactory, poor } =
    useSummary(responses);

  return (
    <>
      <tr>
        <td colSpan={7} className="p-4"></td>
      </tr>
      <tr className="fw-bold text-uppercase">
        <td colSpan={6}>Evaluation Summary</td>
        <td className="text-center">Summary Count</td>
      </tr>
      <tr className="fw-bold text-uppercase">
        <td colSpan={6}>Outstanding</td>
        <td className="text-center">{outStanding?.length}</td>
      </tr>
      <tr className="fw-bold text-uppercase">
        <td colSpan={6}>Very Satisfactory</td>
        <td className="text-center">{verySatisfactory?.length}</td>
      </tr>
      <tr className="fw-bold text-uppercase">
        <td colSpan={6}>Satisfactory</td>
        <td className="text-center">{satisfactory?.length}</td>
      </tr>
      <tr className="fw-bold text-uppercase">
        <td colSpan={6}>Unsatisfactory</td>
        <td className="text-center">{unSatisfactory?.length}</td>
      </tr>
      <tr className="fw-bold text-uppercase">
        <td colSpan={6}>Poor</td>
        <td className="text-center">{poor?.length}</td>
      </tr>
      <tr>
        <td colSpan={7}></td>
      </tr>
      <tr className="fw-bold text-uppercase">
        <td colSpan={6}>Total Count</td>
        <td className="text-center">
          {outStanding?.length +
            verySatisfactory?.length +
            satisfactory?.length +
            unSatisfactory?.length +
            poor?.length}
        </td>
      </tr>
    </>
  );
}
