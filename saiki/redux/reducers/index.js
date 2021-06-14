import { combineReducers } from 'redux';
import authReducer from './authReducer';
//import dataReducer from './dataReducer';
import {DESTROY_SESSION} from '../constants/action-types';

const rootReducer = combineReducers({
  authReducer: authReducer,
  //dataReducer: dataReducer,
});

const appReducer = (state, action) => {
  if(action.type === DESTROY_SESSION){
    state = undefined;
  }
  
  return rootReducer(state, action);
};

export default appReducer;