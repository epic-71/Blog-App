import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import rootReducer from "./RootReducer";
import { persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

const persistor = persistStore(store);

export { store, persistor };
