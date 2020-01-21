
export const useReducer = (state, action) => {
  switch (action.type) {
    case "SET_APPLICATION_DATA":
      return state;
    case "SET_INTERVIEW":
      return state;
    case "SET_DAY":
      return state;
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  } 
}