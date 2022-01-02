import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Alert, Button } from "react-bootstrap";

import avatarImg from "../image/avatarImg.jpg";
import deansApi from "../api/deans";
import { useDispatch } from "react-redux";
import {
  currentUserReceived,
  userRequested,
  userRequestFailed,
} from "../store/user";

export default function UpdateProfilePicture({ user, open }) {
  const dispatch = useDispatch();
  const hiddenFileUpdload = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePick = () => hiddenFileUpdload.current.click();

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleDelete = () => setSelectedImage(null);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      dispatch(userRequested());
      const dean = await deansApi.udpateProfilePicture(
        user?._id,
        selectedImage
      );
      setErrorMessage(null);
      dispatch(currentUserReceived(dean.data));
      setLoading(false);
      return open(false);
    } catch (error) {
      setErrorMessage(error);
      setLoading(false);
      return dispatch(userRequestFailed(error));
    }
  };

  return (
    <Container>
      <Header>
        <Button onClick={handlePick} variant="primary" className="mx-1">
          Upload New
          <input
            className="d-none"
            onChange={handleChange}
            accept="image/png, image/jpeg"
            ref={hiddenFileUpdload}
            type="file"
          />
        </Button>
        {selectedImage && (
          <Button onClick={handleDelete} variant="danger" className="mx-1">
            Delete
          </Button>
        )}
      </Header>
      <ImageContainer>
        <ProfilePicture
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : user?.image?.current || avatarImg
          }
        />
      </ImageContainer>
      {errorMessage && (
        <Alert variant="danger">
          {errorMessage?.response?.data ||
            "Something went wrong. Please try again later."}
        </Alert>
      )}

      {selectedImage && (
        <Button
          variant="primary"
          className="mx-1"
          disabled={loading}
          onClick={handleUpdate}
        >
          Upload
        </Button>
      )}
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: grid;
  place-items: center;
  padding: 5rem;
`;

const ProfilePicture = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  border: 4px solid ${(props) => props.theme.colors.accent.blue};
`;
