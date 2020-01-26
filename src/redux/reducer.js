const initialState = {
  editItem: {},
  data: [],
};

const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "ADD_DATA":
      newState = {
        ...state,
        data: action.data
      };
      break;
    case "EDIT_DATA":
      const { rowIndex, columnId, value } = action.editItem;
      const editData = state.data.map((item, index) => {
        if (index === rowIndex) {
          return {
            ...state.data[rowIndex],
            [columnId]: value,
          }
        }
        return item;
      })
      newState = {
        ...state,
        data: editData
      }
      break;
    default:
      newState = state;
      break;
  }
  return newState;
}
export default reducer;