import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Table } from "react-bootstrap";

import { getTemplate, setTargetIndicator } from "../store/template";
import {
  AddCoreFunctions,
  AddSupportFunctions,
  EditCoreSuccessIndicator,
  EditSupportSuccessIndicator,
} from "../components/Template";

import {
  CoreFunction,
  FunctionHeader,
  SupportFunction,
  SuccessIndicator,
  Confirmation,
} from "../components/Template/template piece";

import Logo from "../image/Logo.png";

export default function CreateTemplate() {
  const dispatch = useDispatch();
  const [showAddCoreFunction, setShowAddCoreFunction] = useState(false);
  const [showAddSupportFunction, setShowAddSupportFunction] = useState(false);
  const { coreFunctions, supportFunctions } = useSelector(getTemplate);
  const [showEditCoreSuccessIndicator, setShowEditCoreSuccessIndicator] =
    useState(false);
  const [showEditSupportSuccessIndicator, setShowEditSupportSuccessIndicator] =
    useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAddCoreFunction = () => setShowAddCoreFunction(true);
  const handleAddSupportFunction = () => setShowAddSupportFunction(true);
  const handleEditCoreSuccessIndicator = (funcId, indicatorId) => {
    setShowEditCoreSuccessIndicator(true);
    return dispatch(setTargetIndicator({ funcId, indicatorId }));
  };
  const handleEditSupportSuccessIndicator = (funcId, indicatorId) => {
    setShowEditSupportSuccessIndicator(true);
    return dispatch(setTargetIndicator({ funcId, indicatorId }));
  };

  return (
    <Container>
      <Header>
        <LogoImage src={Logo} />
        <div className="text-center">
          <i>Republic of the Philippines</i>
          <h4 className="m-0">
            EULOGIO “AMANG” RODRIGUEZ INSTITUTE OF SCIENCE AND TECHNOLOGY
          </h4>
          <i>Nagtahan, Sampaloc, Manila</i>
        </div>
      </Header>
      <Table bordered>
        <tbody>
          {/* heading */}
          <tr className="text-center fw-bold">
            <td colSpan={2}>INDIVIDUAL PERFORMANCE COMMITMENT REVIEW</td>
          </tr>
          <tr className="text-center">
            <td className="fw-bold">Statement of Functions</td>
            <td className="fw-bold">Success Indicators (Target Measure)</td>
          </tr>
          {/* =============== Core Functions ================ */}
          <tr>
            <td colSpan={2} className="fw-bold">
              <FunctionHeader
                title="Core Functions"
                percentage={90}
                onAdd={handleAddCoreFunction}
              />
            </td>
          </tr>
          {coreFunctions?.map((cf) => (
            <tr key={cf?._id}>
              <td>
                <CoreFunction coreFunction={cf} />
              </td>
              <td>
                <ul>
                  {cf?.successIndicators?.map((succ) => (
                    <SuccessIndicator
                      key={succ?.id}
                      succ={succ}
                      onEdit={() =>
                        handleEditCoreSuccessIndicator(cf?.id, succ?.id)
                      }
                    />
                  ))}
                </ul>
              </td>
            </tr>
          ))}
          {/* =================== divider ================== */}
          <tr>
            <td colSpan={2} className="bg-warning"></td>
          </tr>
          {/* ============= Support Functions ============= */}
          <tr>
            <td colSpan={2} className="fw-bold">
              <FunctionHeader
                title="Support Functions"
                percentage={10}
                onAdd={handleAddSupportFunction}
              />
            </td>
          </tr>
          {supportFunctions?.map((sf) => (
            <tr key={sf?._id}>
              <td>
                <SupportFunction supportFunction={sf} />
              </td>
              <td>
                <ul>
                  {sf?.successIndicators?.map((succ) => (
                    <SuccessIndicator
                      key={succ?.id}
                      succ={succ}
                      onEdit={() =>
                        handleEditSupportSuccessIndicator(sf?.id, succ?.id)
                      }
                    />
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        variant="outline-primary"
        onClick={() => setShowConfirmation(true)}
      >
        Generate
      </Button>

      {/* ============================ modals ============================= */}
      {/* Core Functions Modal */}
      <Modal
        show={showAddCoreFunction}
        onHide={() => setShowAddCoreFunction(false)}
      >
        <AddCoreFunctions open={setShowAddCoreFunction} />
      </Modal>
      <Modal
        show={showEditCoreSuccessIndicator}
        onHide={() => setShowEditCoreSuccessIndicator(false)}
      >
        <EditCoreSuccessIndicator open={setShowEditCoreSuccessIndicator} />
      </Modal>

      {/* =============================== Support Functions Modal =============================== */}
      <Modal
        show={showAddSupportFunction}
        onHide={() => setShowAddSupportFunction(false)}
      >
        <AddSupportFunctions open={setShowAddSupportFunction} />
      </Modal>
      <Modal
        show={showEditSupportSuccessIndicator}
        onHide={() => setShowEditSupportSuccessIndicator(false)}
      >
        <EditSupportSuccessIndicator
          open={setShowEditSupportSuccessIndicator}
        />
      </Modal>
      {/* ====================== confirmation ======================= */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Confirmation open={setShowConfirmation} />
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;

const LogoImage = styled.img`
  width: 80px;
  height: 80px;
  position: relative;
  left: -2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;
