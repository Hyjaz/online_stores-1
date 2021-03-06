import * as AN from '../ActionName'
import {hashHistory} from 'react-router'

const initialState = {
  showSubcategory: false,
  category: '',
  province: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case AN.FILTER_ITEMS: {
      const { filterOptions } = action.payload
      const { type, category, province } = filterOptions
      if (type === 'CATEGORY') {
        return {
          ...state,
          showSubcategory: true,
          category: category
        }
      } else if (type === 'PROVINCE') {
        return {
          ...state,
          province: province
        }
      }
      return state
    }
    case AN.NAVIGATE_TO_HOME_PAGE: {
      hashHistory.push('/')
      return {
        ...state,
        showSubcategory: false,
        province: ''
      }
    }
  }
  return state
}
