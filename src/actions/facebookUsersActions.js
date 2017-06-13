// TODO: Check is the user is really
// logged in/logged out with FB.getLoginStatus
// before trigger a login action
import _ from 'lodash';

// Np special extra permissions
const USER_FIELDS = 'fields=id,cover,name,first_name,last_name,age_range,link,gender,locale,picture,timezone,updated_time,verified';

export function logIn() {
  return (dispatch) => {
    FB.login(response => {
      if (response && response.authResponse) {
        let { userID, accessToken } = response.authResponse;
        dispatch({type: 'FACEBOOK_USERS_LOG_IN', payload: {
          id: userID,
          token: accessToken
        }});
      }
    });
  }
}

export function logOut() {
  return (dispatch) => {
    FB.logout(response => {
      dispatch({type: 'FACEBOOK_USERS_LOG_OUT'});
    });
  }
}

export function getUser(userId) {
  return (dispatch) => {
    FB.api(`/${userId}?${USER_FIELDS}`, response => {
      if (response && !response.error) {
        dispatch({type: 'FACEBOOK_USERS_GET_DETAILS', payload: {
          coverUrl: _.get(response, 'cover.source'),
          firstName: response.first_name,
          lastName: response.last_name,
          gender: response.gender,
          link: response.link,
          locale: response.locale,
          pictureUrl: _.get(response, 'picture.data.url'),
          verified: response.verified
        }});
      }
    });
  }
}
