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

export const getProjectTask = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/backlog/${id}`);
    console.log(res.data);
    dispatch({
      type: GET_BACKLOG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      test: err.response.data,
    });
  }
};

export const getProjectById = (blogId, SequenceId, history) => async (
  dispatch
) => {
  try {
    const res = await axios.get(`/api/backlog/${blogId}/${SequenceId}`);
    dispatch({
      type: GET_PROJECT_TASK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      test: err.response.data,
    });
  }
};

export const updateProjectTask = (
  backlog_id,
  pt_id,
  project_task,
  history
) => async (dispatch) => {
  try {
    await axios.patch(`/api/backlog/${backlog_id}/${pt_id}`, project_task);
    history.push(`/projectBoard/${backlog_id}`);
    dispatch({
      type: GET_ERRORS,
      test: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      test: err.response.data,
    });
  }
};
