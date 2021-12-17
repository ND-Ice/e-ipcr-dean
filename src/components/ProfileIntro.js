import React from "react";
import styled from "styled-components";
import { AvatarProfile } from ".";

export default function ProfileIntro({ user }) {
  return (
    <Container>
      <Header>
        <AvatarProfile size={100} user={user} />
        <h3 className="mt-2">
          {user.name.firstName} {user.name.lastName}
        </h3>
        <p>Dean of {user.dept}</p>
      </Header>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.white};
`;

const Header = styled.div`
  display: grid;
  place-items: center;
  padding: 1rem;
`;

const Content = styled.div`
  padding: 0.5rem;
`;
