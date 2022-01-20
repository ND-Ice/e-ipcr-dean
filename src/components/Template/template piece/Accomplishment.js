import React, { useState, useEffect } from "react";
import styled from "styled-components";

import templateApi from "../../../api/template";
import { getSentimentColor } from "../../../utils";

export default function Accomplishment({ title, description }) {
  const [sentiment, setSentiment] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const accomplishment = `${title} ${description}`;
  const finalSentiment = sentiment[0]?.classifications[0];

  useEffect(() => {
    // analyzeSentiment();
  }, []);

  const analyzeSentiment = async () => {
    try {
      const response = await templateApi.analyzeSentiment(accomplishment);
      return setSentiment(response.data);
    } catch (error) {
      return setErrorMessage(error);
    }
  };
  return (
    <Container>
      <div>
        <Title>{title}</Title>
        <p className="m-0">{description}</p>
      </div>
      {finalSentiment && (
        <SentimentContainer>
          <Sentiment sentiment={finalSentiment?.tag_name}>
            {finalSentiment?.tag_name} :{" "}
            {Math.round(finalSentiment?.confidence * 100)}%
          </Sentiment>
        </SentimentContainer>
      )}
    </Container>
  );
}

const Container = styled.td`
  background-color: red;
  display: grid;
  grid-template-columns: 1fr 70px;
  position: relative;
`;

const Title = styled.h6`
  margin: 0;
  max-width: 35ch;
`;

const SentimentContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-bottom: 0.5rem;
`;

const Sentiment = styled.div`
  padding: 5px 10px;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ sentiment }) => getSentimentColor(sentiment)};
`;
