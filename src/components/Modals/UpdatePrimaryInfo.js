import React, { useState } from "react";
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

export default function UpdatePrimaryInfo({ user, open }) {
  const dispatch = useDispatch();
  const userProps = useSelector(getUser);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (values) => {
    try {
      dispatch(userRequested());
      const dean = await deansApi.updateDeanInfo(user._id, values);
      setSuccessMessage("Updated Successfuly.");
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
          contact: user?.contact || "",
          houseNumber: user?.address?.houseNumber || "",
          street: user?.address?.street || "",
          barangay: user?.address?.barangay || "",
          city: user?.address?.city || "",
          province: user?.address?.province || "",
        }}
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="input"
          name="contact"
          title="Contact Number"
          className="p-2"
          loading={userProps.loading}
        />
        <AddressContainer>
          <FormControl
            variant="input"
            name="houseNumber"
            title="House Number"
            className="p-2"
            loading={userProps.loading}
          />
          <FormControl
            variant="input"
            name="street"
            title="Street"
            className="p-2"
            loading={userProps.loading}
          />
          <FormControl
            variant="input"
            name="barangay"
            title="Barangay"
            className="p-2"
            loading={userProps.loading}
          />
          <FormControl
            variant="input"
            name="city"
            title="City"
            className="p-2"
            loading={userProps.loading}
          />
          <FormControl
            variant="input"
            name="province"
            title="Province"
            className="p-2"
            loading={userProps.loading}
          />
        </AddressContainer>
        {userProps.errorMessage && (
          <Alert variant="danger">
            {userProps.errorMessage.response.data ||
              "Something went wrong. Please try again later."}
          </Alert>
        )}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <FormControl
          variant="button"
          title="Save"
          loading={userProps.loading}
        />
      </AppForm>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;

const AddressContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
