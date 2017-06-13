import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import facebookUsersReducer from './facebookUsersReducer';

export default combineReducers({
  user: facebookUsersReducer,
  routing: routerReducer
});
