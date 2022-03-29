import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utilites/validators/validators';
import { TextArea } from '../../common/preloader/FormControls/FormControls';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const maxLength10 = maxLengthCreator(10)

// реакт мемо в рамках курса (не актуально)

const MyPosts = React.memo((props) => {
  
  let postsElements = props.posts.map(p => <Post message={p.message} likeCounts={p.likeCounts} />)

  let onAddPost = (values) => {
    props.addPost(values.newPostText)
  }


  return (

    <div className={s.postsBlock}>
      <h3> My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  )
}
)

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={TextArea} name="newPostText" validate = {[required, maxLength10]} placeholder = "Post message" />
      </div>
      <div>
        <button>new post</button>
      </div>
    </form>
  )
}
const AddNewPostFormRedux = reduxForm({ form: "ProfileAddNewPostForm" })(AddNewPostForm)

export default MyPosts;