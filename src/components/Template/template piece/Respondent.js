import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { getEvaluations } from "../../../store/evaluations";

export default function Respondent({ response }) {
  const evaluation = useSelector(getEvaluations);
  const { preview } = evaluation;
  const { user } = response;

  return (
    <tr>
      <td colSpan={8}>
        <Content>
          <header className="d-flex justify-content-center mb-3">
            <Title>
              I,{" "}
              <strong>
                {user?.name?.firstName} {user?.name?.lastName},
              </strong>
              commit to deliver and agree to be rated on the attainment of the
              following targets in accordance with the indicated measures for
              the period
              <strong> January to December {preview?.targetYear}.</strong>
            </Title>
          </header>

          <div className="d-flex align-items-center justify-content-end">
            <Signature>
              {response?.signatures?.userSignature && (
                <img src={response?.signatures?.userSignature} />
              )}
              {user?.name?.firstName}
              {user?.name?.lastName}
            </Signature>
            <DateSubmitted>
              {moment(parseInt(response?.dateSubmitted)).format("LL")}
            </DateSubmitted>
          </div>
        </Content>
      </td>
    </tr>
  );
}

const Content = styled.div`
  padding: 2rem 5rem;
`;

const Title = styled.p`
  max-width: 100ch;
`;

const DateSubmitted = styled.div`
  padding: 2px 5px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.black};

  position: relative;

  ::before {
    content: "Date";
    position: absolute;
    top: calc(100% + 5px);
    width: 100%;
    text-align: center;
    font-weight: bold;
  }
`;

const Signature = styled.div`
  padding: 2px 5px;
  width: 200px;
  margin-right: 5rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.black};
  position: relative;
  text-align: center;

  > img {
    object-fit: cover;
    position: absolute;
    height: 70px;
    top: -2rem;
    left: 50%;
    transform: translateX(-50%);
  }

  ::before {
    content: "Signature";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: calc(100% + 5px);
    font-weight: bold;
  }
`;
