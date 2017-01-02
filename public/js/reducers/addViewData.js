const defaultState = {
  stream: {},
  dataUrl: '',
  formData: {itemName: '', description: ''},
  uploaded: false,
  communities: []
}

module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case 'STORE_STREAM':
      return { ...state, stream: action.payload }
    case 'RESET_STREAM':
      return { ...state, stream: defaultState.stream }
    case 'STORE_DATA_URL':
      return { ...state, dataUrl: action.payload }
    case 'RESET_DATA_URL':
      return { ...state, dataUrl: defaultState.dataUrl }
    case 'STORE_FORM_DATA':
      return { ...state, formData: { ...state.formData, itemName: action.payload.itemName, description: action.payload.description } }
    case 'CLEAR_FORM_DATA':
      return { ...state, formData: { ...state.formData, itemName: '', description: '' } }
    case 'UPLOADED':
      return { ...state, uploaded: action.payload }
    case 'ADD_COMMUNITY':
      return { ...state, communities: [ ...state.communities, action.payload ] }
    case 'REMOVE_COMMUNITY':
      return { ...state, communities: [ ...state.communities.filter(() => action.payload) ] }
    case 'RESET_COMMUNITIES':
      return { ...state, communities: defaultState.communities }
    case 'RESET_ADDVIEW_DATA':
      return defaultState
    default:
      return state
  }
}
