import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Landing extends Component {
  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push('/dashboard');
    }
  }
  render() {
    return (
      <div class='landing'>
        <div class='light-overlay landing-inner text-dark'>
          <div class='container'>
            <div class='row'>
              <div class='col-md-12 text-center'>
                <h1 class='display-3 mb-4'>Personal Kanban Tool</h1>
                <p class='lead'>
                  Create your account to join active projects or start you own
                </p>
                <hr />
                <Link to='/register' class='btn btn-lg btn-primary mr-2'>
                  Sign Up
                </Link>
                <Link to='/login' class='btn btn-lg btn-secondary mr-2'>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps)(Landing);
