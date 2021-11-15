import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, LetterAvatar } from "..";
import { getLetterAvatarBg } from "../../utils";

export default function UserCard({ user, onClick }) {
  const [isImageError, setIsImageError] = useState(false);
  return (
    <CardContainer onClick={onClick}>
      <CardHeader>
        <div>
          {isImageError || !user.image ? (
            <LetterAvatar user={user} size={60} />
          ) : (
            <Avatar
              user={user}
              size={60}
              onError={() => setIsImageError(true)}
            />
          )}
        </div>
        <InformationContainer>
          <h3 className="m-0">{user?.name}</h3>
          <p className="email-address text-muted mb-0">{user?.email}</p>
          <Badge user={user.dept}>{user?.dept}</Badge>
        </InformationContainer>
      </CardHeader>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background: ${(props) => props.theme.colors.secondary};
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

const CardHeader = styled.div`
  display: flex;

  .email-address {
    word-break: break-all;
  }
`;

const InformationContainer = styled.div`
  margin-left: 1rem;
`;

const Badge = styled.span`
  display: inline-grid;
  padding: 0.2rem 0.5rem;
  background-color: ${(props) => getLetterAvatarBg(props.user)};
  color: ${(props) => props.theme.colors.white};
  border-radius: 2rem;
  font-weight: 500;
  font-size: ${(props) => props.theme.fontSize.paragraph.xs};
`;
