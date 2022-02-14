import React from "react";
import moment from "moment";

import { getRemarks } from "../utils";

export default function PrintTableData({ response }) {
  const { dateSubmitted, ratings, status } = response;
  const { user } = status?.faculty;

  return (
    <tr>
      <td className="p-3">
        {user?.name?.firstName} {user?.name?.lastName}
      </td>
      <td className="p-3">{user?.email}</td>
      <td className="p-3">{user?.position}</td>
      <td className="p-3">{user?.college}</td>
      <td className="p-3">{moment(parseInt(dateSubmitted)).format("LL")}</td>
      <td className="p-3" className="text-center">
        {ratings?.average}
      </td>
      <td className="p-3">{getRemarks(ratings?.average)}</td>
    </tr>
  );
}
