import { usersAPI } from "../api/api";
import { updateobjectInArray } from "../utilites/objectHelpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOOGLE_IS_FETCHING = "TOOGLE_IS_FETCHING";
const TOOGLE_IS_F0LL0WING_PROGRESS = "TOOGLE_IS_F0LL0WING_PROGRESS";

export const followSuccess = (userId) => ({ type: FOLLOW, userId })
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage: currentPage })
export const setTotalUsersCount = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalCount })
export const toogleIsFetching = (isFetching) => ({ type: TOOGLE_IS_FETCHING, isFetching })
export const toogleFollowingProgress = (isFetching, userId) => ({ type: TOOGLE_IS_F0LL0WING_PROGRESS, isFetching, userId })
export const getUsersThunkCreater = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toogleIsFetching(true))
    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toogleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

export const pageChangingThunkCreater = (pageNumber, pageSize) => async (dispatch) => {
    dispatch(setCurrentPage(pageNumber))
    dispatch(toogleIsFetching(true))
    let data = await usersAPI.getUsers(pageNumber, pageSize)
    dispatch(toogleIsFetching(false))
    dispatch(setUsers(data.items));
}

let followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toogleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode == 0) { dispatch(actionCreator(userId)) }
    dispatch(toogleFollowingProgress(false, userId))
}

export const follow = (userId) => async (dispatch) => { followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess) }

export const unfollow = (userId) => async (dispatch) => { followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess) }


let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReduser = (state = initialState, action) => {

    switch (action.type) {

        case FOLLOW:
            return {...state, users: updateobjectInArray(state.users, action.userId, "id", {followed: true})}
        case UNFOLLOW:
            return {...state, users: updateobjectInArray(state.users, action.userId, "id", {followed: false})}
        case SET_USERS: {
            return {
                ...state, users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state, currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state, totalUsersCount: action.count
            }
        }
        case TOOGLE_IS_FETCHING: {
            return {
                ...state, isFetching: action.isFetching
            }
        }
        case TOOGLE_IS_F0LL0WING_PROGRESS: {
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }

        default:
            return state;
    }
}

export default usersReduser;