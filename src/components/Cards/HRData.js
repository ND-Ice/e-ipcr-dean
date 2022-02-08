import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { Avatar, LetterAvatar } from "..";

import { getRemarks } from "../../utils";
import { useSelector } from "react-redux";
import { getEvaluations } from "../../store/evaluations";
import { Button } from "react-bootstrap";

export default function HEADdata({ response, onPreview }) {
  const { preview } = useSelector(getEvaluations);
  const [imageError, setImageError] = useState(false);
  const { status } = response;
  const { faculty, HR } = status;

  const isLate = moment(parseInt(response?.dateSubmitted)).isAfter(
    preview?.due
  );

  return (
    <TableRow isLate={isLate}>
      {" "}
      <TableData>
        <div className="d-flex align-items-center">
          <div>
            {faculty?.user?.image?.current && !imageError ? (
              <Avatar
                user={faculty?.user}
                size={45}
                onError={() => setImageError(true)}
              />
            ) : (
              <LetterAvatar user={faculty?.user} size={45} />
            )}
          </div>
        </div>
      </TableData>
      <TableData>
        {faculty?.user?.name?.firstName} {faculty?.user?.name?.lastName}
      </TableData>
      <TableData>{faculty?.user?.email}</TableData>
      <TableData>
        {moment(parseInt(response?.dateSubmitted)).format("ll")}
      </TableData>
      <TableData>{response?.ratings?.average || "Pending"}</TableData>
      <TableData>
        {getRemarks(response?.ratings?.average) || "Pending"}
      </TableData>
      <TableData>
        {HR?.isApproved ? (
          <Button
            className="text-uppercase"
            onClick={() => onPreview(response?._id)}
          >
            View
          </Button>
        ) : (
          <Button
            variant="danger"
            className="text-uppercase"
            onClick={() => onPreview(response?._id)}
          >
            Approve
          </Button>
        )}
      </TableData>
    </TableRow>
  );
}

const TableRow = styled.tr`
  transition: all 0.3s;
  background: ${({ isLate }) => (isLate ? "yellow" : "white")};

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const TableData = styled.td`
  vertical-align: middle;
`;
