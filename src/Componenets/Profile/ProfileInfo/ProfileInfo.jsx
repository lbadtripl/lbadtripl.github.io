import Preloader from '../../common/preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from "../../../assets/images/images.jpg"
import { useState } from 'react';
import ProfileDataReduxForm from './ProfileDataForm';
import React from 'react';

const ProfileInfo = ({ profile, status, updateUserStatus, isOwner, savePhoto, saveProfile, editModeBll, setEditMode }) => {

  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    saveProfile(formData)
}

  return (
    <div>
      <div className={s.discriptionBlock}>
        <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />

        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}

        {editModeBll ? <ProfileDataReduxForm initialValues = {profile} profile={profile} onSubmit = {onSubmit} saveProfile = {saveProfile} /> : <ProfileData goToEditMode = {() => {setEditMode(true)}} profile={profile} isOwner = {isOwner} />}
        <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus} />

      </div>
    </div>)
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (

    <div>
      <div>
      {isOwner && <button onClick = {goToEditMode}>Edit</button>}
      </div>
      <div>
        <b>Full name:</b> {profile.fullName}
      </div>
      <div>
        <b> About me:</b> {profile.aboutMe}
      </div>
      <div>
        <b>Looking for a job:</b> {profile.lookingForAJob ? "Yes" : "No"}
      </div>
      {profile.lookingForAJob &&
        <div>
          <b>My professional skills:</b> {profile.lookingForAJobDescription}
        </div>
      }
      <div>
        <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
          return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]} />
        })}
      </div>
    </div>
  )
}


const Contacts = ({ contactTitle, contactValue }) => {
  return <div className={s.contact}> <b>{contactTitle}:</b> {contactValue}</div>
}

export default ProfileInfo;