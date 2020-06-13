import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProjectTask } from '../../../actions/projectTaskActions';
import classnames from 'classnames';
class AddProjectTask extends Component {
  constructor() {
    super();
    this.state = {
      summary: '',
      acceptanceCriteria: '',
      status: '',
      priority: '',
      dueDate: '',
      error: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newProjectTask = {
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
    };

    this.props.createProjectTask(
      newProjectTask,
      this.props.history,
      this.props.match.params.id
    );
  }

  render() {
    const { error } = this.state;
    const { id } = this.props.match.params.id;
    return (
      <div className='add-PBI'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <Link to={`/projectBoard/${id}`} className='btn btn-light'>
                Back to Project Board
              </Link>
              <h4 className='display-4 text-center'>Add Project Task</h4>
              <p className='lead text-center'>Project Name + Project Code</p>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    className={classnames('form-control form-control-lg ', {
                      'is-invalid': error.summary,
                    })}
                    name='summary'
                    placeholder='Project Task summary'
                    onChange={this.onChange}
                  />
                  {error.summary && (
                    <div className='invalid-feedback'>{error.summary}</div>
                  )}
                </div>
                <div className='form-group'>
                  <textarea
                    className='form-control form-control-lg'
                    placeholder='Acceptance Criteria'
                    name='acceptanceCriteria'
                    onChange={this.onChange}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className='form-group'>
                  <input
                    type='date'
                    className='form-control form-control-lg'
                    name='dueDate'
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <select
                    className='form-control form-control-lg'
                    name='priority'
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
  error: state.error,
});

export default connect(mapStateToProps, { createProjectTask })(AddProjectTask);
