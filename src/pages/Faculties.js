import React, { useEffect } from "react";
import styled from "styled-components";
import { Table } from "react-bootstrap";

import { FiSearch } from "react-icons/fi";
import { IconButton, MyLoader, TableData } from "../components";

import facultiesApi from "../api/faculties";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/user";
import {
  facultiesReceived,
  facultiesRequested,
  facultiesRequestFailed,
  getFaculties,
} from "../store/faculties";

export default function Faculties({ history }) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const faculties = useSelector(getFaculties);

  useEffect(() => {
    getFacultyList(user.currentUser.dept);
  }, []);

  const handleSearch = () => history.push("/dashboard/faculties/search");

  const getFacultyList = async (dept) => {
    try {
      dispatch(facultiesRequested());
      const response = await facultiesApi.getFacultiesByDepartment(dept);
      dispatch(facultiesReceived(response.data));
    } catch (error) {
      return dispatch(facultiesRequestFailed(error));
    }
  };

  const handleNavigateFaculty = (id) =>
    history.push(`/dashboard/faculties/${id}`);

  return (
    <Appcontainer>
      <AppHeader>
        <h2 className="m-0">Faculty List</h2>
        <IconContainer>
          <IconButton
            icon={FiSearch}
            size={40}
            bg="#0064f9"
            iconColor="#ffffff"
            onClick={handleSearch}
          />
        </IconContainer>
      </AppHeader>
      {faculties.loading ? (
        <MyLoader />
      ) : (
        <Table borderless className="mt-2 w-100">
          <TableHead>
            <TableHeader>Profile</TableHeader>
            <TableHeader>Email Address</TableHeader>
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>Department</TableHeader>
          </TableHead>
          <tbody>
            {faculties.list.map((faculty) => (
              <TableData
                key={faculty._id}
                userInfo={faculty}
                onNavigate={handleNavigateFaculty}
              />
            ))}
          </tbody>
        </Table>
      )}
    </Appcontainer>
  );
}

const Appcontainer = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  padding: 0.5rem;
`;

const AppHeader = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 4px solid ${(props) => props.theme.colors.secondary};

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 1rem;
  }
`;

const IconContainer = styled.div`
  > * {
    margin-left: 5px;
  }
`;

const TableHead = styled.thead`
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const TableHeader = styled.th`
  padding: 1rem;
  font-weight: 500;
`;
