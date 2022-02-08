import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FiPlus } from "react-icons/fi";

import { AddSupportRating, EditSupportRating, TemplateIcon } from "..";
import { setTargetIndicator } from "../../../store/response";

export default function SupportRating({
  supportFunction,
  successIndicator,
  response,
  textProperty,
}) {
  const dispatch = useDispatch();
  const [showAddRating, setShowAddRating] = useState(false);
  const [showEditRating, setShowEditRating] = useState(false);

  return (
    <div>
      {successIndicator?.actualAccomplishments?.rating?.[textProperty] ? (
        <Rating
          onClick={() => {
            dispatch(
              setTargetIndicator({
                responseId: response?._id,
                funcId: supportFunction?.id,
                indicatorId: successIndicator?.id,
              })
            );
            return setShowEditRating(true);
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
                funcId: supportFunction?.id,
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
        <AddSupportRating
          id={response?._id}
          response={response}
          successIndicator={successIndicator}
          open={setShowAddRating}
        />
      </Modal>

      <Modal
        size="lg"
        show={showEditRating}
        onHide={() => setShowEditRating(false)}
      >
        <EditSupportRating
          id={response?._id}
          response={response}
          successIndicator={successIndicator}
          open={setShowEditRating}
        />
      </Modal>
    </div>
  );
}

const Rating = styled.div`
  cursor: pointer;
  transition: all 120ms;

  :hover {
    color: ${({ theme }) => theme.colors.accent.blue};
  }
`;
