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

export default function AppliedPhysics({ responses }) {
  const { ap } = useSummary(responses);

  const top5 = [...ap]
    .sort((a, b) => b?.ratings?.average - a?.ratings?.average)
    .slice(0, 5);

  console.log(top5);

  const data = {
    labels: [
      `${top5[0]?.status?.faculty?.user?.name?.firstName} ${top5[0]?.status?.faculty?.user?.name?.lastName}`,
      `${top5[1]?.status?.faculty?.user?.name?.firstName} ${top5[1]?.status?.faculty?.user?.name?.lastName}`,
      `${top5[2]?.status?.faculty?.user?.name?.firstName} ${top5[2]?.status?.faculty?.user?.name?.lastName}`,
      `${top5[3]?.status?.faculty?.user?.name?.firstName} ${top5[3]?.status?.faculty?.user?.name?.lastName}`,
      `${top5[4]?.status?.faculty?.user?.name?.firstName} ${top5[4]?.status?.faculty?.user?.name?.lastName}`,
    ],
    datasets: [
      {
        data: [
          top5[0]?.ratings?.average,
          top5[1]?.ratings?.average,
          top5[2]?.ratings?.average,
          top5[3]?.ratings?.average,
          top5[4]?.ratings?.average,
        ],
        backgroundColor: ["#6dc73f", "#a0d44d", "#f3c20a", "#feb328"],
      },
    ],
  };
  return (
    <Container>
      <h5 className="text-uppercase fw-bold mb-4">Top 5 AP Faculty</h5>
      <Bar data={data} options={options} />
      <div className="mt-4">
        <p className="m-0 mb-2">
          RANK 1:{" "}
          <strong>
            {top5[0]?.status?.faculty?.user?.name?.firstName}{" "}
            {top5[0]?.status?.faculty?.user?.name?.lastName}
          </strong>{" "}
          with overall average of <strong>{top5[0]?.ratings?.average}</strong>
        </p>
        <p className="m-0 mb-2">
          RANK 2:{" "}
          <strong>
            {top5[1]?.status?.faculty?.user?.name?.firstName}{" "}
            {top5[1]?.status?.faculty?.user?.name?.lastName}
          </strong>{" "}
          with overall average of <strong>{top5[1]?.ratings?.average}</strong>
        </p>
        <p className="m-0 mb-2">
          RANK 3:{" "}
          <strong>
            {top5[2]?.status?.faculty?.user?.name?.firstName}{" "}
            {top5[2]?.status?.faculty?.user?.name?.lastName}
          </strong>{" "}
          with overall average of <strong>{top5[2]?.ratings?.average}</strong>
        </p>
        <p className="m-0 mb-2">
          RANK 4:{" "}
          <strong>
            {top5[3]?.status?.faculty?.user?.name?.firstName}{" "}
            {top5[3]?.status?.faculty?.user?.name?.lastName}
          </strong>{" "}
          with overall average of <strong>{top5[3]?.ratings?.average}</strong>
        </p>
        <p className="m-0 mb-2">
          RANK 5:{" "}
          <strong>
            {top5[4]?.status?.faculty?.user?.name?.firstName}{" "}
            {top5[4]?.status?.faculty?.user?.name?.lastName}{" "}
          </strong>{" "}
          with overall average of <strong>{top5[4]?.ratings?.average}</strong>
        </p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  padding: 1rem;
`;
