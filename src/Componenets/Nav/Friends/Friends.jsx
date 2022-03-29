import s from './Friends.module.css';
import { NavLink } from 'react-router-dom';

const FriendItem = (props) => {
    let path = "/Dialogs/" + props.id;
    return (
        <div className={s.dialog + " " + s.active}>
           <img src={props.image}/> <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}


export default FriendItem;