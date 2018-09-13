import {createStore} from 'redux'


//ACTION CONSTANTS
const GET_USERS = 'GET_USERS'
const GET_MANAGERS = 'GET_MANAGERS'

//INITIAL STATE
const initialState = {
  users: [],
  managers: [],
  current: '',
  user: '',
  manager: '',
  cantCreate: false
}

//ACTION CREATORS
export const getUsers = (newUsers) => ({type: GET_USERS, newUsers})
export const getManagers = (newManagers) => ({type: GET_MANAGERS, newManagers})

//REDUCER
const reducer = (state = initialState, action)=>{
  switch(action.type) {
  	case GET_USERS:
  	return {...state, users: action.newUsers}
  	case GET_MANAGERS:
  	return {...state, managers: action.newManagers}
  	default:
  	return state
  }
}


const store = createStore(reducer)
export default store