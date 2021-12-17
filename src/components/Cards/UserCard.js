import moment from "moment";
import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, LetterAvatar } from "..";
import { getLetterAvatarBg } from "../../utils";

export default function UserCard({ user, onClick }) {
  const [isImageError, setIsImageError] = useState(false);
  const diffInHours = moment().diff(moment(parseInt(user.timeStamp)), "hours");

  return (
    <CardContainer onClick={onClick}>
      <CardHeader>
        <div>
          {isImageError || !user.image?.current ? (
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
          <h4 className="m-0">
            {user?.name?.firstName} {user?.name?.lastName}
          </h4>
          <p className="email-address text-muted mb-0">{user?.email}</p>
          <Badge user={user.dept}>{user?.dept}</Badge>
        </InformationContainer>
      </CardHeader>
      {diffInHours < 5 && <NewBadge>New </NewBadge>}
    </CardContainer>
  );
}

const CardContainer = styled.div`
  padding: 1rem;
  cursor: pointer;
  border-radius: 2px;
  position: relative;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  transition: all 0.3s;

  :hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
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

const NewBadge = styled.span`
  display: block;
  width: max-content;
  padding: 5px 10px;
  position: absolute;
  top: 10px;
  right: 0;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.accent.red};
`;
