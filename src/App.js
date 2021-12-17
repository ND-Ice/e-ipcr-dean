import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  ActivateAccount,
  ChangePassword,
  Dashboard,
  LoginPage,
  PasswordRecoveryPage,
} from "./pages";

import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { ProtectedRoute, ScrollToTop } from "./components";

const { store, persistor } = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <ScrollToTop />
      <PersistGate loading="Loading..." persistor={persistor}>
        <Switch>
          <Route path="/activate-account" component={ActivateAccount} />
          <Route path="/forgot-password" component={PasswordRecoveryPage} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route path="/change-password/:id" component={ChangePassword} />
          <Route path="/" component={LoginPage} />
        </Switch>
      </PersistGate>
    </Provider>
  );
}
