import { Middleware } from "../types";

export const logger: Middleware<any> =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    console.log("Dispatching action:", action);
    const result = next(action);
    console.log("Next state:", getState());
    return result;
  };
