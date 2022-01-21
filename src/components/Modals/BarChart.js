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
  "Outstanding",
  "Very Satisfactory",
  "Satisfactory",
  "Unsatisfactory",
  "Poor",
];

export default function BarChart({ responses }) {
  const { outStanding, verySatisfactory, satisfactory, unSatisfactory, poor } =
    useSummary(responses);
  const data = {
    labels,
    datasets: [
      {
        data: [
          outStanding?.length,
          verySatisfactory?.length,
          satisfactory?.length,
          unSatisfactory?.length,
          poor?.length,
        ],
        backgroundColor: [
          "#6dc73f",
          "#a0d44d",
          "#f3c20a",
          "#feb328",
          "#f73632",
        ],
      },
    ],
  };
  return (
    <Container>
      <h5 className="text-uppercase fw-bold mb-4">Bar Chart</h5>
      <Bar data={data} options={options} />
    </Container>
  );
}

const Container = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  padding: 2rem;
`;
