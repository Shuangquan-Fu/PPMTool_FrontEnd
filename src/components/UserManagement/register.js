import React, { Component } from 'react';
import { createNewUser } from '../../actions/securityActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      fullName: '',
      password: '',
      confirmPassword: '',
      error: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.createNewUser(newUser, this.props.history);
  }
  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push('/dashboard');
    }
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
  render() {
    const { error } = this.state;
    return (
      <div className='register'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Sign Up</h1>
              <p className='lead text-center'>Create your Account</p>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': error.fullName,
                    })}
                    placeholder='Full Name'
                    name='fullName'
                    value={this.state.fullName}
                    onChange={this.onChange}
                  />
                  {error.fullName && (
                    <div className='invalid-feedback'>{error.fullName}</div>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    type='email'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': error.username,
                    })}
                    placeholder='Email Address (Username)'
                    name='username'
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  {error.username && (
                    <div className='invalid-feedback'>{error.username}</div>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': error.password,
                    })}
                    placeholder='Password'
                    name='password'
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {error.password && (
                    <div className='invalid-feedback'>{error.password}</div>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': error.confirmPassword,
                    })}
                    placeholder='Confirm Password'
                    name='confirmPassword'
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                  {error.confirmPassword && (
                    <div className='invalid-feedback'>
                      {error.confirmPassword}
                    </div>
                  )}
                </div>
                <input type='submit' className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.error,
  security: state.security,
});
export default connect(mapStateToProps, { createNewUser })(Register);
