import React from "react";
import styled from "styled-components";
import { FiInfo } from "react-icons/fi";

import { getConcatenated, getRelativeTime } from "../../utils";

export default function NotificationItem({ notification }) {
  return (
    <Container>
      <NotificationSenderContainer>
        <FiInfo className="system-icon" />
        <NotificationSender>{notification?.from}</NotificationSender>
      </NotificationSenderContainer>
      <p>{getConcatenated(notification?.message, 40)}</p>
      <p>{getRelativeTime(notification?.time)}</p>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    background: ${(props) => props.theme.colors.secondary};
  }
`;

const NotificationSenderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  .system-icon {
    width: 30px;
    height: 30px;
    margin-right: 0.5rem;
  }
`;

const NotificationSender = styled.span`
  font-size: ${(props) => props.theme.fontSize.paragraph.md};
  font-weight: 500;
`;
