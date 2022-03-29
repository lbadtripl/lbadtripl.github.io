import { stopSubmit } from "redux-form";
import { authAPI, securityApi } from "../api/api";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";



export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, data: { userId, email, login, isAuth } })
export const getCaptchaUrlSuccess = (url) => ({ type: GET_CAPTCHA_URL_SUCCESS, url })

export const getAuthUserDataThunkCreator = () => async (dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const loginThunkCreator = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataThunkCreator())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCapchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", { _error: message }))
    }
}


export const getCapchaUrl = () => async (dispatch) => {
    const response = await securityApi.getCapchaUrl()
    const capchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(capchaUrl))
}



export const logoutThunkCreator = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}




let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    capchaUrl: null
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }

        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state, capchaUrl: action.url
            }
        default:
            return state;
    }
}

export default authReducer;