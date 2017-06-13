export default function reducer(state={
  credentials: {
    loggedIn: false,
    id: null,
    token: null
  },
  details: {}
}, action) {

  switch (action.type) {
    case 'FACEBOOK_USERS_LOG_IN': {
      state = Object.assign({}, state, {
        credentials: {
          loggedIn: true,
          id: action.payload.id,
          token: action.payload.token
        }
      });
      break;
    }

    case 'FACEBOOK_USERS_LOG_OUT': {
      state = Object.assign({}, state, {
        credentials: {
          loggedIn: false,
          id: null,
          token: null
        }
      });
      break;
    }

    case 'FACEBOOK_USERS_GET_DETAILS': {
      state = Object.assign({}, state, {
        details: action.payload
      });
      break;
    }
  }

  return state;
}
