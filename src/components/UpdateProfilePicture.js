import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";

import avatarImg from "../image/avatarImg.jpg";

export default function UpdateProfilePicture() {
  const hiddenFileUpdload = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePick = () => hiddenFileUpdload.current.click();

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleDelete = () => setSelectedImage(null);

  const handleUpdate = () => console.log(selectedImage);

  return (
    <Container>
      <Header>
        <Button
          onClick={handlePick}
          variant="primary"
          className="w-100 mx-1 p-3"
        >
          Upload
          <input
            className="d-none"
            onChange={handleChange}
            ref={hiddenFileUpdload}
            type="file"
          />
        </Button>
        {selectedImage && (
          <Button
            onClick={handleDelete}
            variant="danger"
            className="w-100 mx-1 p-3"
          >
            Delete
          </Button>
        )}
      </Header>
      <ImageContainer>
        <ProfilePicture
          src={selectedImage ? URL.createObjectURL(selectedImage) : avatarImg}
        />
      </ImageContainer>

      {selectedImage && (
        <Button
          onClick={handleUpdate}
          variant="primary"
          className="w-100 mx-1 p-3"
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
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  display: grid;
  place-items: center;
  padding: 5rem;
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  border: 4px solid ${(props) => props.theme.colors.accent.blue};
`;
