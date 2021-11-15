import React, { useState } from "react";
import styled from "styled-components";
import { FiBell } from "react-icons/fi";
import OutsideClickHandler from "react-outside-click-handler";

import { NotificationItem } from ".";

export default function Notifications({ notifications }) {
  const [isActive, setIsActive] = useState(false);

  const handleNotificationToggle = () => setIsActive(!isActive);
  const handleClickOutside = () => setIsActive(false);

  return (
    <OutsideClickHandler onOutsideClick={handleClickOutside}>
      <NotificationContainer>
        <TogglerContainer onClick={handleNotificationToggle}>
          {notifications && <Badge>{notifications?.length}</Badge>}
          <FiBell className="notification-icon" />
        </TogglerContainer>
        <NotificationContent isActive={isActive}>
          <NotificationHeader>
            <NotificationHeading>Notifications</NotificationHeading>
          </NotificationHeader>
          {notifications?.map((notification) => (
            <NotificationItem
              notification={notification}
              key={notification.id}
            />
          ))}
        </NotificationContent>
      </NotificationContainer>
    </OutsideClickHandler>
  );
}

const NotificationContainer = styled.div`
  position: relative;
`;

const TogglerContainer = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  cursor: pointer;
  background: ${(props) => props.theme.colors.white};
  transition: all 0.3s;

  .notification-icon {
    width: 25px;
    height: 25px;
  }

  :hover {
    background: ${(props) => props.theme.colors.primary};

    .notification-icon {
      color: ${(props) => props.theme.colors.white};
    }
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 0;
  right: -0.2rem;
  width: 15px;
  height: 15px;
  display: grid;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 500;
  place-items: center;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.accent.red};
`;

const NotificationContent = styled.div`
  max-height: 400px;
  width: 400px;
  position: absolute;
  top: calc(100% + 0.5rem);
  right: -1rem;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  overflow: auto;
  padding: 1rem;
  opacity: ${(props) => (props.isActive ? 1 : 0)};
  pointer-events: ${(props) => (props.isActive ? "visible" : "none")};
  transition: all 0.3s;
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 0.5rem;
`;

const NotificationHeading = styled.h1`
  font-size: ${(props) => props.theme.fontSize.heading.sm};
`;
