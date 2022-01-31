import React from "react";
import moment from "moment";

import { getRemarks } from "../utils";

export default function PrintTableData({ response }) {
  const { dateSubmitted, ratings, user } = response;

  return (
    <tr>
      <td>
        {user?.name?.firstName} {user?.name?.lastName}
      </td>
      <td>{user?.email}</td>
      <td>{user?.position}</td>
      <td>{user?.dept}</td>
      <td>{moment(parseInt(dateSubmitted)).format("LL")}</td>
      <td className="text-center">{ratings?.average}</td>
      <td>{getRemarks(ratings?.average)}</td>
    </tr>
  );
}
