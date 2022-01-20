import React, { useState } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { AppForm, FormControl } from "../../forms";
import { AddList, ListItem } from ".";
import { addRecommendation } from "../../../store/response";

const validationSchema = Yup.object().shape({
  recommendation: Yup.string()
    .min(10, "This should be atleast 10 characters long.")
    .required("This field is required."),
});

export default function AddRecommendations({ response, open }) {
  const dispatch = useDispatch();
  const [recommendations, setRecommendations] = useState([]);

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

  //   list handler
  const handleAdd = (text) =>
    setRecommendations((prevState) => [
      ...prevState,
      { id: uuidv4(), item: text },
    ]);
  const handleDelete = (id) =>
    setRecommendations((prevState) =>
      prevState?.filter((item) => item?.id !== id)
    );
  // modal close
  const handleClose = () => open(false);
  return (
    <Container>
      <header className="d-flex align-items-center justify-content-between">
        <h6 className="m-0">Recommendations</h6>
        <Icon onClick={handleClose}>
          <FiX />
        </Icon>
      </header>
      {/* forms */}
      <AppForm
        initialValues={{ recommendation: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="multiline"
          name="recommendation"
          title="Recommendation"
          style={{ minHeight: "120px" }}
        />
        <div className="mb-3">
          <h6>Recommendations as List</h6>
          <AddList title="Recommendation" onAdd={handleAdd} />
          {recommendations?.map((item) => (
            <ListItem key={item?.id} item={item} onDelete={handleDelete} />
          ))}
        </div>

        <FormControl variant="button" title="Add Recommendation" />
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
  transition: all 300ms;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;
