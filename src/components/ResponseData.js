import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { Avatar, LetterAvatar } from ".";

import facultiesApi from "../api/faculties";
import { getRemarks, getSentiment } from "../utils";
import { useSelector } from "react-redux";
import { getEvaluations } from "../store/evaluations";

export default function ResponseData({ response, onPreview }) {
  const [user, setUser] = useState(null);
  const { preview } = useSelector(getEvaluations);
  const [imageError, setImageError] = useState(false);

  const isLate = moment(parseInt(response?.dateSubmitted)).isAfter(
    preview?.due
  );

  useEffect(() => {
    getUser(response?.userId);
  }, []);

  const getUser = async (id) => {
    try {
      const faculty = await facultiesApi.getFaculty(id);
      setUser(faculty.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableRow isLate={isLate} onClick={() => onPreview(response?._id)}>
      <TableData>
        <div>
          {imageError || !user?.image?.current ? (
            <LetterAvatar user={user} size={30} />
          ) : (
            <Avatar
              user={user}
              size={30}
              onError={() => setImageError(false)}
            />
          )}
        </div>
      </TableData>
      <TableData>{user?.name?.firstName}</TableData>
      <TableData>{user?.name?.lastName}</TableData>
      <TableData>{user?.email}</TableData>
      <TableData>
        {moment(parseInt(response?.dateSubmitted)).format("LL")}
      </TableData>
      <TableData>{response?._id}</TableData>
      <TableData>{response?.ratings?.average || "Pending"}</TableData>
      <TableData>
        {getRemarks(response?.ratings?.average) || "Pending"}
      </TableData>
      <TableData>
        {getSentiment(response?.ratings?.average) || "Pending"}
      </TableData>
      {
        <TableData>
          {response?.isApproved?.approvedBy?.name?.firstName}{" "}
          {response?.isApproved?.approvedBy?.name?.lastName}
        </TableData>
      }
      <TableData>
        {response.isApproved ? (
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