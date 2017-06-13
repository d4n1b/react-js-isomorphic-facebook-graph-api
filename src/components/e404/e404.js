import React, { Component } from 'react';
import { connect } from 'react-redux';
import e404Style from './e404.scss';

@connect()
export class e404 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="e404">
        <h1>Oops, page not found</h1>

        <img src="/static/img/page-404.png"/>
      </div>
    );
  }
}
