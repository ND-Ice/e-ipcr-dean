import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import moment from "moment";

import { getEvaluationResponses } from "../store/response";
import { Filter, ResponseData } from "../components";
import { getFaculties } from "../store/faculties";
import { getRemarks } from "../utils";
import { Table } from "react-bootstrap";
import { getEvaluations } from "../store/evaluations";

const remarks = [
  { value: "All" },
  { id: 1, value: "Outstanding" },
  { id: 2, value: "Very Satisfactory" },
  { id: 3, value: "Satisfactory" },
  { id: 4, value: "Unsatisfactory" },
  { id: 5, value: "Poor" },
];

export default function LateResponses({ history }) {
  const [sortByRemarks, setSortByRemarks] = useState({ value: "All" });
  const { list } = useSelector(getEvaluationResponses);
  const { list: facultyList } = useSelector(getFaculties);
  const { preview } = useSelector(getEvaluations);

  const late = list.filter((response) =>
    moment(parseInt(response.dateSubmmitted)).isAfter(preview.due)
  );

  const filteredByRemarks =
    sortByRemarks && sortByRemarks?.id
      ? late?.filter(
          (response) =>
            getRemarks(response?.ratings?.average) === sortByRemarks?.value
        )
      : late;

  const handleSelectRemarks = (item) => setSortByRemarks(item);
  const handlePreview = (id) => history.push(`/response/${id}`);

  return (
    <Container>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h5 className="m-0 fw-bold text-uppercase">late responses</h5>
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

        <span className="ms-4">
          {filteredByRemarks?.length} out of {facultyList?.length}
        </span>
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
