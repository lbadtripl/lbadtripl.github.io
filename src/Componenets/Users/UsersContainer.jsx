import React from "react";
import { connect } from "react-redux";
import { follow, unfollow, pageChangingThunkCreater, getUsersThunkCreater } from "../../Redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import { compose } from "redux";
import { withAuthRedirect } from "../hoc/WithAuthRedirect";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../Redux/users-selectors";

class UsersContainer extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize, getUsersThunkCreater} = this.props
        getUsersThunkCreater(currentPage, pageSize)
    }

    onPageChainged = (pageNumber) => {
        const {pageSize, pageChangingThunkCreater} = this.props
        pageChangingThunkCreater(pageNumber, pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChainged={this.onPageChainged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)

    }
}

export default compose(withAuthRedirect,
    connect(mapStateToProps, { follow, unfollow, getUsersThunkCreater, pageChangingThunkCreater }),
)(UsersContainer)