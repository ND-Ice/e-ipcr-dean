import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { FiPrinter, FiX } from "react-icons/fi";

import { getEvaluationResponses } from "../store/response";
import { Filter, ResponseData } from "../components";
import { getFaculties } from "../store/faculties";
import { getRemarks } from "../utils";
import { Modal, Table } from "react-bootstrap";
import { ToPrint } from "../components/Modals";
import { getUser } from "../store/user";

const remarks = [
  { value: "All" },
  { id: 1, value: "Outstanding" },
  { id: 2, value: "Very Satisfactory" },
  { id: 3, value: "Satisfactory" },
  { id: 4, value: "Unsatisfactory" },
  { id: 5, value: "Poor" },
];

export default function Approved({ history }) {
  const [sortByRemarks, setSortByRemarks] = useState({ value: "All" });
  const [showToPrint, setShowToPrint] = useState(false);
  const { list } = useSelector(getEvaluationResponses);
  const { currentUser } = useSelector(getUser);
  const { list: facultyList } = useSelector(getFaculties);

  const handleSelectRemarks = (item) => setSortByRemarks(item);
  const handlePreview = (id) => history.push(`/response/${id}`);

  const filteredList = list.filter(
    (response) =>
      response?.status?.intermediateSupervisor?.isApproved &&
      response?.status?.faculty?.user?.college === currentUser?.college
  );

  const filteredByRemarks =
    sortByRemarks && sortByRemarks?.id
      ? filteredList.filter(
          (response) =>
            getRemarks(response?.ratings?.average) === sortByRemarks?.value
        )
      : filteredList;

  return (
    <Container>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h5 className="m-0 text-uppercase fw-bold">Approved Responses</h5>
        <IconContainer onClick={() => history.goBack()}>
          <FiX className="icon" />
        </IconContainer>
      </div>
      <FilterContainer>
        <Filter
          items={remarks}
          selectedItem={sortByRemarks}
          onSelectItem={handleSelectRemarks}
        />
        <div className="d-flex align-items-center">
          <span className="ms-4">
            {filteredList?.length} out of {facultyList?.length}
          </span>
        </div>
      </FilterContainer>

      <Table>
        <tbody>
          <tr className="text-uppercase">
            <td>Profile</td>
            <td>Name</td>
            <td>Email Address</td>
            <td>Date Submitted</td>
            <td>Final Average</td>
            <td>Adjectival Rating</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={7}></td>
          </tr>
          {filteredByRemarks?.map((response) => (
            <ResponseData
              key={response?._id}
              response={response}
              onPreview={handlePreview}
            />
          ))}
        </tbody>
      </Table>
      <Modal fullscreen show={showToPrint} onHide={() => setShowToPrint(false)}>
        <ToPrint responses={filteredByRemarks} open={setShowToPrint} />
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  max-height: 600px;
  overflow: auto;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1rem;
  }
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

const Content = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
`;
