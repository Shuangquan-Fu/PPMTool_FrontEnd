import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import projectReducer from './projectReducer';
import backlogReducer from './backlogReducer';
import securityReducer from './securityReducer';

export default combineReducers({
  error: errorReducer,
  project: projectReducer,
  project_task: backlogReducer,
  security: securityReducer,
});
