import React, { useState } from "react";
import styled from "styled-components";
import { Button, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { CustomModal } from "..";
import { setTargetIndicator } from "../../store/response";
import RateSupportFunctions from "./RateSupportFunctions";
import { getRemarks } from "../../utils";

export default function Supportfunctions({ response }) {
  const dispatch = useDispatch();
  const { supportFunctions } = response;
  const [showRateSupportFunctions, setShowRateSupportFunctions] =
    useState(false);

  return (
    <Container>
      <Table bordered>
        <tbody>
          <tr>
            <td>
              <h5 className="m-0">Statement of Functions </h5>
            </td>
            <td>
              <h5 className="m-0">Success Indicators (Target Measure)</h5>
            </td>
            <td>
              <h5 className="m-0">Actual Accomplishments</h5>
            </td>
            <td>
              <h5 className="m-0">Rating Scale</h5>
            </td>
          </tr>
          <tr>
            <td>
              <h6> Support Functions - 10% </h6>
            </td>
            <td></td>
            <td></td>
            <td>
              <Table bordered>
                <tbody>
                  <tr>
                    <td className="p-4">Q</td>
                    <td className="p-4">T</td>
                    <td className="p-4">E</td>
                    <td className="p-4">Average</td>
                    <td className="p-4">Remarks</td>
                  </tr>
                </tbody>
              </Table>
            </td>
          </tr>
          {supportFunctions?.map((suppFunc) => (
            <React.Fragment key={suppFunc?.id}>
              <tr>
                <td>
                  <h6>
                    {suppFunc?.title} ({suppFunc.percentage}%)
                  </h6>
                  {suppFunc?.description && (
                    <Description>{suppFunc?.description}</Description>
                  )}
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {suppFunc?.successIndicators?.map((successIndicator) => (
                <tr key={successIndicator?.id}>
                  <td></td>
                  <td>
                    <Description>{successIndicator?.title} </Description>
                  </td>
                  <td>{successIndicator?.actualAccomplishments?.title}</td>
                  <td>
                    {successIndicator?.actualAccomplishments?.rating
                      ?.quality ? (
                      <Table bordered>
                        <tbody>
                          <tr>
                            <td className="p-4">Q</td>
                            <td className="p-4">T</td>
                            <td className="p-4">E</td>
                            <td className="p-4">Average</td>
                            <td className="p-4">Remarks</td>
                          </tr>
                          <tr>
                            <td className="p-4">
                              {
                                successIndicator?.actualAccomplishments?.rating
                                  ?.quality
                              }
                            </td>
                            <td className="p-4">
                              {
                                successIndicator?.actualAccomplishments?.rating
                                  ?.timeliness
                              }
                            </td>
                            <td className="p-4">
                              {
                                successIndicator?.actualAccomplishments?.rating
                                  ?.efficiency
                              }
                            </td>
                            <td className="p-4">
                              {successIndicator?.actualAccomplishments?.rating?.average?.toFixed(
                                2
                              )}
                            </td>
                            <td className="p-4">
                              {getRemarks(
                                successIndicator?.actualAccomplishments?.rating
                                  ?.average
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    ) : (
                      <Button
                        onClick={() => {
                          dispatch(
                            setTargetIndicator({
                              responseId: response?._id,
                              funcId: suppFunc?.id,
                              indicatorId: successIndicator?.id,
                            })
                          );
                          return setShowRateSupportFunctions(true);
                        }}
                      >
                        Rate
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      <CustomModal
        heading="Rate Support Functions"
        show={showRateSupportFunctions}
        onHide={() => setShowRateSupportFunctions(false)}
      >
        <RateSupportFunctions
          response={response}
          open={setShowRateSupportFunctions}
        />
      </CustomModal>
    </Container>
  );
}

const Container = styled.div``;
const Description = styled.div`
  max-width: 30ch;
`;
