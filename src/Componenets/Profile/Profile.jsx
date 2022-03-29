import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
const Profile = (props) => {
  return (
    <div>
      <ProfileInfo profile ={props.profile} status = {props.status} editModeBll = {props.editMode} updateUserStatus = {props.updateUserStatus} isOwner = {props.isOwner} savePhoto = {props.savePhoto} saveProfile = {props.saveProfile} setEditMode = {props.setEditMode} />
      <MyPostsContainer/>
    </div>)
}

export default Profile;