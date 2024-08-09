export type Listener = () => void;

export type State = {
  count: number;
  nested: {
    deep: {
      value: number;
    };
  };
};

export type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "UPDATE_DEEP"; payload: number }
  | { type: "INIT_STATE"; payload: State } // Add this line
  | { type: "IMPORT_STATE"; payload: State };

export type Middleware<State> = (store: {
  dispatch: (action: Action) => void;
  getState: () => State;
}) => (next: (action: Action) => void) => (action: Action) => void;

export type Reducer<State> = (state: State, action: Action) => State;

export interface Store<State> {
  subscribe(fn: Listener): () => void;
  getSnapshot(): State;
  setState(newStateOrUpdater: State | ((state: State) => State)): void;
  dispatch(action: Action): void;
}
