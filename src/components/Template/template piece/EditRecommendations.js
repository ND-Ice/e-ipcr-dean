import React, { useState } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

import { AddList, ListItem } from ".";
import { AppForm, FormControl } from "../../forms";
import { addComment, addRecommendation } from "../../../store/response";

const validationSchema = Yup.object().shape({
  recommendation: Yup.string()
    .min(10, "This should be atleast 10 characters long.")
    .required("This field is required."),
});

export default function EditRecommendations({ response, open }) {
  const dispatch = useDispatch();
  const recommendation = response?.feedback?.recommendations;
  const [recommendations, setRecommendations] = useState([
    ...recommendation?.list,
  ]);
  // submit
  const handleSubmit = (values) => {
    dispatch(
      addRecommendation({
        responseId: response?._id,
        recommendations: {
          title: values?.recommendation,
          list: recommendations,
        },
      })
    );
    return open(false);
  };

  const handleDelete = () => {
    dispatch(
      addRecommendation({
        responseId: response?._id,
        recommendations: { title: "", list: [] },
      })
    );
    return open(false);
  };

  const handleAdd = (text) =>
    setRecommendations((prevState) => [
      ...prevState,
      { id: uuidv4(), item: text },
    ]);

  //   list handler
  const handleDeleteComment = (id) =>
    setRecommendations((prevState) =>
      prevState?.filter((item) => item?.id !== id)
    );

  // modal close
  const handleClose = () => open(false);
  return (
    <Container>
      <header className="d-flex align-items-center justify-content-between mb-3">
        <h6 className="m-0">Edit Recommendations</h6>
        <Icon onClick={handleClose}>
          <FiX />
        </Icon>
      </header>
      <AppForm
        initialValues={{ recommendation: recommendation?.title || "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="multiline"
          name="recommendation"
          title="Recommendations"
          style={{ minHeight: "120px" }}
        />
        <h6>Comment as List</h6>
        <AddList title="Comment" onAdd={handleAdd} />
        <div className="mb-3">
          {recommendations?.map((recommendation) => (
            <ListItem
              key={recommendation?.id}
              item={recommendation}
              onDelete={handleDeleteComment}
            />
          ))}
        </div>
        <div className="d-flex justify-content-between">
          <FormControl variant="button" title="Save Changes" />
          <Button variant="outline-danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </AppForm>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;

const Icon = styled.div`
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 120ms;

  :hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;
