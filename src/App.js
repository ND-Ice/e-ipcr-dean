import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  ChangePassword,
  Dashboard,
  LoginPage,
  NeedDirectorApproval,
  NeedHEADApproval,
  NeedHrApproval,
  NeedPMTApproval,
  PasswordRecoveryPage,
  RegisterPage,
  Response,
} from "./pages";

import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { ProtectedRoute, ScrollToTop, ToApproveByPMT } from "./components";

const { store, persistor } = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <ScrollToTop />
      <PersistGate loading="Loading..." persistor={persistor}>
        <Switch>
          <Route path="/register" component={RegisterPage} />
          <Route path="/forgot-password" component={PasswordRecoveryPage} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route path="/change-password/:id" component={ChangePassword} />
          <ProtectedRoute path="/response/:id" component={Response} />
          <ProtectedRoute
            path="/to-approve-by-director/:id"
            component={NeedDirectorApproval}
          />
          <ProtectedRoute
            path="/to-approve-by-PMT/:id"
            component={NeedPMTApproval}
          />
          <ProtectedRoute
            path="/to-approve-by-HEAD/:id"
            component={NeedHEADApproval}
          />
          <ProtectedRoute
            path="/to-approve-by-HR/:id"
            component={NeedHrApproval}
          />
          <Route path="/" component={LoginPage} />
        </Switch>
      </PersistGate>
    </Provider>
  );
}
