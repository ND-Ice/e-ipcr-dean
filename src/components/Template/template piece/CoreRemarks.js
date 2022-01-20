import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FiPlus } from "react-icons/fi";
import styled from "styled-components";

import { AddCoreRemarks, EditCoreRemarks, TemplateIcon } from "..";
import { setTargetIndicator } from "../../../store/response";

export default function CoreRemarks({
  coreFunction,
  successIndicator,
  response,
}) {
  const dispatch = useDispatch();
  const [showAddRemarks, setShowAddRemarks] = useState(false);
  const [showEditRemarks, setShowEditRemarks] = useState(false);
  return (
    <div>
      {successIndicator?.remarks ? (
        <Remarks
          className="m-0"
          onClick={() => {
            dispatch(
              setTargetIndicator({
                responseId: response?._id,
                funcId: coreFunction?.id,
                indicatorId: successIndicator?.id,
              })
            );
            return setShowEditRemarks(true);
          }}
        >
          {successIndicator?.remarks}
        </Remarks>
      ) : (
        <div className="text-center">
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
              return setShowAddRemarks(true);
            }}
          />
        </div>
      )}

      <Modal show={showAddRemarks} onHide={() => setShowAddRemarks(false)}>
        <AddCoreRemarks response={response} open={setShowAddRemarks} />
      </Modal>

      <Modal show={showEditRemarks} onHide={() => setShowEditRemarks(false)}>
        <EditCoreRemarks response={response} open={setShowEditRemarks} />
      </Modal>
    </div>
  );
}

const Remarks = styled.p`
  cursor: pointer;
  transition: all 120ms;
  max-width: 30ch;

  :hover {
    color: ${({ theme }) => theme.colors.accent.blue};
  }
`;
