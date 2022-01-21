import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { useSelector } from "react-redux";

import { Avatar, LetterAvatar } from "..";
import { getEvaluations } from "../../store/evaluations";
import { getLetterAvatarBg, getRemarks, getRemarksColor } from "../../utils";

export default function ResponseCard({ response, onPreview }) {
  const { preview } = useSelector(getEvaluations);
  const [imageError, setImageError] = useState(false);
  const { user, ratings } = response;

  const isLate = moment(parseInt(response?.dateSubmitted)).isAfter(
    preview?.due
  );

  return (
    <Container isLate={isLate} onClick={() => onPreview(response?._id)}>
      <Header>
        {/* user avatar */}
        <AvatarContainer>
          {user?.image?.current && !imageError ? (
            <Avatar size={50} user={user} onError={() => setImageError(true)} />
          ) : (
            <LetterAvatar size={50} user={user} />
          )}
        </AvatarContainer>
        {/* user handle */}
        <div>
          <Name>
            {user?.name?.firstName} {user?.name?.lastName}
          </Name>
          <Email>{user?.email}</Email>
        </div>
      </Header>
      <Badge college={user?.college?.acronym}>{user?.college?.acronym}</Badge>
      <DepartmentBadge average={ratings?.average}>
        {getRemarks(ratings?.average)}
      </DepartmentBadge>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-bottom-color: ${({ isLate, theme }) =>
    isLate ? "#f0c810" : theme.colors.secondary};

  :hover {
    border-bottom-color: ${({ theme }) => theme.colors.accent.emerald};
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarContainer = styled.div`
  width: 50px;
  margin-right: 1rem;
`;

const Name = styled.h4`
  margin: 0;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
`;
const Email = styled.p`
  word-break: break-all;
  margin: 0;
`;

const Badge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  max-width: max-content;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ college }) => getLetterAvatarBg(college)};
`;

const DepartmentBadge = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  max-width: max-content;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ average }) => getRemarksColor(average)};
`;
