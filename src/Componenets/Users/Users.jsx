import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({ currentPage, onPageChainged, totalUsersCount, pageSize, followingInProgress, unfollow, follow, users}) => {
    return (
        <div>
            <Paginator currentPage={currentPage} onPageChainged={onPageChainged} totalItemsCount={totalUsersCount} pageSize={pageSize} />

            {users.map(u => <User key={u.id} user={u} followingInProgress={followingInProgress} unfollow={unfollow} follow={follow} />)}
        </div>)
}

export default Users;