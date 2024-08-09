import { Action, Reducer, State } from "../types";

// Key used in local storage
const STORAGE_KEY = "app-state";

// Check if there is saved state in local storage
const savedState = localStorage.getItem(STORAGE_KEY);

// Parse the saved state or use the default initial state
export const initialState: State = savedState
  ? JSON.parse(savedState)
  : {
      count: 0,
      nested: {
        deep: {
          value: 0,
        },
      },
    };

export const reducer: Reducer<State> = (state, action) => {
  let newState: State;

  switch (action.type) {
    case "INCREMENT":
      newState = { ...state, count: state.count + 1 };
      break;
    case "DECREMENT":
      newState = { ...state, count: state.count - 1 };
      break;
    case "UPDATE_DEEP":
      newState = {
        ...state,
        nested: {
          deep: {
            value: action.payload,
          },
        },
      };
      break;
    case "IMPORT_STATE":
      newState = {
        ...state,
        ...action.payload, // Spread the imported state properties over the existing state
        nested: {
          ...state.nested,
          ...action.payload.nested, // Ensure nested properties are correctly merged
          deep: {
            ...state.nested.deep,
            ...action.payload.nested?.deep, // Safely merge nested.deep values
          },
        },
      };
      break;
    default:
      newState = state;
  }

  // Save the new state to local storage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));

  return newState;
};
