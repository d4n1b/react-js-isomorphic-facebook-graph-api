import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/facebookUsersActions';
import { AuthButton } from './AuthButton';
import './UserDetails.scss';

@connect((store) => ({
  details: store.user.details
}))
export class UserDetails extends Component {
  constructor(props) {
    super(props);

    this.getUser = this.getUser.bind(this);
  }

  componentWillMount() {
    this.getUser(this.props.userId);
  }

  getUser(userId) {
    this.props.dispatch(getUser(userId));
  }

  render() {
    const userDetails = this.props.details;

    return (
      <div>
        {!userDetails.link
          ? <h4>There is a problem with your account.</h4>
          : <div className="row">
              <div className="col-sm-3 col-md-4">
                <div className="userdetails-avatar">
                  <img src={userDetails.pictureUrl} />
                </div>
              </div>
              <div className="col-sm-9 col-md-8">
                <table className="table userdetails-data">
                  <tbody>
                    <tr>
                      <td><strong>First name</strong></td>
                      <td>{userDetails.firstName}</td>
                    </tr>
                    <tr>
                      <td><strong>Surname</strong></td>
                      <td>{userDetails.lastName}</td>
                    </tr>
                    <tr>
                      <td><strong>Gender</strong></td>
                      <td>{userDetails.gender}</td>
                    </tr>
                    <tr>
                      <td><strong>Facebook page</strong></td>
                      <td><a href={userDetails.link} target="_blank">link</a></td>
                    </tr>
                    <tr>
                      <td><strong>Locale</strong></td>
                      <td>{userDetails.locale}</td>
                    </tr>
                    <tr>
                      <td><strong>Account status</strong></td>
                      <td>{userDetails.verified ? 'verified' : 'unverified'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        }
      </div>
    );
  }
}
