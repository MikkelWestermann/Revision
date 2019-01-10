import {
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  SIGN_OUT,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  GET_CARD_GROUPS_PENDING,
  GET_CARD_GROUPS_SUCCESS,
  GET_CARD_GROUPS_FAILED,
  ADD_CARD_GROUP_PENDING,
  ADD_CARD_GROUP_SUCCESS,
  ADD_CARD_GROUP_FAILED,
  UPDATE_CARD_GROUP_PENDING,
  UPDATE_CARD_GROUP_SUCCESS,
  UPDATE_CARD_GROUP_FAILED,
  REMOVE_CARD_GROUP_PENDING,
  REMOVE_CARD_GROUP_SUCCESS,
  REMOVE_CARD_GROUP_FAILED,
  GET_CARDS_PENDING,
  GET_CARDS_SUCCESS,
  GET_CARDS_FAILED,
  ADD_CARD_PENDING,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILED,
  UPDATE_CARD_PENDING,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_FAILED,
  REMOVE_CARD_PENDING,
  REMOVE_CARD_SUCCESS,
  REMOVE_CARD_FAILED,
  GET_ADDS_PENDING,
  GET_ADDS_SUCCESS,
  GET_ADDS_FAILED,
  ADD_ADD_PENDING,
  ADD_ADD_SUCCESS,
  ADD_ADD_FAILED,
  REMOVE_ADD_PENDING,
  REMOVE_ADD_SUCCESS,
  REMOVE_ADD_FAILED,
  GET_TAGS_PENDING,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILED,
  ADD_TAG_PENDING,
  ADD_TAG_SUCCESS,
  ADD_TAG_FAILED,
  REMOVE_TAG_FROM_GROUP_PENDING,
  REMOVE_TAG_FROM_GROUP_SUCCESS,
  REMOVE_TAG_FROM_GROUP_FAILED,
  ADD_TAG_TO_GROUP_PENDING,
  ADD_TAG_TO_GROUP_SUCCESS,
  ADD_TAG_TO_GROUP_FAILED,
} from './constants';

const URL = 'http://localhost:3000';
// const URL = 'https://infinite-plateau-28489.herokuapp.com';

// ACTION FEEDBACK ----------------------------------------------------------

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

// ACCOUNT ----------------------------------------------------------------

export const signin = (accountName, password) => (dispatch) => {
  dispatch({ type: SIGN_IN_PENDING });
  fetch(`${URL}/signin`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      accountName: accountName,
      password: password
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.data[0].username) {
      dispatch(openSnackbar('You have successfully signed in!', 'success'));
      dispatch({ type: SIGN_IN_SUCCESS, payload: data.data[0] })
    } else {
      dispatch(openSnackbar('Wrong Credentials', 'error'));
      dispatch({ type: SIGN_IN_FAILED, payload: data.data[0] })
    }
  })
  .catch(err => {
    dispatch(openSnackbar('Wrong Credentials', 'error'));
    dispatch({ type: SIGN_IN_FAILED, payload: err })
  })
}

export const register = (username, email, password) => (dispatch) => {
  dispatch({ type: REGISTER_PENDING });
  fetch(`${URL}/register`, {
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
    if (data.data[0].username) {
      dispatch(openSnackbar('You have successfully created an account!', 'success'));
      dispatch({ type: REGISTER_SUCCESS, payload: data.data[0] })
    } else {
      dispatch(openSnackbar(data, 'error'));
      dispatch({ type: REGISTER_FAILED, payload: data.data[0] })
    }
  })
  .catch(err => {
    dispatch(openSnackbar('Something went wrong', 'error'));
    dispatch({ type: REGISTER_FAILED, payload: err })
  })
}

export const signout = () => ({
  type: SIGN_OUT
})


// CARD GROUP ---------------------------------------------------------------

export const getCardGroups = username => (dispatch) => {
  dispatch({ type: GET_CARD_GROUPS_PENDING });
  fetch(`${URL}/usercardgroups`, {
    method: 'get',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data[0].title) {
      dispatch(openSnackbar('Loaded your groups', 'success'));
      dispatch({ type: GET_CARD_GROUPS_SUCCESS, payload: data })
    } else {
      dispatch(openSnackbar(data, 'error'));
      dispatch({ type: GET_CARD_GROUPS_FAILED, payload: data })
    }
  })
  .catch(err => {
    dispatch(openSnackbar('Something went wrong, when fetching your groups', 'error'));
    dispatch({ type: GET_CARD_GROUPS_FAILED, payload: err })
  })
}


export const addCardGroup = (title, username) => (dispatch) => {
  dispatch({ type: ADD_CARD_GROUP_PENDING });
  fetch(`${URL}/addcardgroup`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      title,
      username
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data[0].title) {
      dispatch(openSnackbar('Card group added', 'success'));
      dispatch({ type: ADD_CARD_GROUP_SUCCESS, payload: data })
    } else {
      dispatch(openSnackbar(data, 'error'));
      dispatch({ type: ADD_CARD_GROUP_FAILED, payload: data })
    }
  })
  .catch(err => {
    dispatch(openSnackbar('Something went wrong', 'error'));
    dispatch({ type: ADD_CARD_GROUP_FAILED, payload: err })
  })
}


