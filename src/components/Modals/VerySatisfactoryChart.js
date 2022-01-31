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

export default function OutstandingChart({ responses }) {
  const { verySatisfactory } = useSummary(responses);

  const cs = verySatisfactory?.filter(
    (response) => response?.user?.dept === "Computer Science"
  );

  const ap = verySatisfactory?.filter(
    (response) => response?.user?.dept === "Applied Physics"
  );

  const ip = verySatisfactory?.filter(
    (response) => response?.user?.dept === "Industrial Psychology"
  );

  const math = verySatisfactory?.filter(
    (response) => response?.user?.dept === "Mathematics"
  );

  const data = {
    labels,
    datasets: [
      {
        data: [cs?.length, ap?.length, ip?.length, math?.length],
        backgroundColor: ["#a0d44d"],
      },
    ],
  };
  return (
    <Container>
      <h5 className="text-uppercase fw-bold mb-4">
        Very Satisfactory Performance
      </h5>
      <Bar data={data} options={options} />
    </Container>
  );
}

const Container = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  padding: 1rem;
`;
