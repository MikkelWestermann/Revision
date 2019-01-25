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


// ACCOUNT ----------------------------------------------------------------

const initialAccountState = {
  isSignedIn: false,
  isPending: false,
  username: '',
  email: '',
  id: 0
}

export const account = (state=initialAccountState, action={}) => {
  switch (action.type) {
    case SIGN_IN_PENDING:
      return Object.assign({}, state, { isPending: true });
    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, { isPending: false, username: action.payload.username, email: action.payload.email, isSignedIn: true, id: action.payload.id });
    case SIGN_IN_FAILED:
      return Object.assign({}, state, { isPending: false, message: action.payload, snackbar: true })
    case REGISTER_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REGISTER_SUCCESS:
      return Object.assign({}, state, { isPending: false, username: action.payload.username, email: action.payload.email, isSignedIn: true, id: action.payload.id });
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

const initialGroupState = {
  isPending: false,
  isPendingAction: false,
  groups: [],
  newGroupId: null,
  error: ''
}

export const cardGroup = (state=initialGroupState, action={}) => {
  switch (action.type) {
    case GET_CARD_GROUPS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case GET_CARD_GROUPS_SUCCESS:
      return Object.assign({}, state, { isPending: false, groups: action.payload });
    case GET_CARD_GROUPS_FAILED:
      return Object.assign({}, state, { isPending: false, error: action.payload, groups: [] });
    case ADD_CARD_GROUP_PENDING:
      return Object.assign({}, state, { isPendingAction: true });
    case ADD_CARD_GROUP_SUCCESS:
      return Object.assign({}, state, { isPendingAction: false, groups: [...state.groups, action.payload], newGroupId: action.payload.id });
    case ADD_CARD_GROUP_FAILED:
      return Object.assign({}, state, { isPendingAction: false, error: action.payload });
    default:
      return state;
  }
}


// CARDS -------------------------------------------------------------------

const initialCardState = {
  isPending: false,
  isPendingAction: false,
  cards: [],
  error: ''
}

export const cards = (state=initialCardState, action={}) => {
  switch (action.type) {
    case GET_CARDS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case GET_CARDS_SUCCESS:
      return Object.assign({}, state, { isPending: false, cards: action.payload });
    case GET_CARDS_FAILED:
      return Object.assign({}, state, { isPending: false, error: action.payload, cards: [] });
    case ADD_CARD_PENDING:
      return Object.assign({}, state, { isPendingAction: true });
    case ADD_CARD_SUCCESS:
      return Object.assign({}, state, { isPendingAction: false, cards: [...state.cards, action.payload[0]] });
    case ADD_CARD_FAILED:
      return Object.assign({}, state, { isPendingAction: false, error: action.payload, cards: [] });
    case REMOVE_CARD_PENDING:
      return Object.assign({}, state, { isPendingAction: true });
    case REMOVE_CARD_SUCCESS:
      const newAdds = state.adds.filter(add => add.id !== action.payload[0])
      return Object.assign({}, state, { isPendingAction: false, cards: action.payload });
    case REMOVE_CARD_FAILED:
      return Object.assign({}, state, { isPendingAction: false, error: action.payload, cards: [] });
    case UPDATE_CARD_PENDING:
      return Object.assign({}, state, { isPendingAction: true });
    case UPDATE_CARD_SUCCESS:
      return Object.assign({}, state, { isPendingAction: false, cards: [...state.cards, action.payload[0]] });
    case UPDATE_CARD_FAILED:
      return Object.assign({}, state, { isPendingAction: false, error: action.payload, cards: [] });
    default:
      return state;
  }
}

// ADDS --------------------------------------------------------------------

const initialAddsState = {
  isPending: false,
  isPendingAction: false,
  adds: [],
  error: ''
}

export const groupAdds = (state=initialAddsState, action={}) => {
  switch (action.type) {
    case GET_ADDS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case GET_ADDS_SUCCESS:
      return Object.assign({}, state, { isPending: false, adds: action.payload });
    case GET_ADDS_FAILED:
      return Object.assign({}, state, { isPending: false, error: action.payload, adds: [] });
    case ADD_ADD_PENDING:
      return Object.assign({}, state, { isPendingAction: true });
    case ADD_ADD_SUCCESS:
      return Object.assign({}, state, { isPendingAction: false, adds: [...state.adds, action.payload[0]] });
    case ADD_ADD_FAILED:
      return Object.assign({}, state, { isPendingAction: false, error: action.payload, adds: [] });
    case REMOVE_ADD_PENDING:
      return Object.assign({}, state, { isPendingAction: true });
    case REMOVE_ADD_SUCCESS:
      const newAdds = state.adds.filter(add => add.id !== action.payload[0])
      return Object.assign({}, state, { isPendingAction: false, adds: action.payload });
    case REMOVE_ADD_FAILED:
      return Object.assign({}, state, { isPendingAction: false, error: action.payload, adds: [] });
    default:
      return state;
  }
}


// TAGS --------------------------------------------------------------------





// GROUP TAGS --------------------------------------------------------------
