import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
} from "../constants/productConstants"


export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { isLoading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return {
                isLoading: false,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page,
            }
        case PRODUCT_LIST_FAIL:
            return { isLoading: false, isError: action.payload }
        default:
            return state
    }
}


export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { isLoading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            return { isLoading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { isLoading: false, isError: action.payload }
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { isLoading: true }
        case PRODUCT_DELETE_SUCCESS:
            return { isLoading: false, isSuccess: true }
        case PRODUCT_DELETE_FAIL:
            return { isLoading: false, error: action.payload }
        default:
            return state
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { isLoading: true }
        case PRODUCT_CREATE_SUCCESS:
            return { isLoading: false, isSuccess: true, product: action.payload }
        case PRODUCT_CREATE_FAIL:
            return { isLoading: false, isError: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { isLoading: true }
        case PRODUCT_UPDATE_SUCCESS:
            return { isLoading: false, isSuccess: true, product: action.payload }
            case PRODUCT_UPDATE_FAIL:
            return { isLoading: false, isError: action.payload }
        case PRODUCT_UPDATE_RESET:
            return { product: {} }
        default:
            return state
    }
}

export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { isLoading: true }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { isLoading: false, isSuccess: true }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { isLoading: false, isError: action.payload }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
}