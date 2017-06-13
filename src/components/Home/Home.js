import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeStyle from './Home.scss';
import { Profile } from '../Facebook';

@connect()
export class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>See your Facebook basic details</h1>
        <Profile />
      </div>
    );
  }
}
