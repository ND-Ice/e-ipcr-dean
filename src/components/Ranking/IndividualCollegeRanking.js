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
import { getLetterAvatarBg, getRemarks } from "../../utils";

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

export default function IndividualColleRanking({ responses, textProperty }) {
  const { CAFA, CAS, CED, CEN, CHM, CIT, CPAC } = useSummary(responses);
  let college = [];
  let title = "";
  let color = "";

  if (textProperty === "CAFA") {
    college = CAFA;
    title = "Top CAFA faculty";
    color = "#800000";
  }
  if (textProperty === "CAS") {
    college = CAS;
    title = "Top CAS faculty";
    color = "#f0c810";
  }
  if (textProperty === "CED") {
    college = CED;
    title = "Top CED faculty";
    color = "#0236ca";
  }
  if (textProperty === "CEN") {
    college = CEN;
    title = "Top CEN faculty";
    color = "#ff6c00";
  }
  if (textProperty === "CHM") {
    college = CHM;
    title = "Top CHM faculty";
    color = "#9f400c";
  }
  if (textProperty === "CIT") {
    college = CIT;
    title = "Top CIT faculty";
    color = "#cf1210";
  }
  if (textProperty === "CPAC") {
    college = CPAC;
    title = "Top CPAC faculty";
    color = "#882788";
  }

  const top5 = [...college]
    .sort((a, b) => b?.ratings?.average - a?.ratings?.average)
    .slice(0, 5);

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
        backgroundColor: [color],
      },
    ],
  };
  return (
    <Container>
      <h5 className="text-uppercase fw-bold mb-4">{title}</h5>
      <Bar data={data} options={options} />
      <div className="mt-4">
        <Ranking college={top5[0]?.status?.faculty?.user?.college}>
          RANK 1:{" "}
          <strong>
            {top5[0]?.status?.faculty?.user?.name?.firstName}{" "}
            {top5[0]?.status?.faculty?.user?.name?.lastName}
          </strong>{" "}
          with overall average of{" "}
          <strong>{parseInt(top5[0]?.ratings?.average).toFixed(2)}</strong>
          <Remarks>{getRemarks(top5[0]?.ratings?.average)}</Remarks>
        </Ranking>
        <Ranking college={top5[1]?.status?.faculty?.user?.college}>
          RANK 2:{" "}
          <strong>
            {top5[1]?.status?.faculty?.user?.name?.firstName}{" "}
            {top5[1]?.status?.faculty?.user?.name?.lastName}
          </strong>{" "}
          with overall average of <strong>{top5[1]?.ratings?.average}</strong>
          <Remarks>{getRemarks(top5[1]?.ratings?.average)}</Remarks>
        </Ranking>
        <Ranking college={top5[2]?.status?.faculty?.user?.college}>
          RANK 3:{" "}
          <strong>
            {top5[2]?.status?.faculty?.user?.name?.firstName}{" "}
            {top5[2]?.status?.faculty?.user?.name?.lastName}
          </strong>{" "}
          with overall average of <strong>{top5[2]?.ratings?.average}</strong>
          <Remarks>{getRemarks(top5[2]?.ratings?.average)}</Remarks>
        </Ranking>
        <Ranking college={top5[3]?.status?.faculty?.user?.college}>
          RANK 4:{" "}
          <strong>
            {top5[3]?.status?.faculty?.user?.name?.firstName}{" "}
            {top5[3]?.status?.faculty?.user?.name?.lastName}
          </strong>{" "}
          with overall average of <strong>{top5[3]?.ratings?.average}</strong>
          <Remarks>{getRemarks(top5[3]?.ratings?.average)}</Remarks>
        </Ranking>
        <Ranking college={top5[4]?.status?.faculty?.user?.college}>
          RANK 5:{" "}
          <strong>
            {top5[4]?.status?.faculty?.user?.name?.firstName}{" "}
            {top5[4]?.status?.faculty?.user?.name?.lastName}{" "}
          </strong>{" "}
          with overall average of <strong>{top5[4]?.ratings?.average}</strong>
          <Remarks>{getRemarks(top5[4]?.ratings?.average)}</Remarks>
        </Ranking>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  padding: 1rem;
`;

const Ranking = styled.div`
  padding: 5px;
  border-radius: 5px;

  strong {
    color: ${({ college }) => getLetterAvatarBg(college)};
  }
`;

const Remarks = styled.strong`
  margin-left: 0.5rem;
`;