export const updateCardGroup = (id, title) => (dispatch) => {
  dispatch({ type: UPDATE_CARD_GROUP_PENDING });
  fetch(`${URL}/updatecardgroup`, {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id,
      title
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data === 'Success') {
      dispatch(openSnackbar('Card group updated', 'success'));
      dispatch({ type: UPDATE_CARD_GROUP_SUCCESS, payload: data })
    } else {
      dispatch(openSnackbar(data, 'error'));
      dispatch({ type: UPDATE_CARD_GROUP_FAILED, payload: data })
    }
  })
  .catch(err => {
    dispatch(openSnackbar('Something went wrong', 'error'));
    dispatch({ type: UPDATE_CARD_GROUP_FAILED, payload: err })
  })
}


export const removeCardGroup = id => (dispatch) => {
  dispatch({ type: REMOVE_CARD_GROUP_PENDING });
  fetch(`${URL}/updatecardgroup`, {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ id })
  })
  .then(response => response.json())
  .then(data => {
    // Figure out check
    if (data === 'Success') {
      dispatch(openSnackbar('Card group updated', 'success'));
      dispatch({ type: REMOVE_CARD_GROUP_SUCCESS, payload: data })
    } else {
      dispatch(openSnackbar(data, 'error'));
      dispatch({ type: REMOVE_CARD_GROUP_FAILED, payload: data })
    }
  })
  .catch(err => {
    dispatch(openSnackbar('Something went wrong', 'error'));
    dispatch({ type: REMOVE_CARD_GROUP_FAILED, payload: err })
  })
}

// CARDS -------------------------------------------------------------------

export const getCards = groupId => (dispatch) => {
  dispatch({ type: GET_CARDS_PENDING });
  fetch(`${URL}/getcards`, {
    method: 'get',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ groupId })
  })
  .then(response => response.json())
  .then(data => {
    if (data[0].question) {
      dispatch(openSnackbar('Loaded cards', 'success'));
      dispatch({ type: GET_CARDS_SUCCESS, payload: data })
    } else {
      dispatch(openSnackbar(data, 'error'));
      dispatch({ type: GET_CARDS_FAILED, payload: data })
    }
  })
  .catch(err => {
    dispatch(openSnackbar('Something went wrong, when fetching your groups', 'error'));
    dispatch({ type: GET_CARDS_FAILED, payload: err })
  })
}


export const addCard = (question, answer, type, options, groupId) => (dispatch) => {
  dispatch({ type: ADD_CARD_PENDING });
  fetch(`${URL}/addcard`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      question,
      answer,
      type,
      options,
      groupId
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data[0].question) {
      dispatch(openSnackbar('Card has been added', 'success'));
      dispatch({ type: ADD_CARD_SUCCESS, payload: data })
    } else {
      dispatch(openSnackbar(data, 'error'));
      dispatch({ type: ADD_CARD_FAILED, payload: data })
    }
  })
  .catch(err => {
    dispatch(openSnackbar('Something went wrong, when fetching your groups', 'error'));
    dispatch({ type: ADD_CARD_FAILED, payload: err })
  })
}


export const updateCard = (question, answer, type, options, id) => (dispatch) => {
  dispatch({ type: UPDATE_CARD_PENDING });
  fetch(`${URL}/updatecard`, {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      question,
      answer,
      type,
      options,
      id
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data[0].question) {
      dispatch(openSnackbar('Card has been updated', 'success'));
      dispatch({ type: UPDATE_CARD_SUCCESS, payload: data })
    } else {
      dispatch(openSnackbar(data, 'error'));
      dispatch({ type: UPDATE_CARD_FAILED, payload: data })
    }
  })
  .catch(err => {
    dispatch(openSnackbar('Something went wrong', 'error'));
    dispatch({ type: UPDATE_CARD_FAILED, payload: err })
  })
}


export const removeCard = id => (dispatch) => {
  dispatch({ type: REMOVE_CARD_PENDING });
  fetch(`${URL}/removecard`, {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ id })
  })
  .then(response => response.json())
  .then(data => {
    // Figure out check
    if (data === 'success') {
      dispatch(openSnackbar('Card has been removed', 'success'));
      dispatch({ type: REMOVE_CARD_SUCCESS, payload: data })
    } else {
      dispatch(openSnackbar(data, 'error'));
      dispatch({ type: REMOVE_CARD_FAILED, payload: data })
    }
  })
  .catch(err => {
    dispatch(openSnackbar('Something went wrong', 'error'));
    dispatch({ type: REMOVE_CARD_FAILED, payload: err })
  })
}


// ADDS --------------------------------------------------------------------

