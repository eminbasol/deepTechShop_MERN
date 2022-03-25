import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_FAIL,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_RESET,
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

export const orderDetailsReducer = (state = { isLoading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                isLoading: false,
                order: action.payload,
            }
        case ORDER_DETAILS_FAIL:
            return {
                isLoading: false,
                isError: action.payload,
            }
        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                isLoading: true,
            }
        case ORDER_PAY_SUCCESS:
            return {
                isLoading: false,
                isSuccess: true,
            }
        case ORDER_PAY_FAIL:
            return {
                isLoading: false,
                isError: action.payload,
            }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}