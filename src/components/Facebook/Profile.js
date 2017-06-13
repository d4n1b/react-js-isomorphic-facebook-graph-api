import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserDetails } from './UserDetails';
import { AuthButton } from './AuthButton';

@connect((store) => ({
  user: store.user
}))
export class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const userCredentials = this.props.user.credentials;

    return (
      <div>

        <br/>
        <AuthButton />
        <br/>

        {userCredentials.loggedIn && <UserDetails userId={userCredentials.id} />}
      </div>
    );
  }
}
