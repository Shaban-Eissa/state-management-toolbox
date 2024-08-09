import { useSyncExternalStore } from "react";

import { createStore } from "../store/store";

import { Action, Middleware, Reducer } from "../types";

export function createUseStore<State>(
  initialState: State,
  reducer: Reducer<State>,
  middlewares: Middleware<State>[]
) {
  const store = createStore({ initialState, reducer, middleware: middlewares });
  return () =>
    [
      useSyncExternalStore(store.subscribe, store.getSnapshot),
      store.setState,
      store.dispatch,
    ] as const;
}
