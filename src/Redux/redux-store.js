import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import authReducer from "./auth-reducer";
import dialogReducer from "./dialog-reducer";
import navReducer from "./nav-reducer";
import profileReducer from "./profile-reducer";
import usersReduser from "./users-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReducer from "./App-reducer";

let reducers = combineReducers({
    profilePage:profileReducer,
    messagesPage:dialogReducer,
    navBar:navReducer,
    usersPage:usersReduser,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