export const getAdds = username => (dispatch) => {
  dispatch({ type: GET_ADDS_PENDING });
  fetch(`${URL}/getadds`, {
    method: 'get',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username })
  })
  .then(response => response.json())
  .then(data => {
    if (typeof data === 'object') {
      dispatch(openSnackbar('Loaded adds', 'success'));
      dispatch({ type: GET_ADDS_SUCCESS, payload: data })
    } else {
      dispatch(openSnackbar(data, 'error'));
      dispatch({ type: GET_ADDS_FAILED, payload: data })
    }
  })
  .catch(err => {
    dispatch(openSnackbar('Something went wrong, when fetching your groups', 'error'));
    dispatch({ type: GET_ADDS_FAILED, payload: err })
  })
}

export const newAdd = (userId, groupId) => (dispatch) => {
  dispatch({ type: ADD_ADD_PENDING });
  fetch(`${URL}/newadd`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userId,
      groupId
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data === 'success') {
      dispatch(openSnackbar('Card has been added', 'success'));
      dispatch({ type: ADD_ADD_SUCCESS, payload: data })
    } else {
      dispatch(openSnackbar(data, 'error'));
      dispatch({ type: ADD_ADD_FAILED, payload: data })
    }
  })
  .catch(err => {
    dispatch(openSnackbar('Something went wrong', 'error'));
    dispatch({ type: ADD_ADD_FAILED, payload: err })
  })
}

export const removeAdd = (userId, groupId) => (dispatch) => {
  dispatch({ type: REMOVE_ADD_PENDING });
  fetch(`${URL}/removeadd`, {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ userId, groupId })
  })
  .then(response => response.json())
  .then(data => {
    // Figure out check
    if (data === 'success') {
      dispatch(openSnackbar('Add has been removed', 'success'));
      dispatch({ type: REMOVE_ADD_SUCCESS, payload: data })
    } else {
      dispatch(openSnackbar(data, 'error'));
      dispatch({ type: REMOVE_ADD_FAILED, payload: data })
    }
  })
  .catch(err => {
    dispatch(openSnackbar('Something went wrong', 'error'));
    dispatch({ type: REMOVE_ADD_FAILED, payload: err })
  })
}


// TAGS --------------------------------------------------------------------

export const getTags = () => (dispatch) => {
  dispatch({ type: GET_TAGS_PENDING });
  fetch(`${URL}/tags`, {
    method: 'get',
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => response.json())
  .then(data => {
    if (typeof data === 'object') {
      dispatch({ type: GET_TAGS_SUCCESS, payload: data })
    } else {
      dispatch(openSnackbar(data, 'error'));
      dispatch({ type: GET_TAGS_FAILED, payload: data })
    }
  })
  .catch(err => {
    dispatch(openSnackbar('Something went wrong', 'error'));
    dispatch({ type: GET_TAGS_FAILED, payload: err })
  })
}

export const newTag = tagName => (dispatch) => {
  dispatch({ type: ADD_TAG_PENDING });
  fetch(`${URL}/newtag`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ tagName })
  })
  .then(response => response.json())
  .then(data => {
    if (data === 'success') {
      dispatch(openSnackbar('Tag has been added', 'success'));
      dispatch({ type: ADD_TAG_SUCCESS, payload: data })
    } else {
      dispatch(openSnackbar(data, 'error'));
      dispatch({ type: ADD_TAG_FAILED, payload: data })
    }
  })
  .catch(err => {
    dispatch(openSnackbar('Something went wrong', 'error'));
    dispatch({ type: ADD_TAG_FAILED, payload: err })
  })
}



// GROUP TAGS --------------------------------------------------------------

export const addTagToGroup = (tagId, groupId) => (dispatch) => {
  dispatch({ type: ADD_TAG_TO_GROUP_PENDING });
  fetch(`${URL}/addtagtogroup`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ tagId, groupId })
  })
  .then(response => response.json())
  .then(data => {
    if (data === 'success') {
      dispatch(openSnackbar('Tag has been added', 'success'));
      dispatch({ type: ADD_TAG_TO_GROUP_SUCCESS, payload: data })
    } else {
      dispatch(openSnackbar(data, 'error'));
      dispatch({ type: ADD_TAG_TO_GROUP_FAILED, payload: data })
    }
  })
  .catch(err => {
    dispatch(openSnackbar('Something went wrong', 'error'));
    dispatch({ type: ADD_TAG_TO_GROUP_FAILED, payload: err })
  })
}

export const removeTagFromGroup = (tagId, groupId) => (dispatch) => {
  dispatch({ type: REMOVE_TAG_FROM_GROUP_PENDING });
  fetch(`${URL}/removeadd`, {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ tagId, groupId })
  })
  .then(response => response.json())
  .then(data => {
    // Figure out check
    if (data === 'success') {
      dispatch(openSnackbar('Tag has been removed', 'success'));
      dispatch({ type: REMOVE_TAG_FROM_GROUP_SUCCESS, payload: data })
    } else {
      dispatch(openSnackbar(data, 'error'));
      dispatch({ type: REMOVE_TAG_FROM_GROUP_FAILED, payload: data })
    }
  })
  .catch(err => {
    dispatch(openSnackbar('Something went wrong', 'error'));
    dispatch({ type: REMOVE_TAG_FROM_GROUP_FAILED, payload: err })
  })
}
