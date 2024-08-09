import { Middleware } from "../types";

export const persistenceMiddleware = <State>(
  key: string
): Middleware<State> => {
  return ({ getState }) =>
    (next) =>
    (action) => {
      // Call the next middleware in the chain
      next(action);

      // After the action is processed, get the current state
      const state = getState();

      // Save the state to localStorage
      try {
        localStorage.setItem(key, JSON.stringify(state));
        console.log("State persisted to localStorage");
      } catch (e) {
        console.error("Failed to save state to localStorage", e);
      }
    };
};
