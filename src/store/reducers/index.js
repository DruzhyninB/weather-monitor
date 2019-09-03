import {combineReducers} from 'redux';
import {reducer as toastrReducer} from 'ultumus-react-redux-toastr'

import form from './form.reducers';

const rootReducer = combineReducers({
    form,
    toastr:toastrReducer
});

export default rootReducer;