import { getAuthUserDataThunkCreator } from "./auth-reducer";


const INITIALAIZING_SUCCESS = "INITIALAIZING_SUCCESS";
const GLOBAL_ERROR = "GLOBAL_ERROR";
export const initialaizingSuccess = () => ({ type: INITIALAIZING_SUCCESS })
export const globalErrorAC = (message) => ({ type: GLOBAL_ERROR, message })
export const initializeAppThunk = () => (dispatch) => {
    let promise = dispatch(getAuthUserDataThunkCreator())
    promise.then(() => { dispatch(initialaizingSuccess()) })
}
export const errorsThunkCreator = () => (dispatch) => {
    const message = "BUY SUBSCRYBE"
    const switchingOffErrorMassage = () => {return dispatch(globalErrorAC(null))}
    dispatch(globalErrorAC(message))
    setTimeout(switchingOffErrorMassage, 5000)
}

let initialState = {
    initialaized: false,
    globalError: null
}

const appReducer = (state = initialState, action) => {

    switch (action.type) {

        case INITIALAIZING_SUCCESS:
            return {
                ...state,
                initialaized: true
            }
        case GLOBAL_ERROR:
            return {
                ...state,
                globalError: action.message
            }

        default:
            return state;
    }
}

export default appReducer;