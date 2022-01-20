import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "react-bootstrap";
import { FiX } from "react-icons/fi";

import { getEvaluationResponses } from "../store/response";
import { getRemarks, getRemarksColor } from "../utils";
import { ConfirmSubmission } from "../components/Template";
import {
  CoreHeader,
  TableHeader,
  Accomplishment,
  FunctionDetails,
  FunctionSuccessIndicator,
  CoreRating,
  SupportRating,
  CoreRemarks,
  SupportRemarks,
  Comments,
  Recommendations,
  Respondent,
} from "../components/Template/template piece";
import Signatories from "../components/Signatories";

export default function Response({ match, history }) {
  const id = match.params.id;
  const evaluationResponses = useSelector(getEvaluationResponses);
  const [showConfirmSubmission, setShowConfirmSubmission] = useState(false);

  const response = evaluationResponses?.list?.filter(
    (response) => response._id === id
  )[0];

  const coreFinalRating = response?.coreFunctions?.map((cf) => {
    const ave = cf?.rawAverage?.reduce((acc, curr) => acc + curr, 0);
    return (ave / cf?.successIndicators?.length) * (cf?.percentage / 100);
  });

  const supportFinalRating = response?.supportFunctions?.map((sf) => {
    const ave = sf?.rawAverage?.reduce((acc, curr) => acc + curr, 0);
    return (ave / sf?.successIndicators?.length) * (sf?.percentage / 100);
  });

  const finalRating = [...coreFinalRating, ...supportFinalRating]
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);

  const coreFuncPercentage = response?.coreFunctions.reduce(
    (acc, curr) => acc + parseInt(curr?.percentage),
    0
  );
  const supportFuncPercentage = response?.supportFunctions.reduce(
    (acc, curr) => acc + parseInt(curr?.percentage),
    0
  );

  return (
    <AppContainer>
      <div className="d-flex align-items-center justify-content-end">
        <IconContainer onClick={() => history.goBack()}>
          <FiX />
        </IconContainer>
      </div>
      <TableHeader />
      <Table bordered>
        <tbody>
          <tr>
            <td className="text-center fw-bold" colSpan={8}>
              INDIVIDUAL PERFORMANCE COMMITMENT REVIEW
            </td>
          </tr>
          <Respondent response={response} />
          <CoreHeader />

          {/* ============================== core functions =============================== */}

          {response?.coreFunctions?.map((cf) => (
            <React.Fragment key={cf?.id}>
              <tr>
                <td colSpan={8} className="align-middle">
                  <FunctionDetails
                    title={cf?.title}
                    description={cf?.description}
                    percentage={cf?.percentage}
                  />
                </td>
              </tr>
              {cf?.successIndicators?.map((succ) => (
                <tr key={succ?.id}>
                  <td></td>
                  <td className="align-middle">
                    <FunctionSuccessIndicator
                      title={succ?.title}
                      description={succ?.description}
                    />
                  </td>
                  <Accomplishment
                    title={succ?.actualAccomplishments?.title}
                    description={succ?.actualAccomplishments?.description}
                  />
                  {/* ratings */}
                  <td className="text-center align-middle">
                    <CoreRating
                      textProperty={"quality"}
                      response={response}
                      coreFunction={cf}
                      successIndicator={succ}
                    />
                  </td>
                  <td className="text-center align-middle">
                    <CoreRating
                      textProperty={"timeliness"}
                      response={response}
                      coreFunction={cf}
                      successIndicator={succ}
                    />
                  </td>
                  <td className="text-center align-middle">
                    <CoreRating
                      textProperty={"efficiency"}
                      response={response}
                      coreFunction={cf}
                      successIndicator={succ}
                    />
                  </td>
                  <td className="text-center align-middle">
                    {succ?.actualAccomplishments?.rating?.average.toFixed(2)}
                  </td>
                  <td className="align-middle">
                    <CoreRemarks
                      coreFunction={cf}
                      successIndicator={succ}
                      response={response}
                    />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}

          {/* ========================== support functions ========================= */}

          <tr>
            <td
              colSpan={8}
              className="bg-warning text-white fw-bold text-uppercase"
            >
              Support Functions - 90%
            </td>
          </tr>
          {response?.supportFunctions?.map((sf) => (
            <React.Fragment key={sf?.id}>
              <tr>
                <td colSpan={8}>
                  <FunctionDetails
                    title={sf?.title}
                    description={sf?.description}
                    percentage={sf?.percentage}
                  />
                </td>
              </tr>
              {sf?.successIndicators?.map((succ) => (
                <tr key={succ?.id}>
                  <td></td>
                  <td className="align-middle">
                    <FunctionSuccessIndicator
                      title={succ?.title}
                      description={succ?.description}
                    />
                  </td>
                  <Accomplishment
                    title={succ?.actualAccomplishments?.title}
                    description={succ?.actualAccomplishments?.description}
                  />
                  {/* ratings */}
                  <td className="text-center align-middle">
                    <SupportRating
                      textProperty={"quality"}
                      response={response}
                      supportFunction={sf}
                      successIndicator={succ}
                    />
                  </td>
                  <td className="text-center align-middle">
                    <SupportRating
                      textProperty={"quality"}
                      response={response}
                      supportFunction={sf}
                      successIndicator={succ}
                    />
                  </td>
                  <td className="text-center align-middle">
                    <SupportRating
                      textProperty={"quality"}
                      response={response}
                      supportFunction={sf}
                      successIndicator={succ}
                    />
                  </td>
                  <td className="text-center align-middle">
                    {succ?.actualAccomplishments?.rating?.average.toFixed(2)}
                  </td>
                  <td className="align-middle">
                    <SupportRemarks
                      supportFunction={sf}
                      successIndicator={succ}
                      response={response}
                    />
                  </td>
                </tr>
              ))}{" "}
            </React.Fragment>
          ))}
          <tr>
            <td colSpan={8}></td>
          </tr>

          {/* ========================= summary of ratings =============================== */}
          <tr className="fw-bold text-uppercase">
            <td colSpan={3}>Summary of Ratings</td>
            <td className="text-center">Average</td>
            <td colSpan={2} className="text-center">
              Percentage
            </td>
            <td colSpan={2} className="text-center">
              Score
            </td>
          </tr>

          {/* core functions */}
          <tr className="bg-warning text-white fw-bold">
            <td colSpan={8}>
              <h6 className="m-0 fw-bold text-uppercase">
                Core Functions (90%){" "}
              </h6>
            </td>
          </tr>
          {response?.coreFunctions?.map((cf) => (
            <tr key={cf?.id}>
              <td colSpan={3}>{cf?.title}</td>
              <td></td>
              <td colSpan={2} className="text-center">
                {cf?.percentage}%
              </td>
              <td colSpan={2} className="text-center">
                {(
                  (cf?.rawAverage?.reduce((acc, curr) => acc + curr, 0) /
                    cf?.rawAverage?.length) *
                  (cf?.percentage / 100)
                ).toFixed(2)}
              </td>
            </tr>
          ))}
          {/* support functions */}
          <tr className="bg-warning text-white">
            <td colSpan={8}>
              <h6 className="m-0 fw-bold text-uppercase">
                Support Functions (10%)
              </h6>
            </td>
          </tr>
          {response?.supportFunctions?.map((sf) => (
            <tr key={sf?.id}>
              <td colSpan={3}>{sf?.title}</td>
              <td></td>
              <td colSpan={2} className="text-center">
                {sf?.percentage}%
              </td>
              <td colSpan={2} className="text-center">
                {(
                  (sf?.rawAverage?.reduce((acc, curr) => acc + curr, 0) /
                    sf?.rawAverage?.length) *
                  (sf?.percentage / 100)
                ).toFixed(2)}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={8}></td>
          </tr>
          <tr className="fw-bold">
            <td colSpan={3}>
              <h6 className="m-0">Final Average Rating</h6>
            </td>
            <td className="text-center"></td>
            <td colSpan={2} className="text-center">
              {coreFuncPercentage + supportFuncPercentage}%
            </td>
            <td colSpan={2} className="text-center">
              {finalRating}
            </td>
          </tr>
          <tr className="fw-bold">
            <td colSpan={3}>
              <h6 className="m-0">Final Adjectival Rating </h6>
            </td>
            <td></td>
            <td className="p-0" colSpan={4}>
              <AdjectivalRating rating={finalRating}>
                <h6 className="m-0 text-uppercase fw-bold">
                  {getRemarks(finalRating)}
                </h6>
              </AdjectivalRating>
            </td>
          </tr>
          <tr>
            <td colSpan={8}></td>
          </tr>
          {/* ========================== comments and recommendations ========================= */}
          <tr className="bg-warning text-white fw-bold text-uppercase">
            <td colSpan={8}>comments and recommendations</td>
          </tr>
          <tr>
            <td colSpan={8}>
              <Comments response={response} />
            </td>
          </tr>
          <tr>
            <td colSpan={8}>
              <Recommendations response={response} />
            </td>
          </tr>
          {/* ========================== divider ======================= */}
          <tr>
            <td colSpan={8}></td>
          </tr>
          {/* ======================== signatories ======================== */}
          <tr>
            <td colSpan={8}>
              <Signatories response={response} />
            </td>
          </tr>
        </tbody>
      </Table>

      {/* ======================== attachments ======================== */}
      {response?.attachments?.length !== 0 && (
        <AttachmentsContainer>
          <h5 className="mb-4">Attachments</h5>
          {response?.attachments?.map((att) => (
            <Attachments
              key={att?.lastDateModified}
              onClick={() =>
                window.open(`http://localhost:5000/uploads/${att?.filename}`)
              }
            >
              {att?.filename}
            </Attachments>
          ))}
        </AttachmentsContainer>
      )}

      <Button
        variant="outline-primary"
        className="mt-2"
        onClick={() => setShowConfirmSubmission(true)}
      >
        Approve
      </Button>

      <Modal
        show={showConfirmSubmission}
        onHide={() => setShowConfirmSubmission(false)}
      >
        <ConfirmSubmission
          response={response}
          open={setShowConfirmSubmission}
        />
      </Modal>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding: 0.5rem;
  padding: 2rem;
`;

const AdjectivalRating = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ rating }) => getRemarksColor(rating)};
  padding: 0.5rem;
`;

const AttachmentsContainer = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const Attachments = styled.div`
  padding: 1rem;
  margin: 0.2rem 0;
  transition: all 0.3s;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.colors.secondary};

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  display: grid;
  cursor: pointer;
  place-items: center;
  transition: all 0.3s;
  border-radius: 5px;
  font-size: 1.5rem;

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;
