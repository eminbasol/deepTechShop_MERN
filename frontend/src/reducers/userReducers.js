import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { isLoading: true }
        case USER_LOGIN_SUCCESS:
            return { isLoading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { isLoading: false, isError: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}