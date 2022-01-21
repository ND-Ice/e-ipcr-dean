import React, { useRef } from "react";
import styled from "styled-components";
import { FiX, FiPrinter } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";
import { Table } from "react-bootstrap";

import Logo from "../../image/Logo.png";
import PrintTableData from "../PrintTableData";
import ToPrintHeader from "./ToPrintHeader";
import ToPrintSummary from "./ToPrintSummary";
import BarChart from "./BarChart";
import { DoughnutChart, LinChart, RadarChart } from ".";

export default function ToPrint({ responses, open }) {
  const componentToPrintRef = useRef();
  const handleClose = () => open(false);
  const handlePrint = useReactToPrint({
    content: () => componentToPrintRef.current,
  });

  return (
    <Container>
      {/* headings */}
      <div className="d-flex align-items-center justify-content-end mb-4">
        <PrintIconContainer className="me-2" onClick={handlePrint}>
          <FiPrinter className="icon" />
        </PrintIconContainer>
        <IconContainer onClick={handleClose}>
          <FiX className="icon" />
        </IconContainer>
      </div>
      {/* content */}
      <Content ref={componentToPrintRef}>
        <Header>
          <LogoImage src={Logo} />
          <div className="text-center">
            <i>Republic of the Philippines</i>
            <h4 className="m-0">
              EULOGIO “AMANG” RODRIGUEZ INSTITUTE OF SCIENCE AND TECHNOLOGY
            </h4>
            <i>Nagtahan, Sampaloc, Manila</i>
          </div>
        </Header>

        {/* contents */}
        <Table bordered>
          <tbody>
            {/* to print header */}
            <ToPrintHeader />
            {/* table data */}
            {responses?.map((response) => (
              <PrintTableData key={response?._id} response={response} />
            ))}
            {/* to print summary */}
            <ToPrintSummary responses={responses} />
          </tbody>
        </Table>
        <ChartContainer>
          <BarChart responses={responses} />
          <DoughnutChart responses={responses} />
          <RadarChart responses={responses} />
          <LinChart responses={responses} />
        </ChartContainer>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  overflow: auto;
`;

const Content = styled.div`
  padding: 2rem;
`;

const LogoImage = styled.img`
  width: 80px;
  height: 80px;
  position: relative;
  left: -2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const IconContainer = styled.div`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.3s;

  :hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  .icon {
    font-size: 1.2rem;
  }
`;

const PrintIconContainer = styled(IconContainer)`
  background: ${({ theme }) => theme.colors.accent.blue};
  color: ${({ theme }) => theme.colors.white};

  :hover {
    background: #0c4a6e;
  }
`;

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;
