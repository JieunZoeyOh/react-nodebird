import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';

// (이전 상태, 액션) => 다음 상태
const rootReducer = combineReducers({
  // HYDRATE를 위해서(서버사이드랜더링을 위해서) inex reducer 추가
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
