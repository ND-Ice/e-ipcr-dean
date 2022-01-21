import React from "react";
import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import useSummary from "../../hooks/useSummary";

ChartJS.register(ArcElement, Tooltip, Legend);

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
      <h5 className="text-uppercase fw-bold mb-4">Doughnut Chart</h5>
      <Doughnut data={data} />
    </Container>
  );
}

const Container = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  padding: 2rem;
`;
