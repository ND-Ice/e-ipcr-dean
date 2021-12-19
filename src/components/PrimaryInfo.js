import React, { useState } from "react";
import styled from "styled-components";
import {
  FiCalendar,
  FiEdit,
  FiMail,
  FiMapPin,
  FiPhoneCall,
} from "react-icons/fi";

import { CustomModal, ProfileItem } from ".";
import { UpdatePrimaryInfo } from "./Modals";

export default function PrimaryInfo({ user }) {
  const [show, setShow] = useState(false);
  return (
    <Container>
      <Header>
        <h5 className="m-0">Primary Information</h5>
        <FiEdit className="edit-icon" onClick={() => setShow(true)} />
      </Header>
      <ProfileItem title="Email Address" icon={FiMail} text={user.email} />
      <ProfileItem
        title="Contact Number"
        icon={FiPhoneCall}
        text={user.contact || "Not yet defined."}
      />
      <ProfileItem
        title="Birth Date"
        icon={FiCalendar}
        text={`Born in, ${user.birthDate || "Not yet defined."}`}
      />
      <ProfileItem
        title="Address"
        icon={FiMapPin}
        text={user.address || "Not yet defined."}
      />

      <CustomModal
        heading="Update Primary Information"
        show={show}
        onHide={() => setShow(false)}
      >
        <UpdatePrimaryInfo user={user} />
      </CustomModal>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
  background: red;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  background: ${({ theme }) => theme.colors.white};
`;

const Header = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};

  .edit-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: all 0.3s;

    :hover {
      color: ${({ theme }) => theme.colors.accent.blue};
    }
  }
`;
