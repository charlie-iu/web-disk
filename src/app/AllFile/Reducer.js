import _ from "lodash";

const Reducer = (state, action) => {
  const { type, payload } = action;
  const nextState = _.cloneDeep(state);
  switch (type) {
    case "UPDATE_DATA_SOURCE":
      nextState.dataSource = payload;
      return nextState;
    case "UPDATE_TOTAL":
      nextState.total = payload;
      return nextState;
    case "UPDATE_SELECTEDROWKEYS":
      nextState.selectedRowKeys = payload;
      return nextState;
    case "UPDATE_DATA":
      return {
        ...state,
        dataSource: payload.list,
        total: payload.total,
        pageSize: payload.pageSize,
        currentPage: payload.pageNum,
      };
    case "UPDATE_CURRENT_PAGE":
      nextState.currentPage = payload;
      return nextState;
    case "UPDATE_PAGE_SIZE":
      nextState.pageSize = payload;
      return nextState;
    case "UPDATE_MODAL_ACTION":
      nextState.modalAction = payload;
      return nextState;
    case "UPDATE_MODAL_DATA":
      nextState.modalData = payload;
      return nextState;
    case "UPDATE_SHOW_MODAL":
      nextState.showModal = payload;
      return nextState;
    case "UPDATE_FORM_VALUE":
      nextState[payload.name] = payload.value;
      return nextState;
    default:
      return nextState;
  }
};

export default Reducer;
