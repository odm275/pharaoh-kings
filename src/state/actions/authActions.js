import axios from 'axios'
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { pilonApi, environmentId } from './config'
//  ToDo: registration?
export const registerUser = ({ username, password }, history) => dispatch => {
  pilonApi
    .post('/token', {
      token_scope: 'public',
      environment_id: environmentId,
      customer_email: username,
      password: password,
    })
    .then(res => history.push('/log-in'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    )
}

// Login - Get User Token
export const loginUser = ({ username, password }) => dispatch => {
  pilonApi
    .post('/token', {
      token_scope: 'customer',
      environment_id: environmentId,
      customer_email: username,
      password: password,
    })
    .then(res => {
      //  Save to localStorage
      const { token } = res.data
      //Set token to LS
      localStorage.setItem('jwtToken', token)
      //  Set token to Auth header
      setAuthToken(token)
      //Decode token to get user data;
      const decoded = jwt_decode(token)
      // Set currect user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

//Set logged in user function
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  }
}

//  Log user out
export const logoutUser = () => dispatch => {
  // Remove tokem from localStore
  localStorage.removeItem('jwtToken')
  //  Remove auth header for future requests
  setAuthToken(false)
  //  Set current user to {} which will set isAuthenticated to false
  //  {}->false
  dispatch(setCurrentUser({}))
}
