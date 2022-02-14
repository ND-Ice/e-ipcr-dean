import React, { useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { FiPrinter, FiX } from "react-icons/fi";
import styled from "styled-components";
import { useReactToPrint } from "react-to-print";
import listItem from "../../utils/filter";

import { Filter, PrintTableData } from "..";
import Logo from "../../image/Logo.png";
import ToPrintHeader from "./ToPrintHeader";

export default function RankingSummary({ responses, open }) {
  const componentRef = useRef();
  const [sortBy, setSortBy] = useState({ value: "All" });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleItemSelect = (item) => setSortBy(item);

  const filteredResponses =
    sortBy && sortBy?.id
      ? responses.filter(
          (response) =>
            response?.status?.faculty?.user?.college === sortBy?.value
        )
      : responses;

  return (
    <Container className="p-4">
      <div className="d-flex align-items-center justify-content-between">
        <Filter
          items={listItem}
          selectedItem={sortBy}
          onSelectItem={handleItemSelect}
        />

        <div className="d-flex align-items-center">
          <PrinterIcon onClick={handlePrint}>
            <FiPrinter />
          </PrinterIcon>
          <CloseIcon onClick={() => open(false)}>
            <FiX />
          </CloseIcon>
        </div>
      </div>
      <div ref={componentRef} className="p-4">
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
            <ToPrintHeader />
            {filteredResponses?.map((response) => (
              <PrintTableData key={response?._id} response={response} />
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  height: 100vh;
  overflow: auto;
`;

const LogoImage = styled.img`
  width: 100px;
  height: 100px;
  position: relative;
  left: -2rem;
`;

const Header = styled.div`
  display: flex;
  margin: 2rem 0;
  justify-content: center;
  align-items: center;
`;

const CloseIcon = styled.div`
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  width: 40px;
  height: 40px;
  border-radius: 3px;
  transition: all 120ms;

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const PrinterIcon = styled(CloseIcon)`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.accent.blue};
  margin-right: 0.5rem;

  :hover {
    background: ${({ theme }) => theme.colors.accent.emerald};
  }
`;
