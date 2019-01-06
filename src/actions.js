import {
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  SIGN_OUT,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR
} from './constants';

export const openSnackbar = (message, varient) => ({
  type: OPEN_SNACKBAR,
  payload: {
    message,
    varient
  }
});

export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR
})

export const signin = (accountName, password) => (dispatch) => {
  dispatch({ type: SIGN_IN_PENDING });
  fetch('http://localhost:3000/signin', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      accountName: accountName,
      password: password
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.username) {
      dispatch(openSnackbar('You have successfully signed in!', 'success'));
      dispatch({ type: SIGN_IN_SUCCESS, payload: data })
    } else {
      dispatch(openSnackbar('Wrong Credentials', 'error'));
      dispatch({ type: SIGN_IN_FAILED, payload: data })
    }
  })
  .catch(err => {
    dispatch(openSnackbar('Wrong Credentials', 'error'));
    dispatch({ type: SIGN_IN_FAILED, payload: err })
  })
}

export const register = (username, email, password) => (dispatch) => {
  dispatch({ type: REGISTER_PENDING });
  fetch('http://localhost:3000/register', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username,
      email,
      password
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.username) {
      dispatch({ type: REGISTER_SUCCESS, payload: data })
    } else {
      dispatch({ type: REGISTER_FAILED, payload: data })
    }
  })
  .catch(err => dispatch({ type: REGISTER_FAILED, payload: err }))
}
