import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn, logOut } from '../../actions/facebookUsersActions';

@connect((store) => ({
  user: store.user
}))
export class AuthButton extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.props.dispatch(logIn());
  }

  logout() {
    this.props.dispatch(logOut());
  }

  render() {
    const userCredentials = this.props.user.credentials;

    return (
      <div>
        {userCredentials.loggedIn
          ? <button className="btn btn-warning"
                    onClick={this.logout}>
              <i className="fa fa-facebook-square"></i> Logout
            </button>
          : <button className="btn btn-primary mr-1"
                    onClick={this.login}>
              <i className="fa fa-facebook-square"></i> Login with Facebook
            </button>
        }
      </div>
    );
  }
}
