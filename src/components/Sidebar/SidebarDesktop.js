import React from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";

import { SidebarItem } from ".";
import sidebarItems from "../../utils/sidebarItems";
import { getUser } from "../../store/user";

export default function SidebarDesktop() {
  const history = useHistory();
  const location = useLocation();
  const { currentUser } = useSelector(getUser);

  return (
    <SidebarContainer>
      {sidebarItems?.map((sidebarInfo) => {
        if (
          currentUser?.position !== "CHAIRPERSON" &&
          sidebarInfo?.title === "Templates"
        ) {
          return null;
        } else
          return (
            <SidebarItem
              sidebarInfo={sidebarInfo}
              key={sidebarInfo.id}
              icon={sidebarInfo?.icon}
              isActive={location.pathname === sidebarInfo.path}
              onNavigate={() => history.push(sidebarInfo.path)}
            />
          );
      })}
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  background: ${(props) => props.theme.colors.secondary};
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  display: none;
  height: max-content;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    display: block;
  }
`;
