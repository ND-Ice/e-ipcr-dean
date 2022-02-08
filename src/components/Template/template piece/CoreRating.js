import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FiPlus } from "react-icons/fi";

import { AddCoreRating, TemplateIcon } from "..";
import { setTargetIndicator } from "../../../store/response";
import EditCoreRating from "../EditCoreRating";

export default function CoreRating({
  coreFunction,
  successIndicator,
  response,
  textProperty,
}) {
  const dispatch = useDispatch();
  const [showAddRating, setShowAddRating] = useState(false);
  const [showEditCoreRating, setShowEditCoreRating] = useState(false);

  return (
    <div>
      {successIndicator?.actualAccomplishments?.rating?.[textProperty] ? (
        <Rating
          onClick={() => {
            dispatch(
              setTargetIndicator({
                responseId: response?._id,
                funcId: coreFunction?.id,
                indicatorId: successIndicator?.id,
              })
            );
            return setShowEditCoreRating(true);
          }}
        >
          {successIndicator?.actualAccomplishments?.rating?.[textProperty]}
        </Rating>
      ) : (
        <TemplateIcon
          icon={FiPlus}
          fg="#ffffff"
          bg="#0891b2"
          onClick={() => {
            dispatch(
              setTargetIndicator({
                responseId: response?._id,
                funcId: coreFunction?.id,
                indicatorId: successIndicator?.id,
              })
            );
            return setShowAddRating(true);
          }}
        />
      )}
      <Modal
        size="lg"
        show={showAddRating}
        onHide={() => setShowAddRating(false)}
      >
        <AddCoreRating
          id={response?._id}
          response={response}
          successIndicator={successIndicator}
          open={setShowAddRating}
        />
      </Modal>

      <Modal
        size="lg"
        show={showEditCoreRating}
        onHide={() => setShowEditCoreRating(false)}
      >
        <EditCoreRating
          id={response?._id}
          response={response}
          successIndicator={successIndicator}
          open={setShowEditCoreRating}
        />
      </Modal>
    </div>
  );
}

const Rating = styled.div`
  transition: all 120ms;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.accent.blue};
  }
`;
