import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FiPlus } from "react-icons/fi";

import { AddCoreRating, TemplateIcon } from "..";
import { setTargetIndicator } from "../../../store/response";

export default function CoreRating({
  coreFunction,
  successIndicator,
  response,
  textProperty,
}) {
  const dispatch = useDispatch();
  const [showAddRating, setShowAddRating] = useState(false);
  return (
    <div>
      {successIndicator?.actualAccomplishments?.rating?.[textProperty] || (
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
      <Modal show={showAddRating} onHide={() => setShowAddRating(false)}>
        <AddCoreRating response={response} open={setShowAddRating} />
      </Modal>
    </div>
  );
}
