import React, { useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { FiPrinter, FiX } from "react-icons/fi";
import styled from "styled-components";
import { useReactToPrint } from "react-to-print";

import {
  AppliedPhysicsRanking,
  CASTopFaculty,
  ComputerScienceRanking,
  DepartmentRanking,
  IPRanking,
  MathRanking,
} from ".";
import { Filter, PrintTableData } from "..";

import Logo from "../../image/Logo.png";
import ToPrintHeader from "./ToPrintHeader";

const departments = [
  { value: "All" },
  { id: 1, value: "Computer Science" },
  { id: 2, value: "Applied Physics" },
  { id: 3, value: "Industrial Psychology" },
  { id: 4, value: "Mathematics" },
];

export default function Ranking({ responses, open }) {
  const [sortBy, setSortBy] = useState({ value: "All" });
  const componentToPrintRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentToPrintRef.current,
  });

  const filteredResponses =
    sortBy && sortBy?.id
      ? responses.filter(
          (response) => response?.status?.faculty?.user?.dept === sortBy?.value
        )
      : responses;

  const handleSelect = (item) => setSortBy(item);

  return (
    <Container>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <Filter
          items={departments}
          selectedItem={sortBy}
          onSelectItem={handleSelect}
        />
        <div className="d-flex align-items-center">
          <PrintIconContainer className="me-2" onClick={handlePrint}>
            <FiPrinter className="icon" />
          </PrintIconContainer>
          <IconContainer onClick={() => open(false)}>
            <FiX className="icon" />
          </IconContainer>
        </div>
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
            {filteredResponses?.map((response) => (
              <PrintTableData key={response?._id} response={response} />
            ))}
            {/* to print summary */}
          </tbody>
        </Table>
        <GraphContainer>
          <DepartmentRanking responses={filteredResponses} />
          <CASTopFaculty responses={filteredResponses} />
          <ComputerScienceRanking responses={filteredResponses} />
          <AppliedPhysicsRanking responses={filteredResponses} />
          <IPRanking responses={filteredResponses} />
          <MathRanking responses={filteredResponses} />
        </GraphContainer>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  height: 100vh;
  overflow: auto;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 3px;
  display: grid;
  place-items: center;
  transition: all 120ms;

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
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

const PrintIconContainer = styled(IconContainer)`
  background: ${({ theme }) => theme.colors.accent.blue};
  color: ${({ theme }) => theme.colors.white};

  :hover {
    background: #0c4a6e;
  }
`;

const GraphContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
`;
