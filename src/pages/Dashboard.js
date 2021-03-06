import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { SidebarDesktop } from "../components/Sidebar";

import {
  EvaluationPreview,
  Evaluations,
  Faculties,
  FacultyPreview,
  FacultySearch,
  OngoingEvaluations,
  PastEvaluations,
  FilteredEvaluationResult,
  FilteredSentimentResult,
  Me,
  Template,
  CreateTemplate,
  AllResponse,
  LateResponses,
  ToApproved,
  Approved,
} from ".";
import { useSelector } from "react-redux";
import { getUser } from "../store/user";

export default function Dashboard() {
  const user = useSelector(getUser);
  return (
    <>
      <Navbar user={user} />
      <AppContainer>
        <SidebarDesktop />
        <Switch>
          <Route path="/dashboard/me" component={Me} />
          <Route path="/dashboard/faculties/search" component={FacultySearch} />
          <Route path="/dashboard/faculties/:id" component={FacultyPreview} />
          <Route path="/dashboard/faculties" component={Faculties} />
          <Route
            path="/dashboard/ongoing-evaluations"
            component={OngoingEvaluations}
          />
          <Route
            path="/dashboard/past-evaluations"
            component={PastEvaluations}
          />
          <Route
            path="/dashboard/evaluations/result/:remarks"
            component={FilteredEvaluationResult}
          />
          <Route
            path="/dashboard/evaluations/sentiment/:result"
            component={FilteredSentimentResult}
          />
          <Route path="/dashboard/template" component={Template} />
          <Route path="/dashboard/create-template" component={CreateTemplate} />
          <Route
            path="/dashboard/evaluations/:id"
            component={EvaluationPreview}
          />
          <Route path="/dashboard/responses" component={AllResponse} />
          <Route path="/dashboard/late-responses" component={LateResponses} />
          <Route path="/dashboard/to-approved" component={ToApproved} />
          <Route path="/dashboard/approved" component={Approved} />
          <Route path="/dashboard" component={Evaluations} />
        </Switch>
      </AppContainer>
    </>
  );
}

const AppContainer = styled.div`
  display: grid;
  padding: 0.5rem;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 4fr;
    padding: 1rem 5rem;
    gap: 1rem;
  }
`;
