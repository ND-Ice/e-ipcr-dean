import React from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useSummary from "../../hooks/useSummary";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
  },
};

const labels = [
  "Computer Science (CS)",
  "Applied Physics (AP)",
  "Industrial Psychology (IP)",
  "Mathematics",
];

export default function BarChart({ responses }) {
  const { cs, ap, ip, math } = useSummary(responses);

  const csAverage =
    cs?.reduce((acc, curr) => acc + parseInt(curr?.ratings?.average), 0) /
    cs?.length;

  const apAverage =
    ap?.reduce((acc, curr) => acc + parseInt(curr?.ratings?.average), 0) /
    ap?.length;

  const ipAverage =
    ip?.reduce((acc, curr) => acc + parseInt(curr?.ratings?.average), 0) /
    ip?.length;

  const mathAverage =
    math?.reduce((acc, curr) => acc + parseInt(curr?.ratings?.average), 0) /
    math?.length;

  const rawAverage = [
    { dept: "Computer Science", average: csAverage },
    { dept: "Applied Physics", average: apAverage },
    { dept: "Industrial Psychology", average: ipAverage },
    { dept: "Mathematics", average: mathAverage },
  ].sort((a, b) => b?.average - a?.average);

  const data = {
    labels,
    datasets: [
      {
        data: [csAverage, apAverage, ipAverage, mathAverage],
        backgroundColor: ["#6dc73f", "#a0d44d", "#f3c20a", "#feb328"],
      },
    ],
  };
  return (
    <Container>
      <h5 className="text-uppercase fw-bold mb-4">Department Ranking</h5>
      <Bar data={data} options={options} />
      <div className="mt-4">
        <p className="m-0 mb-2">
          RANK 1:<strong> {rawAverage[0]?.dept} </strong> with overall average
          of <strong>{(rawAverage[0]?.average).toFixed(2)}</strong>
        </p>
        <p className="m-0 mb-2">
          RANK 2: <strong>{rawAverage[1]?.dept}</strong> with overall average of{" "}
          <strong>{(rawAverage[1]?.average).toFixed(2)}</strong>
        </p>
        <p className="m-0 mb-2">
          RANK 3: <strong>{rawAverage[2]?.dept}</strong> with overall average of{" "}
          <strong>{(rawAverage[2]?.average).toFixed(2)}</strong>
        </p>
        <p className="m-0 mb-2">
          RANK 4: <strong>{rawAverage[3]?.dept}</strong> with overall average of{" "}
          <strong>{(rawAverage[3]?.average).toFixed(2)}</strong>
        </p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  padding: 1rem;
`;
