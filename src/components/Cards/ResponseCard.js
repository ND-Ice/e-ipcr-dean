import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { useSelector } from "react-redux";

import { Avatar, LetterAvatar } from "..";
import { getEvaluations } from "../../store/evaluations";
import facultiesApi from "../../api/faculties";
import { getLetterAvatarBg } from "../../utils";

export default function ResponseCard({ response, onPreview }) {
  const { preview } = useSelector(getEvaluations);
  const [imageError, setImageError] = useState(false);
  const { user } = response;

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
`;

const AvatarContainer = styled.div`
  width: 50px;
  margin-right: 1rem;
`;

const Name = styled.h4`
  margin: 0;
  font-weight: 700;
  font-size: 1.2rem;
`;
const Email = styled.p`
  word-break: break-all;
  margin: 0;
`;

const Badge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.2rem 1rem;
  max-width: max-content;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ college }) => getLetterAvatarBg(college)};
`;
