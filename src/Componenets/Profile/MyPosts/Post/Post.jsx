import s from './Post.module.css';
const Post = (props) => {
  return (


    <div className={s.item}>
      {props.message}
      <div>
        <span>Like</span>
        {props.likeCounts}
      </div>

    </div>


  )
}

export default Post;