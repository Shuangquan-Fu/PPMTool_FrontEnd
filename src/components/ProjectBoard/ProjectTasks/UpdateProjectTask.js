import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getProjectById,
  updateProjectTask,
} from '../../../actions/projectTaskActions';
class UpdateProjectTask extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      projectSequence: '',
      summary: '',
      acceptanceCriteria: '',
      status: '',
      priority: '',
      dueDate: '',
      projectIdentifier: '',
      create_At: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const { backlog_id, pt_id } = this.props.match.params;
    this.props.getProjectById(backlog_id, pt_id, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    const {
      id,
      projectSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier,
      create_At,
    } = nextProps.project_task;

    this.setState({
      id,
      projectSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier,
      create_At,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const UpdateProjectTask = {
      id: this.state.id,
      projectSequence: this.state.projectSequence,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      projectIdentifier: this.state.projectIdentifier,
      create_At: this.state.create_At,
    };

    this.props.updateProjectTask(
      this.state.projectIdentifier,
      this.state.projectSequence,
      UpdateProjectTask,
      this.props.history
    );
  }
  render() {
    return (
      <div className='add-PBI'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <a href='#' className='btn btn-light'>
                Back to Project Board
              </a>
              <h4 className='display-4 text-center'>Update Project Task</h4>
              <p className='lead text-center'>
                Project Name: {this.state.projectIdentifier} | Project Task ID:{' '}
                {this.state.projectSequence}{' '}
              </p>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    name='summary'
                    placeholder='Project Task summary'
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <textarea
                    className='form-control form-control-lg'
                    placeholder='Acceptance Criteria'
                    name='acceptanceCriteria'
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Due Date</h6>
                <div className='form-group'>
                  <input
                    type='date'
                    className='form-control form-control-lg'
                    name='dueDate'
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <select
                    className='form-control form-control-lg'
                    name='priority'
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className='form-group'>
                  <select
                    className='form-control form-control-lg'
                    name='status'
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value=''>Select Status</option>
                    <option value='TO_DO'>TO DO</option>
                    <option value='IN_PROGRESS'>IN PROGRESS</option>
                    <option value='DONE'>DONE</option>
                  </select>
                </div>

                <input
                  type='submit'
                  className='btn btn-primary btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  project_task: state.project_task.project_task,
  error: state.error,
});
export default connect(mapStateToProps, { getProjectById, updateProjectTask })(
  UpdateProjectTask
);
