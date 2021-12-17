import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);
export default function () {
  let store = configureStore({ reducer: persistedReducer });
  let persistor = persistStore(store);
  return { store, persistor };
}
