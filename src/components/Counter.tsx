import React from "react";

import "../index.css";

import { logger } from "../middlewares/loggerMiddleware";
import { immerMiddleware } from "../middlewares/immerMiddleware";
import { persistenceMiddleware } from "../middlewares/persistenceMiddleware";

import { createUseStore } from "../hooks/useCustomStore";

import { initialState, reducer } from "../reducers/countReducer";

// Create the custom hook with initial state, reducer, and middleware
const useStore = createUseStore(initialState, reducer, [
  logger,
  immerMiddleware,
  persistenceMiddleware("app-state"), // Adding persistence middleware
]);

export const Counter = () => {
  const [state, setState, dispatch] = useStore();

  const increment = () => {
    dispatch({ type: "INCREMENT" });
  };

  const decrement = () => {
    dispatch({ type: "DECREMENT" });
  };

  const updateDeepValue = () => {
    dispatch({ type: "UPDATE_DEEP", payload: state.nested.deep.value + 1 });
  };

  const exportState = () => {
    const json = JSON.stringify(state);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "state.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        try {
          const importedState = JSON.parse(result);
          dispatch({ type: "IMPORT_STATE", payload: importedState });
        } catch (error) {
          console.error("Failed to parse JSON:", error);
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="card">
      <p className="state-label">Count: {state.count}</p>
      <p className="state-label">
        Nested Deep Value: {state.nested.deep.value}
      </p>
      <div className="content">
        <div className="buttons">
          <button className="button" onClick={increment}>
            Increment
          </button>
          <button className="button" onClick={decrement}>
            Decrement
          </button>
          <button className="button" onClick={updateDeepValue}>
            Update Nested Deep Value
          </button>
          <button className="button" onClick={exportState}>
            Export State
          </button>
        </div>
        <input
          className="input"
          type="file"
          placeholder="Import State JSON File"
          accept="application/json"
          onChange={importState}
        />
      </div>
    </div>
  );
};
