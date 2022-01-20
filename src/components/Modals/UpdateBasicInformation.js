import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { AppForm, FormControl } from "../forms";
import deansApi from "../../api/deans";
import {
  currentUserReceived,
  getUser,
  userRequestFailed,
  userRequested,
} from "../../store/user";
import { Alert } from "react-bootstrap";
import { useState } from "react";

const genderOptions = [
  { id: 1, title: "Male", value: "Male" },
  { id: 2, title: "Female", value: "Female" },
];

export default function UpdateBasicInformation({ user, open }) {
  const { firstName, middleName, lastName } = user.name;
  const dispatch = useDispatch();
  const userProps = useSelector(getUser);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (values) => {
    try {
      dispatch(userRequested());
      const dean = await deansApi.updateDeanBasicInfo(user._id, values);
      setSuccessMessage("Updated Successfully.");
      dispatch(currentUserReceived(dean.data));
      return open(false);
    } catch (error) {
      return dispatch(userRequestFailed(error));
    }
  };
  return (
    <Container>
      <AppForm
        initialValues={{
          firstName: firstName || "",
          middleName: middleName || "",
          lastName: lastName || "",
          gender: user.gender || "",
          position: user.position || "",
          qualification: user.qualification || "",
        }}
        onSubmit={handleSubmit}
      >
        <NameContainer>
          <FormControl
            variant="input"
            name="firstName"
            title="First Name"
            className="p-2"
            loading={true}
          />
          <FormControl
            variant="input"
            name="middleName"
            title="Middle Name"
            className="p-2"
            loading={true}
          />
          <FormControl
            variant="input"
            name="lastName"
            title="Last Name"
            className="p-2"
            loading={true}
          />
        </NameContainer>
        <FormControl
          variant="input"
          name="position"
          title="Position"
          className="p-2"
          loading={userProps.loading}
        />
        <FormControl
          variant="select"
          name="gender"
          title="Gender"
          className="p-2"
          menuItems={genderOptions}
          loading={userProps.loading}
        />

        <FormControl
          variant="input"
          name="qualification"
          title="Highest Qualification"
          className="p-2"
          loading={userProps.loading}
        />
        {userProps.errorMessage && (
          <Alert variant="danger">
            {userProps.errorMessage.response.data ||
              "Something went wrong. Please try again later."}
          </Alert>
        )}

        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <FormControl
          variant="button"
          className="mt-2"
          title={userProps.loading ? "Saving Changes..." : "Save Changes"}
          loading={userProps.loading}
        />
      </AppForm>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;
const NameContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
