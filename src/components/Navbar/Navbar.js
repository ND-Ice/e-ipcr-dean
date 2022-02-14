import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router";
import { FiMenu } from "react-icons/fi";

import { AvatarMenu, IconButton } from "..";
import { Sidebar, SidebarItem } from "../Sidebar";
import sidebarItems from "../../utils/sidebarItems";
import Logo from "../../image/Logo.png";

export default function Navbar({ user }) {
  const [isSidebarToggle, setIsSidebarToggle] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const handleSidebarToggle = () => setIsSidebarToggle(!isSidebarToggle);

  return (
    <NavContainer>
      <div className="d-flex align-items-center">
        <LogoImage src={Logo} alt="logo" /> E-IPCR
      </div>
      <StatusContainer>
        <AvatarMenu user={user?.currentUser} />
        <IconButton
          className="menu-icon"
          size={40}
          icon={FiMenu}
          iconColor="black"
          onClick={handleSidebarToggle}
        />
      </StatusContainer>

      <Sidebar isToggle={isSidebarToggle} onSidebarToggle={handleSidebarToggle}>
        {sidebarItems?.map((sidebarInfo) => {
          if (
            user?.currentUser?.position !== "INTERMEDIATE SUPERVISOR" &&
            sidebarInfo?.title === "Templates"
          ) {
            return null;
          } else {
            return (
              <SidebarItem
                sidebarInfo={sidebarInfo}
                key={sidebarInfo?.id}
                icon={sidebarInfo?.icon}
                isActive={location?.pathname === sidebarInfo?.path}
                onNavigate={() => {
                  history.push(sidebarInfo?.path);
                  return handleSidebarToggle();
                }}
              />
            );
          }
        })}
      </Sidebar>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  padding: 0.5rem 1rem;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  background: ${(props) => props.theme.colors.secondary};

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    padding: 1rem 5rem;
  }
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin: 0 0.2rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    .menu-icon {
      display: none;
    }
  }
`;

const LogoImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 0.5rem;
`;
