import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AppStyle from './App.scss';

@connect()
export class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-faded rounded navbar-toggleable-md">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#containerNavbar" aria-controls="containerNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/" className="navbar-brand">Home</Link>
          <Link to="/page-404" className="navbar-brand">Page 404</Link>
        </nav>

        <div className="content col-sm-8 mx-auto">
          {this.props.children}
        </div>
      </div>
    );
  }
}
