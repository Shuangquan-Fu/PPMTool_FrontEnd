import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Backlog from './Backlog';
import { connect } from 'react-redux';
import { getProjectTask } from '../../actions/projectTaskActions';

class ProjectBoard extends Component {
  constructor() {
    super();
    this.state = {
      error: {},
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    //该方法内禁止访问this
    if (nextProps.error !== prevState.error) {
      //通过对比nextProps和prevState，返回一个用于更新状态的对象

      return {
        error: nextProps.error,
      };
    }
    //不需要更新状态，返回null

    return null;
  }
  componentDidMount() {
    this.props.getProjectTask(this.props.match.params.id);
  }
  render() {
    const { id } = this.props.match.params;
    const { project_tasks } = this.props.project_task;
    const { error } = this.state;
    let content;

    const boardContentAgrithom = (error, project_tasks) => {
      if (project_tasks.length < 1) {
        if (error.projectNotFound) {
          return (
            <div className='alert alert-danger text-center' role='alert'>
              {error.projectNotFound}
            </div>
          );
        } else {
          return (
            <div className='alert alert-info text-center' role='alert'>
              No Project Tasks on this board
            </div>
          );
        }
      } else {
        return <Backlog id={id} project_task={project_tasks}></Backlog>;
      }
    };
    content = boardContentAgrithom(error, project_tasks);
    return (
      <div className='container'>
        <Link to={`/addProjectTask/${id}`} className='btn btn-primary mb-3'>
          <i className='fas fa-plus-circle'> Create Project Task</i>
        </Link>
        <br />
        <hr />
        {content}
      </div>
    );
  }
}
const mapped = (state) => ({
  project_task: state.project_task,
  error: state.error,
});

export default connect(mapped, { getProjectTask })(ProjectBoard);
