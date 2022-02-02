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
  "Computer Science",
  "Applied Physics",
  "Industrial Psychology",
  "Mathematics",
];

export default function FailRankingChart({ responses }) {
  const cs = responses?.filter(
    (response) =>
      response?.ratings?.average < 3 &&
      response?.user?.dept === "Computer Science"
  );

  const ap = responses?.filter(
    (response) =>
      response?.ratings?.average < 3 &&
      response?.user?.dept === "Applied Physics"
  );

  const ip = responses?.filter(
    (response) =>
      response?.ratings?.average < 3 &&
      response?.user?.dept === "Industrial Psychology"
  );

  const math = responses?.filter(
    (response) =>
      response?.ratings?.average < 3 && response?.user?.dept === "Mathematics"
  );

  const data = {
    labels,
    datasets: [
      {
        data: [cs?.length, ap?.length, ip?.length, math?.length],
        backgroundColor: ["#f73632"],
      },
    ],
  };
  return (
    <Container>
      <h5 className="text-uppercase fw-bold mb-4">Fail Ranking</h5>
      <Bar data={data} options={options} />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  padding: 1rem;
`;
