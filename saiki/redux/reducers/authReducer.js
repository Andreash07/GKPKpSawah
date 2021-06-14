import {
  SET_MEMBER,
} from "../constants/action-types"

const initialState = {
    dataMember: '',
  };
  
  const authReducer = (state = initialState, action) => {
      switch (action.type) {
          case SET_MEMBER:{
              return {
                  ...state,
                  dataMember: action.payload,
                }
          }
          default:{
              return state;
          }
      }
  };
  
  export default authReducer;