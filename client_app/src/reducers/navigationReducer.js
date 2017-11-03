import {hashHistory} from 'react-router'
import * as AN from '../ActionName'

const initialState = {
  user: null,
  error: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case AN.NAVIGATE_TO_SIGNUP_PAGE:
      hashHistory.push('/signup')
      return {
        ...state
      }
      break
    default:
      return state
  }
}