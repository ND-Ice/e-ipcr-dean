import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { Avatar, LetterAvatar } from ".";

import facultiesApi from "../api/faculties";
import { getRemarks } from "../utils";
import { useSelector } from "react-redux";
import { getEvaluations } from "../store/evaluations";

export default function ResponseData({ response, onPreview }) {
  const { preview } = useSelector(getEvaluations);
  const [imageError, setImageError] = useState(false);
  const { user } = response;

  const isLate = moment(parseInt(response?.dateSubmitted)).isAfter(
    preview?.due
  );

  return (
    <TableRow isLate={isLate} onClick={() => onPreview(response?._id)}>
      <TableData>
        <div className="d-flex align-items-center">
          <div>
            {user?.image?.current && !imageError ? (
              <Avatar
                user={user}
                size={45}
                onError={() => setImageError(true)}
              />
            ) : (
              <LetterAvatar user={user} size={45} />
            )}
          </div>
        </div>
      </TableData>
      <TableData>
        {user?.name?.firstName} {user?.name?.lastName}
      </TableData>
      <TableData>{user?.email}</TableData>
      <TableData>
        {moment(parseInt(response?.dateSubmitted)).format("ll")}
      </TableData>
      <TableData>{response?.ratings?.average || "Pending"}</TableData>
      <TableData>
        {getRemarks(response?.ratings?.average) || "Pending"}
      </TableData>
      <TableData>
        {response?.isApproved ? (
          <Approved>Approved</Approved>
        ) : (
          <Pending>Pending</Pending>
        )}
      </TableData>
    </TableRow>
  );
}

const TableRow = styled.tr`
  cursor: pointer;
  transition: all 0.3s;
  background: ${({ isLate }) => (isLate ? "yellow" : "white")};

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const TableData = styled.td`
  vertical-align: middle;
`;

const Approved = styled.span`
  display: inline-grid;
  padding: 5px 10px;
  border-radius: 1rem;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.accent.emerald};
`;

const Pending = styled.span`
  display: inline-grid;
  padding: 5px 10px;
  border-radius: 1rem;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.accent.red};
`;
