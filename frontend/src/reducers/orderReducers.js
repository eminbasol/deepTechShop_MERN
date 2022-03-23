import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                isLoading: true,
            }
        case ORDER_CREATE_SUCCESS:
            return {
                isLoading: false,
                isSuccess: true,
                order: action.payload,
            }
        case ORDER_CREATE_FAIL:
            return {
                isLoading: false,
                isError: action.payload,
            }
        default:
            return state
    }
}