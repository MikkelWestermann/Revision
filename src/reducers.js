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


// ACCOUNT ----------------------------------------------------------------

const initialAccountState = {
  isSignedIn: false,
  isPending: false,
  username: '',
  email: '',
}

export const account = (state=initialAccountState, action={}) => {
  switch (action.type) {
    case SIGN_IN_PENDING:
      return Object.assign({}, state, { isPending: true });
    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, { isPending: false, username: action.payload.username, email: action.payload.email, isSignedIn: true });
    case SIGN_IN_FAILED:
      return Object.assign({}, state, { isPending: false, message: action.payload, snackbar: true })
    case REGISTER_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REGISTER_SUCCESS:
      return Object.assign({}, state, { isPending: false, username: action.payload.username, email: action.payload.email, isSignedIn: true });
    case REGISTER_FAILED:
      return Object.assign({}, state, { isPending: false, message: action.payload, snackbar: true })
    case SIGN_OUT:
      return Object.assign({}, state, initialAccountState)
    default:
      return state;
  }
}

// ACTION FEEDBACK ----------------------------------------------------------

const initialActionState = {
  open: false,
  message: '',
  varient: 'information'
}

export const actionFeedback = (state=initialActionState, action={}) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return Object.assign({}, state, { open: true, message: action.payload.message, varient: action.payload.varient });
    case CLOSE_SNACKBAR:
      return Object.assign({}, state, { open: false })
    default:
      return state;
  }
}



// CARD GROUP ---------------------------------------------------------------




// CARDS -------------------------------------------------------------------




// ADDS --------------------------------------------------------------------




// TAGS --------------------------------------------------------------------





// GROUP TAGS --------------------------------------------------------------
