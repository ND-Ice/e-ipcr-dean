import React, { useState, useEffect } from "react";
import moment from "moment";

import { getRemarks } from "../utils";
import facultiesApi from "../api/faculties";

export default function PrintTableData({ response }) {
  const [user, setUser] = useState(null);
  const { dateSubmitted, ratings, userId } = response;

  useEffect(() => {
    getUser(userId);
  }, []);

  const getUser = async (id) => {
    try {
      const faculty = await facultiesApi.getFaculty(id);
      return setUser(faculty.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr className="text-center">
      <td>
        {user?.name?.firstName} {user?.name?.lastName}
      </td>
      <td>{user?.email}</td>
      <td>{user?.position}</td>
      <td>{user?.dept}</td>
      <td>{moment(parseInt(dateSubmitted)).format("LL")}</td>
      <td>{ratings?.average}</td>
      <td>{getRemarks(ratings?.average)}</td>
    </tr>
  );
}
