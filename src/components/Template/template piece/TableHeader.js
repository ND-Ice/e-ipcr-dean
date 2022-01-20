import React from "react";
import styled from "styled-components";

import Logo from "../../../image/Logo.png";

export default function TableHeader() {
  return (
    <Header>
      <LogoImage src={Logo} />
      <div className="text-center">
        <i>Republic of the Philippines</i>
        <h4 className="m-0">
          EULOGIO “AMANG” RODRIGUEZ INSTITUTE OF SCIENCE AND TECHNOLOGY
        </h4>
        <i>Nagtahan, Sampaloc, Manila</i>
      </div>
    </Header>
  );
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const LogoImage = styled.img`
  width: 80px;
  height: 80px;
  position: relative;
  left: -2rem;
`;
