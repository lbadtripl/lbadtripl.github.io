import { getAuthUserDataThunkCreator } from "./auth-reducer";


const INITIALAIZING_SUCCESS = "INITIALAIZING_SUCCESS";
export const initialaizingSuccess = () => ({type: INITIALAIZING_SUCCESS})
export const initializeAppThunk = () => (dispatch) => {
   let promise = dispatch(getAuthUserDataThunkCreator())
   promise.then(() => {dispatch(initialaizingSuccess())})
}

let initialState = {
    initialaized: false
}

const appReducer = (state = initialState, action) => {

    switch (action.type) {

        case INITIALAIZING_SUCCESS:
            return {
                ...state,
                initialaized: true
                }
            
        default:
            return state;
    }
}

export default appReducer;