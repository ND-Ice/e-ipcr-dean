import React from "react";
import styled from "styled-components";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { ResponseData } from "../components";
import { getEvaluationResponses } from "../store/response";
import { getSentiment } from "../utils";

export default function FilteredSentimentResult({ match }) {
  const history = useHistory();
  const sentiment = match.params.result;
  const { list } = useSelector(getEvaluationResponses);

  const filtered = list.filter(
    (response) => getSentiment(response?.ratings?.average) === sentiment
  );
  return (
    <AppContainer>
      <Table bordered>
        <tbody>
          <tr>
            <td>Profile</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email Address</td>
            <td>Date</td>
            <td>Response Code</td>
            <td>Final Average</td>
            <td>Final Remraks</td>
            <td>Final Sentiment</td>
            <td>Approved by</td>
            <td>Status</td>
          </tr>
          {filtered?.map((response) => (
            <ResponseData
              key={response?._id}
              response={response}
              onPreview={(id) => history.push(`/response/${id}`)}
            />
          ))}
        </tbody>
      </Table>
    </AppContainer>
  );
}

const AppContainer = styled.div``;
