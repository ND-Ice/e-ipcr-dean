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
  "Computer Science",
  "Applied Physics",
  "Industrial Psychology",
  "Mathematics",
];

export default function UnsatisfactoryChart({ responses }) {
  const { unSatisfactory } = useSummary(responses);

  const cs = unSatisfactory?.filter(
    (response) => response?.user?.dept === "Computer Science"
  );

  const ap = unSatisfactory?.filter(
    (response) => response?.user?.dept === "Applied Physics"
  );

  const ip = unSatisfactory?.filter(
    (response) => response?.user?.dept === "Industrial Psychology"
  );

  const math = unSatisfactory?.filter(
    (response) => response?.user?.dept === "Mathematics"
  );

  const data = {
    labels,
    datasets: [
      {
        data: [cs?.length, ap?.length, ip?.length, math?.length],
        backgroundColor: ["#feb328"],
      },
    ],
  };
  return (
    <Container>
      <h5 className="text-uppercase fw-bold mb-4">
        Unsatisfacotry Performance
      </h5>
      <Bar data={data} options={options} />
    </Container>
  );
}

const Container = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  padding: 1rem;
`;
