import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";

import InfoCardItem from "../InfoCardItem";

export default function InformationCard({ infoItem, title }) {
  return (
    <CustomCard>
      <Card.Header>
        <Title>{title}</Title>
      </Card.Header>
      <Card.Body>
        {infoItem?.map((info) => (
          <InfoCardItem title={info?.title} key={info.id} />
        ))}
      </Card.Body>
    </CustomCard>
  );
}

const Title = styled.h4`
  font-size: 1.2rem;
`;

const CustomCard = styled(Card)`
  height: max-content;
`;
