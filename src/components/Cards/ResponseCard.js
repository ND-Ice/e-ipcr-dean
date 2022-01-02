import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiCheckCircle, FiLoader } from "react-icons/fi";

import { Avatar, LetterAvatar } from "..";
import facultiesApi from "../../api/faculties";
import { getRemarks, getSentiment } from "../../utils";

export default function ResponseCard({ response, onPreview }) {
  const [user, setUser] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    getUser(response.userId);
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
    <Container onClick={() => onPreview(response._id)}>
      <AppHeader>
        <div>
          {imageError || !user?.image?.current ? (
            <LetterAvatar user={user} size={40} />
          ) : (
            <Avatar
              user={user}
              size={40}
              onError={() => setImageError(false)}
            />
          )}
        </div>
        <div className="ms-3">
          <h6 className="m-0">
            {user?.name?.firstName} {user?.name?.lastName}
          </h6>
          <p className="m-0 text-muted">{user?.email}</p>
        </div>
        <StatusContainer>
          {response.isApproved ? (
            <FiCheckCircle className="approved" />
          ) : (
            <FiLoader className="pending" />
          )}
        </StatusContainer>
      </AppHeader>
      <AppContent>
        <div style={{ width: "40px", height: "40px" }} />
        <div className="ms-3 d-flex ">
          <div className="me-3">
            {response?.ratings?.average || "Not yet verified."}
          </div>
          <div className="me-3">
            {getRemarks(response?.ratings?.average) || "Not yet verified."}
          </div>
          <div>
            {getSentiment(response?.ratings?.average) || "Not yet verified."}
          </div>
        </div>
      </AppContent>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid ${({ theme }) => theme.colors.secondary};

  :hover {
    border-bottom: 2px solid ${({ theme }) => theme.colors.accent.emerald};
  }
`;

const AppHeader = styled.div`
  display: flex;
  position: relative;
`;

const StatusContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  .pending {
    color: ${({ theme }) => theme.colors.accent.red};
  }
  .approved {
    color: ${({ theme }) => theme.colors.accent.emerald};
  }
`;

const AppContent = styled.div`
  align-items: center;
  margin-top: 0.5rem;
  display: flex;
`;
