import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Table } from "react-bootstrap";

import { Filter, MyLoader, TableData } from "../components";

import facultiesApi from "../api/faculties";
import { useDispatch, useSelector } from "react-redux";
import {
  facultiesReceived,
  facultiesRequested,
  facultiesRequestFailed,
  facultySorted,
  getFaculties,
} from "../store/faculties";
import { getUser } from "../store/user";
import listItem from "../utils/filter";

export default function Faculties({ history }) {
  const dispatch = useDispatch();
  const faculties = useSelector(getFaculties);

  const activatedFaculty = faculties?.list?.filter(
    (faculty) => faculty?.isActivated
  );

  const filtered =
    faculties.sortBy && faculties.sortBy.id
      ? activatedFaculty?.filter(
          (faculty) => faculty?.college === faculties.sortBy.value
        )
      : activatedFaculty;

  useEffect(() => {
    getFacultyList();
  }, []);

  const handleSearch = () => history.push("/dashboard/faculties/search");

  const getFacultyList = async () => {
    try {
      dispatch(facultiesRequested());
      const response = await facultiesApi.getFaculties();
      dispatch(facultiesReceived(response.data));
    } catch (error) {
      return dispatch(facultiesRequestFailed(error));
    }
  };

  const handleItemSelect = (item) => dispatch(facultySorted(item));

  const handleNavigateFaculty = (id) =>
    history.push(`/dashboard/faculties/${id}`);

  return (
    <Appcontainer>
      <AppHeader>
        <h5 className="m-0 text-uppercase fw-bold">Faculties</h5>
        <IconContainer>
          <Button onClick={handleSearch}>Search</Button>
        </IconContainer>
      </AppHeader>
      <Filter
        items={listItem}
        selectedItem={faculties.sortBy}
        onSelectItem={handleItemSelect}
      />
      {faculties.loading ? (
        <MyLoader />
      ) : (
        <Table borderless className="mt-2 w-100">
          <TableHead>
            <TableHeader>Profile</TableHeader>
            <TableHeader>Email Address</TableHeader>
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>Position</TableHeader>
            <TableHeader> college</TableHeader>
          </TableHead>
          <tbody>
            {filtered?.map((faculty) => (
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
  overflow: auto;
  padding: 0 0.5rem;
  max-height: 600px;
`;

const AppHeader = styled.div`
  display: flex;
  padding-bottom: 0.5rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
`;

const IconContainer = styled.div`
  > * {
    margin-left: 5px;
  }
`;

const TableHead = styled.thead`
  text-transform: uppercase;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const TableHeader = styled.th`
  padding: 1rem;
  font-weight: 500;
`;
