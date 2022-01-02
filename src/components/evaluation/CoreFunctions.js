import React, { useState } from "react";
import styled from "styled-components";
import { Button, Table } from "react-bootstrap";

import { CustomModal } from "..";
import RateCoreFunctions from "./RateCoreFunctions";
import { useDispatch } from "react-redux";
import { setTargetIndicator } from "../../store/response";
import { getRemarks } from "../../utils";

export default function CoreFunctions({ response }) {
  const { coreFunctions } = response;
  const dispatch = useDispatch();

  const [showRateCoreFunctions, setShowRateCoreFunctions] = useState(false);
  return (
    <Container>
      <Table bordered>
        <tbody>
          <tr>
            <td>
              <h5 className="m-0">Statement of Functions </h5>
            </td>
            <td>
              <h5 className="m-0">Success Indicator</h5>
            </td>
            <td>
              <h5 className="m-0">Actual Accomplishment </h5>
            </td>
            <td>
              <h5 className="m-0">Rating Scale</h5>
            </td>
          </tr>
          <tr>
            <td>
              <h5 className="m-0">Core Functions - 90% </h5>
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
            {/*  */}
          </tr>
          {coreFunctions?.map((coreFunc) => (
            <React.Fragment key={coreFunc?.id}>
              <tr>
                <td>
                  <h6>
                    {coreFunc?.title} ({coreFunc.percentage}%)
                  </h6>
                  {coreFunc?.description && (
                    <Description>{coreFunc?.description}</Description>
                  )}
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {coreFunc?.successIndicators?.map((successIndicator) => (
                <tr key={successIndicator?.id}>
                  <td></td>
                  <td>{successIndicator?.title}</td>
                  <td>{successIndicator?.actualAccomplishments?.title} </td>
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
                              funcId: coreFunc?.id,
                              indicatorId: successIndicator?.id,
                            })
                          );
                          return setShowRateCoreFunctions(true);
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
        heading="Rate Accomplishment"
        show={showRateCoreFunctions}
        onHide={() => setShowRateCoreFunctions(false)}
      >
        <RateCoreFunctions
          response={response}
          open={setShowRateCoreFunctions}
        />
      </CustomModal>
    </Container>
  );
}

const Container = styled.div``;

const Description = styled.div`
  max-width: 30ch;
`;
