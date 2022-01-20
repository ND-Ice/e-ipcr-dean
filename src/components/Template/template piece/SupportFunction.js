import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";

import { AddSupportSuccessIndicator, EditSupportFunctions } from "..";
import {
  deleteSupportFunctions,
  editSupportFunctions,
  setCurrentId,
} from "../../../store/template";

export default function SupportFunction({ supportFunction }) {
  const { title, description, percentage, id } = supportFunction;
  const dispatch = useDispatch();
  const [showAddSuccessIndicator, setShowAddSuccessIndicator] = useState(false);
  const [showEditSupportFunction, setShowEditSupportFunction] = useState(false);

  const handleAdd = () => {
    setShowAddSuccessIndicator(true);
    return dispatch(setCurrentId({ currentId: id }));
  };

  const handleEdit = () => {
    setShowEditSupportFunction(true);
    dispatch(setCurrentId({ currentId: id }));
  };

  const handleDelete = () =>
    dispatch(deleteSupportFunctions({ sfId: id, percentage }));

  return (
    <Container>
      <h6 className="m-0">
        {title} - ({percentage}%)
      </h6>
      <ActionContainer>
        <FiPlus className="icon icon-add" onClick={handleAdd} />
        <FiEdit className="icon icon-edit" onClick={handleEdit} />
        <FiTrash className="icon icon-delete" onClick={handleDelete} />
      </ActionContainer>
      <Description>{description}</Description>

      <Modal
        show={showAddSuccessIndicator}
        onHide={() => setShowAddSuccessIndicator(false)}
      >
        <AddSupportSuccessIndicator open={setShowAddSuccessIndicator} />
      </Modal>
      <Modal
        show={showEditSupportFunction}
        onHide={() => setShowEditSupportFunction(false)}
      >
        <EditSupportFunctions open={setShowEditSupportFunction} />
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const ActionContainer = styled.div`
  position: absolute;
  right: 0;
  top: -5px;

  .icon {
    cursor: pointer;
    margin: 0 5px;
    transition: all 120ms;

    :hover {
      transform: scale(1.5);
      transform-origin: bottom;
    }
  }

  .icon-add {
    color: ${({ theme }) => theme.colors.accent.blue};
  }

  .icon-edit {
    color: ${({ theme }) => theme.colors.accent.emerald};
  }

  .icon-delete {
    color: ${({ theme }) => theme.colors.accent.red};
  }
`;

const Description = styled.p`
  margin: 0;
  max-width: 50ch;
`;
