import { Listener, Store, Action, Reducer, Middleware } from "../types";

export function createStore<State>({
  initialState,
  reducer,
  middleware = [],
}: {
  initialState: State;
  reducer: Reducer<State>;
  middleware?: Middleware<State>[];
}): Store<State> {
  let subscribers: Listener[] = [];
  let state = initialState;

  const notifyStateChanged = () => {
    subscribers.forEach((fn) => fn());
  };

  const rawDispatch = (action: Action) => {
    state = reducer(state, action);
    notifyStateChanged();
  };

  const getState = () => state;

  // Apply middleware chain
  const chain = middleware.map((mw) => mw({ getState, dispatch: rawDispatch }));
  const dispatch: (action: Action) => void = chain.reduceRight(
    (next, mw) => mw(next),
    rawDispatch
  );

  return {
    subscribe(fn: Listener) {
      subscribers.push(fn);
      return () => {
        subscribers = subscribers.filter((listener) => listener !== fn);
      };
    },
    getSnapshot() {
      return state;
    },
    setState(newStateOrUpdater: State | ((state: State) => State)) {
      if (typeof newStateOrUpdater === "function") {
        state = (newStateOrUpdater as (state: State) => State)(state);
      } else {
        state = newStateOrUpdater;
      }
      notifyStateChanged();
    },
    dispatch,
  };
}
