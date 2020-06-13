import React, { Component } from 'react';
import ProjectTaskItem from './ProjectTasks/ProjectTaskItem';
import { connect } from 'react-redux';
import { getProjectTask } from '../../actions/projectTaskActions';
class Backlog extends Component {
  render() {
    const { project_task } = this.props;
    const tasks = project_task.map((projectTask) => (
      <ProjectTaskItem
        key={projectTask.id}
        project_task={projectTask}
      ></ProjectTaskItem>
    ));
    let todoItem = [];
    let inprogressItem = [];
    let doneItem = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].props.project_task.status === 'TO_DO') {
        todoItem.push(tasks[i]);
      }
      if (tasks[i].props.project_task.status === 'IN_PROGRESS') {
        inprogressItem.push(tasks[i]);
      }
      if (tasks[i].props.project_task.status === 'DONE') {
        doneItem.push(tasks[i]);
      }
    }
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='card text-center mb-2'>
              <div className='card-header bg-secondary text-white'>
                <h3>TO DO</h3>
              </div>
            </div>
            {todoItem}
          </div>
          <div className='col-md-4'>
            <div className='card text-center mb-2'>
              <div className='card-header bg-primary text-white'>
                <h3>In Progress</h3>
              </div>
            </div>
            {inprogressItem}
          </div>
          <div className='col-md-4'>
            <div className='card text-center mb-2'>
              <div className='card-header bg-success text-white'>
                <h3>Done</h3>
              </div>
            </div>
            {doneItem}
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
