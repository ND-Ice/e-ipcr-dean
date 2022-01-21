import React from "react";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import useSummary from "../../hooks/useSummary";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
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
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <Container>
      <h5 className="text-uppercase fw-bold mb-4">Radar Chart</h5>
      <Line data={data} options={options} />
    </Container>
  );
}

const Container = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  padding: 2rem;
`;
