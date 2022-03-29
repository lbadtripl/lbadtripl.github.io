import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";

const addPost = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const SWITCHING_OFF_EDIT_MODE = "SWITCHING_OFF_EDIT_MODE"

export const addPostActionCreator = (newPostText) => ({ type: addPost, newPostText })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })
export const setEditMode = (editMode) => ({type: SWITCHING_OFF_EDIT_MODE, editMode})

export const getUserProfileThunkCreator = (userId) => {
    return (dispatch) => {
        usersAPI.getProfile(userId).then(
            response => {
                dispatch(setUserProfile(response.data));
            })
    }
}
export const getUserStatusThunkCreator = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(
            response => {
                dispatch(setStatus(response.data));
            })
    }
}
export const updateUserStatusThunkCreator = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status).then(
            response => {
                if (response.data.resultCode===0){
                dispatch(setStatus(status));
                }
            })
    }
}
export const savePhotoThunkCreator = (file) => {
    return (dispatch) => {
        profileAPI.savePhoto(file).then(
            response => {
                if (response.data.resultCode===0){
                dispatch(savePhotoSuccess(response.data.data.photos));
                }
            })
    }
}
export const saveProfileThunkCreator = (profile) => {
    return (dispatch, getState) => {
       const userId = getState().auth.userId
        profileAPI.saveProfile(profile).then(
            response => {
                if (response.data.resultCode===0){
                dispatch(getUserProfileThunkCreator(userId));
                dispatch(setEditMode(false))
                } else {
                    dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0]}))
                }
            })
    }
}

let initialState = {
    posts: [
        { id: "1", message: "Hello world!", likeCounts: " 3" },
        { id: "2", message: "Hi, its me!", likeCounts: " 5" }
    ],
    profile: null,
    status: "",
    editMode: false
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case addPost:
            return {
                ...state, posts: [...state.posts, { id: "5", message: action.newPostText, likeCounts: " 0" }]
            }
        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state, status: action.status
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state, profile: {...state.profile, photos: action.photos}
            }
        case SWITCHING_OFF_EDIT_MODE:
            return {
                ...state, editMode: action.editMode
            }    
        default:
            return state;
    }
}

export default profileReducer;