import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProject } from '../../actions/projectActions';
import classnames from 'classnames';
class AddProject extends Component {
  constructor() {
    super();

    this.state = {
      projectName: '',
      projectIdentifier: '',
      description: '',
      start_date: '',
      end_date: '',
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
    const newProject = {
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };
    this.props.createProject(newProject, this.props.history);
  }

  render() {
    const { error } = this.state;
    console.log(error);
    return (
      <div>
        <div className='project'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <h5 className='display-4 text-center'>Create Project form</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      className={classnames('form-control form-control-lg ', {
                        'is-invalid': error.projectName,
                      })}
                      placeholder='Project Name'
                      name='projectName'
                      value={this.state.projectName}
                      onChange={this.onChange}
                    />
                    {error.projectName && (
                      <div className='invalid-feedback'>
                        {error.projectName}
                      </div>
                    )}
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className={classnames('form-control form-control-lg ', {
                        'is-invalid': error.projectIdentifier,
                      })}
                      placeholder='Unique Project ID'
                      name='projectIdentifier'
                      value={this.state.projectIdentifier}
                      onChange={this.onChange}
                    />
                    {error.projectIdentifier && (
                      <div className='invalid-feedback'>
                        {error.projectIdentifier}
                      </div>
                    )}
                  </div>
                  <div className='form-group'>
                    <textarea
                      className={classnames('form-control form-control-lg ', {
                        'is-invalid': error.description,
                      })}
                      placeholder='Project Description'
                      name='description'
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                    {error.description && (
                      <div className='invalid-feedback'>
                        {error.description}
                      </div>
                    )}
                  </div>
                  <h6>Start Date</h6>
                  <div className='form-group'>
                    <input
                      type='date'
                      className='form-control form-control-lg'
                      name='start_date'
                      value={this.state.start_date}
                      onChange={this.onChange}
                    />
                  </div>
                  <h6>Estimated End Date</h6>
                  <div className='form-group'>
                    <input
                      type='date'
                      className='form-control form-control-lg'
                      name='end_date'
                      value={this.state.end_date}
                      onChange={this.onChange}
                    />
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
      </div>
    );
  }
}

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, { createProject })(AddProject);
