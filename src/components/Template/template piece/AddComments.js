import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

import { AddList, ListItem } from ".";
import { addComment } from "../../../store/response";
import { AppForm, FormControl } from "../../forms";

const validationSchema = Yup.object().shape({
  comment: Yup.string()
    .min(10, "This Should be atleast the characters long.")
    .required("This field is required."),
});

export default function AddComments({ response, open }) {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);

  const handleSubmit = (values) => {
    dispatch(
      addComment({
        responseId: response?._id,
        comments: { title: values?.comment, list: comments },
      })
    );
    return open(false);
  };

  // list handler
  const handleAdd = (text) =>
    setComments((prevState) => [...prevState, { id: uuidv4(), item: text }]);
  const handleDelete = (id) =>
    setComments((prevState) => prevState?.filter((item) => item?.id !== id));

  // close modal
  const handleClose = () => open(false);

  return (
    <Container>
      <header className="d-flex align-items-center justify-content-between mb-3">
        <h6 className="m-0">Add Comments</h6>
        <Icon onClick={handleClose}>
          <FiX />
        </Icon>
      </header>
      {/* forms */}
      <AppForm
        initialValues={{ comment: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="multiline"
          name="comment"
          title="Comment"
          style={{ minHeight: "120px" }}
        />
        <div className="mb-3">
          <h6>Comment as List</h6>
          <AddList title="Comment" onAdd={handleAdd} />
          {comments?.map((item) => (
            <ListItem key={item?.id} item={item} onDelete={handleDelete} />
          ))}
        </div>

        <FormControl variant="button" title="Add Comment" />
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
  transition: all 0.3s;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;
