import * as Actions from 'store/actions';
const initialState = {
  name: '',
  data:[],
  loading:false,
  filtering:false
}

const form = (state = initialState, action) => {
  switch (action.type) {

    case Actions.SET_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }

    case Actions.SET_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }

    case Actions.SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case Actions.SET_FILTERING: {
      return {
        ...state,
        filtering: action.payload,
      };
    }

    default: return state;
  }
};

export default form;
