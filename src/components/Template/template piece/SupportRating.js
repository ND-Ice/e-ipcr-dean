import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FiPlus } from "react-icons/fi";

import { AddSupportRating, TemplateIcon } from "..";
import { setTargetIndicator } from "../../../store/response";

export default function SupportRating({
  supportFunction,
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
                funcId: supportFunction?.id,
                indicatorId: successIndicator?.id,
              })
            );
            return setShowAddRating(true);
          }}
        />
      )}
      <Modal show={showAddRating} onHide={() => setShowAddRating(false)}>
        <AddSupportRating response={response} open={setShowAddRating} />
      </Modal>
    </div>
  );
}
