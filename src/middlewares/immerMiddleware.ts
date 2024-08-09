import { produce } from "immer";

import { State } from "../types";

import { Middleware, Action } from "../types";

export const immerMiddleware: Middleware<State> =
  ({ dispatch, getState }) =>
  (next) =>
  (action: Action) => {
    const state = getState();

    const nextState = produce(state, (draft: State) => {
      switch (action.type) {
        case "UPDATE_DEEP":
          draft.nested.deep.value = action.payload;
          break;
        // Handle other cases if necessary
      }
    });

    dispatch({ type: "UPDATE_DEEP", payload: nextState.nested.deep.value });
    next(action); // Continue with other middlewares or actions
  };
