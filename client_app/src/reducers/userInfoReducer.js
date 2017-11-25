import {hashHistory} from 'react-router'
const _ = require('lodash')
import * as AN from '../ActionName'

let fetchedData = {
  items: [],
  plans: [],
  available: false,
  plan: {},
  promotions: []
}

let pageState = {
  data: fetchedData,
  newPost: false,
  newRent: false,
  showAll: true,
  error: '',
  message: '',
  stores: []
}

export default function (state = pageState, action) {
  switch (action.type) {
    case AN.ADD_NEW_POST: {
      return {
        ...state,
        newPost: true,
        newRent: false,
        showAll: false
      }
    }
    case AN.ADD_NEW_RENT: {
      return {
        ...state,
        newPost: false,
        newRent: true,
        showAll: false
      }
    }
    case AN.EDIT_POST: {
      return {
        ...state,
        newPost: true,
        newRent: false,
        postInfo: action.payload.postInfo
      }
    }
    case AN.CANCEL_POST: {
      return {
        ...state,
        newPost: false,
        newRent: false,
        showAll: true
      }
    }
    case AN.POST_ITEM_SUCCESS: {
      fetchedData.items = _.values(action.payload)
      return {
        ...state,
        showAll: true,
        newPost: false,
        newRent: false,
        message: 'Ad successfully added'
      }
    }
    case AN.POST_ITEM_FAILED: {
      return {
        ...state,
        showAll: true,
        newPost: false,
        newRent: false,
        message: '',
        error: 'Failed to post Ad, please try again!'
      }
    }
    case AN.RECEIVED_USER_INFO: {
      const {userInfo} = action.payload
      console.log(userInfo)
      fetchedData = userInfo
      return {
        ...state,
        data: userInfo
      }
    }
    case AN.FETCH_USER_INFO_REJECTED: {
      hashHistory.push(`/login`)
      return {
        ...state,
        showAll: true,
        newPost: false
      }
    }
    case AN.USER_PURCHASED_PLAN_SUCCESS: {
      const {plans} = action.payload
      return {
        ...state,
        plans,
        message: 'Successfully purchased plan'
      }
    }
    case AN.USER_PURCHASED_PLAN_FAILED: {
      return {
        ...state
      }
    }
    case AN.USER_PURCHASED_PROMOTION_SUCCESS: {
      return {
        ...state,
        items: _.values(action.payload),
        message: 'Successfully purchased promotion'
      }
    }
    case AN.USER_PURCHASED_PROMOTION_FAILED: {
      return {
        ...state
      }
    }
    case AN.RATE_AD_SUCCESS: {
      return {
        ...state,
        message: action.message,
        error: ''
      }
    }
    case AN.RATE_AD_FAILED: {
      console.log('in failed ad')
      return {
        ...state,
        message: '',
        error: 'Failed to rate'
      }
    }
    case AN.FETCH_STORES_SUCCESS: {
      console.log('reached fetched success stores')
      return {
        ...state,
        stores: _.values(action.payload)
      }
    }
    case AN.UPDATE_MESSAGE: {
      return {
        ...state,
        message: '',
        error: ''
      }
    }
  }
  return state
}
