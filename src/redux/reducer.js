const initialState = {
  data: [],
  test: 1,
};

const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "ADD_DATA":
      newState = {
        ...state,
        data: action.data,
      };
      break;
    default:
      newState = state;
      break;
  }
  return newState;
}
export default reducer;