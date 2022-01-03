import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Table } from "react-bootstrap";
import { Filter, ResponseData } from "..";
import { getFaculties } from "../../store/faculties";
import { getRemarks, getSentiment } from "../../utils";
import { useSelector } from "react-redux";

const sentiment = [
  { value: "All" },
  { id: 1, value: "Positive" },
  { id: 2, value: "Neutral" },
  { id: 3, value: "Negative" },
];

const remarks = [
  { value: "All" },
  { id: 1, value: "Outstanding" },
  { id: 2, value: "Very Satisfactory" },
  { id: 3, value: "Satisfactory" },
  { id: 4, value: "Unsatisfactory" },
  { id: 5, value: "Poor" },
];

export default function Approved({ response }) {
  const history = useHistory();
  const { list } = useSelector(getFaculties);
  const [sortBySentiment, setSortBySentiment] = useState({ value: "All" });
  const [sortByRemarks, setSortByRemarks] = useState({ value: "All" });

  const handleSelectItem = (item) => setSortBySentiment(item);
  const handleSelectRemarks = (item) => setSortByRemarks(item);

  const filtered =
    sortBySentiment && sortBySentiment?.id
      ? response.filter(
          (response) =>
            getSentiment(response?.ratings?.average) === sortBySentiment?.value
        )
      : response;

  const filteredByRemarks =
    sortByRemarks && sortByRemarks?.id
      ? filtered.filter(
          (response) =>
            getRemarks(response?.ratings?.average) === sortByRemarks?.value
        )
      : filtered;

  return (
    <Container>
      <Header>
        <p>Approved</p>
        <span>
          {response?.length} out of {list?.length}
        </span>
      </Header>
      <FilterContainer>
        <Filter
          items={sentiment}
          selectedItem={sortBySentiment}
          onSelectItem={handleSelectItem}
        />
        <Filter
          items={remarks}
          selectedItem={sortByRemarks}
          onSelectItem={handleSelectRemarks}
        />
      </FilterContainer>
      <Table className="w-100">
        <tbody>
          <tr>
            <td>Respondent</td>
            <td>Date Submitted</td>
            <td>Assesed and Approved By</td>
            <td>Approved Date</td>
            <td>Final Average</td>
            <td>Final Remraks</td>
            <td>Final Sentiment</td>
            <td>Status</td>
          </tr>
          <tr>
            <td colSpan={8}></td>
          </tr>
          {filteredByRemarks?.map((response) => (
            <ResponseData
              key={response?._id}
              response={response}
              onPreview={(id) => history.push(`/response/${id}`)}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
