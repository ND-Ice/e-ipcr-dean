import React from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";

import { getRemarks, getLetterAvatarBg, getRemarksColor } from "../../utils";

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

const labels = ["CAFA", "CAS", "CED", "CEN", "CHM", "CIT", "CPAC"];

function toFixed(num, fixed) {
  fixed = fixed || 0;
  fixed = Math.pow(10, fixed);
  return Math.floor(num * fixed) / fixed;
}

export default function CollegeRanking({ responses }) {
  const { CAFA, CAS, CED, CEN, CHM, CIT, CPAC } = useSummary(responses);

  const CAFAaverage =
    CAFA?.reduce((acc, curr) => acc + parseInt(curr?.ratings?.average), 0) /
    CAFA?.length;

  const CASaverage =
    CAS?.reduce((acc, curr) => acc + parseInt(curr?.ratings?.average), 0) /
    CAS?.length;

  const CEDaverage =
    CED?.reduce((acc, curr) => acc + parseInt(curr?.ratings?.average), 0) /
    CED?.length;

  const CENaverage =
    CEN?.reduce((acc, curr) => acc + parseInt(curr?.ratings?.average), 0) /
    CEN?.length;

  const CHMaverage =
    CHM?.reduce((acc, curr) => acc + parseInt(curr?.ratings?.average), 0) /
    CHM?.length;

  const CITaverage =
    CIT?.reduce((acc, curr) => acc + parseInt(curr?.ratings?.average), 0) /
    CIT?.length;

  const CPACaverage =
    CPAC?.reduce((acc, curr) => acc + parseInt(curr?.ratings?.average), 0) /
    CPAC?.length;

  const rawAverage = [
    { college: "CAFA", average: CAFAaverage },
    { college: "CAS", average: CASaverage },
    { college: "CED", average: CEDaverage },
    { college: "CEN", average: CENaverage },
    { college: "CHM", average: CHMaverage },
    { college: "CIT", average: CITaverage },
    { college: "CPAC", average: CPACaverage },
  ].sort((a, b) => b?.average - a?.average);

  const data = {
    labels,
    datasets: [
      {
        data: [
          toFixed(CAFAaverage, 2),
          toFixed(CASaverage, 2),
          toFixed(CEDaverage, 2),
          toFixed(CENaverage, 2),
          toFixed(CHMaverage, 2),
          toFixed(CITaverage, 2),
          toFixed(CPACaverage, 2),
        ],
        backgroundColor: [
          "#800000",
          "#f0c810",
          "#0236ca",
          "#ff6c00",
          "#9f400c",
          "#cf1210",
          "#9f400c",
          "#882788",
        ],
      },
    ],
  };
  return (
    <Container>
      <h5 className="text-uppercase fw-bold mb-4">College Ranking</h5>
      <Bar data={data} options={options} />
      <div className="mt-4">
        <Rank college={rawAverage[0]?.college}>
          RANK 1:<strong> {rawAverage[0]?.college} </strong> with overall
          average of <strong>{(rawAverage[0]?.average).toFixed(2)}</strong>{" "}
          <Remarks average={rawAverage[0]?.average}>
            {getRemarks(rawAverage[0]?.average)}
          </Remarks>
        </Rank>
        <Rank college={rawAverage[1]?.college}>
          RANK 2: <strong>{rawAverage[1]?.college}</strong> with overall average
          of <strong>{(rawAverage[1]?.average).toFixed(2)}</strong>
          <Remarks average={rawAverage[1]?.average}>
            {getRemarks(rawAverage[1]?.average)}
          </Remarks>
        </Rank>
        <Rank college={rawAverage[2]?.college}>
          RANK 3: <strong>{rawAverage[2]?.college}</strong> with overall average
          of <strong>{(rawAverage[2]?.average).toFixed(2)}</strong>
          <Remarks average={rawAverage[2]?.average}>
            {getRemarks(rawAverage[2]?.average)}
          </Remarks>
        </Rank>
        <Rank college={rawAverage[3]?.college}>
          RANK 4: <strong>{rawAverage[3]?.college}</strong> with overall average
          of <strong>{(rawAverage[3]?.average).toFixed(2)}</strong>
          <Remarks average={rawAverage[3]?.average}>
            {getRemarks(rawAverage[3]?.average)}
          </Remarks>
        </Rank>
        <Rank college={rawAverage[4]?.college}>
          RANK 5: <strong>{rawAverage[4]?.college}</strong> with overall average
          of <strong>{(rawAverage[4]?.average).toFixed(2)}</strong>
          <Remarks average={rawAverage[4]?.average}>
            {getRemarks(rawAverage[4]?.average)}
          </Remarks>
        </Rank>
        <Rank college={rawAverage[5]?.college}>
          RANK 6: <strong>{rawAverage[5]?.college}</strong> with overall average
          of <strong>{(rawAverage[5]?.average).toFixed(2)}</strong>
          <Remarks average={rawAverage[5]?.average}>
            {getRemarks(rawAverage[5]?.average)}
          </Remarks>
        </Rank>
        <Rank college={rawAverage[6]?.college}>
          RANK 7: <strong>{rawAverage[6]?.college}</strong> with overall average
          of <strong>{(rawAverage[6]?.average).toFixed(2)}</strong>
          <Remarks average={rawAverage[6]?.average}>
            {getRemarks(rawAverage[6]?.average)}
          </Remarks>
        </Rank>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  padding: 1rem;
`;

const Rank = styled.div`
  padding: 5px;
  border-radius: 5px;

  strong {
    color: ${({ college }) => getLetterAvatarBg(college)};
  }
`;

const Remarks = styled.strong`
  color: ${({ average }) => getRemarksColor(average)};
  margin-left: 0.5rem;
`;
