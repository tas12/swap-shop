const defaultState = {
  addView: false,
  leftIcon: { icon: '', onclick: '' },
  rightIcon: { icon: 'add', onclick: 'capture' }
}

module.exports = (state = defaultState, action) => {
  switch (action.type) {
  case 'STORE_PREVIOUS_HREF':
    return { ...state, previousHref: action.href }

  case 'SET_CAPTURE_STEP':
    return {
      ...state,
      addView: true,
      leftIcon: { ...state.leftIcon, icon: 'arrow_back', onclick: '' },
      rightIcon: { ...state.rightIcon, icon: 'done', onclick: 'details' }
    }

  case 'SET_DETAILS_STEP':
    return {
      ...state,
      addView: true,
      leftIcon: { ...state.leftIcon, icon: 'arrow_back', onclick: 'capture' },
      rightIcon: { ...state.rightIcon, icon: 'done', onclick: 'communities' }
    }

  case 'SET_COMMUNITIES_STEP':
    return {
      ...state,
      addView: true,
      leftIcon: { ...state.leftIcon, icon: 'arrow_back', onclick: 'details' },
      rightIcon: { ...state.rightIcon, icon: 'done', onclick: 'complete' } }

  case 'SET_COMPLETE_STEP':
    return {
      ...state,
      addView: true,
      leftIcon: { ...state.leftIcon, icon: 'close', onclick: '' },
      rightIcon: { ...state.rightIcon, icon: '', onclick: '' } }

  case 'RESET_APP_BAR':
    return defaultState

  default:
    return state
  }
}
