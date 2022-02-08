import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FiPlus } from "react-icons/fi";
import styled from "styled-components";

import { AddCoreRemarks, EditCoreRemarks, TemplateIcon } from "..";
import { addCoreSentiment, setTargetIndicator } from "../../../store/response";
import templateApi from "../../../api/template";
import { PulseLoader } from "react-spinners";
import { getSentimentColor } from "../../../utils";

export default function CoreRemarks({
  coreFunction,
  successIndicator,
  response,
}) {
  const dispatch = useDispatch();
  const [showAddRemarks, setShowAddRemarks] = useState(false);
  const [showEditRemarks, setShowEditRemarks] = useState(false);
  const [sentiment, setSentiment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getSentiment();
  }, [successIndicator?.remarks]);

  const getSentiment = async () => {
    if (successIndicator?.remarks?.length !== 0) {
      try {
        setLoading(true);
        const sentiment = await templateApi.analyzeSentiment(
          successIndicator?.remarks
        );
        setLoading(false);
        setSentiment(sentiment.data);

        return dispatch(
          addCoreSentiment({
            currentId: response?._id,
            funcId: coreFunction?.id,
            succId: successIndicator?.id,
            sentiment: sentiment?.data,
          })
        );
      } catch (error) {
        setLoading(false);
        return setErrorMessage(error);
      }
    } else return;
  };

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
          {successIndicator?.remarks}{" "}
          {loading ? (
            <Loader>
              Analyzing <PulseLoader color="#ffffff" size={5} />
            </Loader>
          ) : (
            successIndicator?.remarks && (
              <Sentiment sentiment={sentiment[0]?.classifications[0]?.tag_name}>
                {sentiment[0]?.classifications[0]?.tag_name}{" "}
                {Math.round(sentiment[0]?.classifications[0]?.confidence * 100)}
                %
              </Sentiment>
            )
          )}
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

const Sentiment = styled.span`
  display: inline-block;
  padding: 2px 8px;
  margin-left: 0.5rem;
  font-weight: bold;
  font-size: 12px;
  border-radius: 5px;
  background: ${({ sentiment }) => sentiment && getSentimentColor(sentiment)};
  color: white;
`;

const Loader = styled.div`
  display: inline-flex;
  margin-left: 0.5rem;
  padding: 2px 8px;
  font-weight: bold;
  font-size: 12px;
  border-radius: 5px;
  background: #0064f9;
  color: white;
  align-items: center;
`;
