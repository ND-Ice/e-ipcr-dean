import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";

import { Avatar, LetterAvatar } from ".";
import { getLetterAvatarBg } from "../utils";

export default function TableData({ userInfo, onNavigate }) {
  const [imageError, setImageError] = useState(false);
  const diffInHours = moment().diff(
    moment(parseInt(userInfo.timeStamp)),
    "hours"
  );

  return (
    <TableDataRow onClick={() => onNavigate(userInfo._id)}>
      <TableDataItem>
        {userInfo.image.current && !imageError ? (
          <Avatar
            user={userInfo}
            size={40}
            onError={() => setImageError(true)}
          />
        ) : (
          <LetterAvatar user={userInfo} size={40} />
        )}
      </TableDataItem>
      <TableDataItem>{userInfo?.email}</TableDataItem>
      <TableDataItem>{userInfo?.name?.firstName}</TableDataItem>
      <TableDataItem>{userInfo.name?.lastName}</TableDataItem>
      <TableDataItem>
        <Badge college={userInfo?.college?.acronym}>{userInfo?.dept}</Badge>
      </TableDataItem>
      <TableDataItem>{userInfo?.position}</TableDataItem>
      <TableDataItem>
        {diffInHours < 5 ? <NewBadge>New</NewBadge> : null}
      </TableDataItem>
    </TableDataRow>
  );
}

const TableDataRow = styled.tr`
  cursor: pointer;
  transition: all 0.3 ease;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const Badge = styled.span`
  padding: 6px 12px;
  border-radius: 1rem;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ college }) => getLetterAvatarBg(college)};
`;

const TableDataItem = styled.td`
  vertical-align: middle;
`;

const NewBadge = styled(Badge)`
  background: ${({ theme }) => theme.colors.accent.red};
  color: ${({ theme }) => theme.colors.white};
`;
