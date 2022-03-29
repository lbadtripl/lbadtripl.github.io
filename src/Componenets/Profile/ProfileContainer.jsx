import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useMatch } from "react-router-dom";
import { compose } from "redux";
import { getUserProfileThunkCreator, getUserStatusThunkCreator, savePhotoThunkCreator, saveProfileThunkCreator, setEditMode, updateUserStatusThunkCreator } from "../../Redux/profile-reducer";
import { withAuthRedirect } from "../hoc/WithAuthRedirect";
import Profile from './Profile';


const ProfileContainer = (props) => {

  let match = useMatch("/profile/:userId");
  let userId = match ? match.params.userId : props.authorizedUserId; 
  let isOwner = userId === props.authorizedUserId

  useEffect(() => {
    props.getUserProfileThunkCreator(userId)
    props.getUserStatusThunkCreator(userId)
  })

  return (
    <div>
      <Profile {...props} profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatusThunkCreator} isOwner = {isOwner} editMode = {props.editMode} savePhoto = {props.savePhotoThunkCreator} saveProfile = {props.saveProfileThunkCreator} setEditMode = {props.setEditMode}/>
    </div>)

}



let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
  editMode:state.profilePage.editMode
})

export default compose(
  connect(mapStateToProps, { getUserProfileThunkCreator, getUserStatusThunkCreator, updateUserStatusThunkCreator, savePhotoThunkCreator, saveProfileThunkCreator, setEditMode}),
  withAuthRedirect
)(ProfileContainer);


