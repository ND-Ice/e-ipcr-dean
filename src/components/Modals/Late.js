import React, { useState } from "react";
import styled from "styled-components";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Filter, ResponseData } from "..";
import { getFaculties } from "../../store/faculties";
import { getRemarks, getSentiment } from "../../utils";
import moment from "moment";
import { getEvaluations } from "../../store/evaluations";

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

export default function Late({ response }) {
  const history = useHistory();
  const { list } = useSelector(getFaculties);
  const { preview } = useSelector(getEvaluations);

  const [sortBySentiment, setSortBySentiment] = useState({ value: "All" });
  const [sortByRemarks, setSortByRemarks] = useState({ value: "All" });
  const handleSelectItem = (item) => setSortBySentiment(item);
  const handleSelectRemarks = (item) => setSortByRemarks(item);

  const late = response.filter((response) =>
    moment(response.dateSubmmitted).isAfter(preview.due)
  );

  const filtered =
    sortBySentiment && sortBySentiment.id
      ? late.filter(
          (response) =>
            getSentiment(response.ratings.average) === sortBySentiment.value
        )
      : late;

  const filteredByRemarks =
    sortByRemarks && sortByRemarks.id
      ? filtered.filter(
          (response) =>
            getRemarks(response.ratings.average) === sortByRemarks.value
        )
      : filtered;

  return (
    <Container>
      <Header>
        <p>Late Reponses</p>
        <div>
          <span>
            {response?.length} out of {list?.length}
          </span>
        </div>
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
      <Table>
        <tbody>
          <tr>
            <td>Profile</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email Address</td>
            <td>Date Submitted</td>
            <td>Response Code</td>
            <td>Final Average</td>
            <td>Final Remraks</td>
            <td>Final Sentiment</td>
            <td>Approved by</td>
            <td>Status</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
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
