import {
  GET_BACKLOG,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK,
  DELETE_PROJECT,
  GET_ERRORS,
} from '../actions/types';
import axios from 'axios';

export const createProjectTask = (projectTask, history, id) => async (
  dispatch
) => {
  try {
    const res = await axios.post(`/api/backlog/${id}`, projectTask);
    console.log('trying to transfer');
    history.push(`/projectBoard/${id}`);
    dispatch({
      type: GET_ERRORS,
      test: {},
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      test: err.response.data,
    });
  }
};
