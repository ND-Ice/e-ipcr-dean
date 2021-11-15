import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";

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
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : "https://scontent.fmnl3-2.fna.fbcdn.net/v/t1.6435-9/71756577_196585848007718_4137557491925909504_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeG1y-KmTF4YjCu05IbCuU9ZgzJHcpnrvHeDMkdymeu8d5EQBgpQ28egWp9x6HhuGOn_yUy5HHIKo4yjgYHyxa7c&_nc_ohc=YsWuvrFrWsYAX8xnyg9&_nc_ht=scontent.fmnl3-2.fna&oh=cc987b3ceecf03c3021c16edcbed95b6&oe=61A37351"
          }
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
`;
