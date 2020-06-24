import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { login } from '../../actions/securityActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.error) {
      this.setState({ error: nextProps.error });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.login(LoginRequest);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { error } = this.state;
    return (
      <div className='login'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Log In</h1>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': error.username,
                    })}
                    placeholder='Email Address'
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
                <input type='submit' className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  error: state.error,
});

export default connect(mapStateToProps, { login })(Login);
