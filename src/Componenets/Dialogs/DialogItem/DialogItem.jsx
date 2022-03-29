import s from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
    let path = "/Dialogs/" + props.id;
    return (
        <div className={s.dialog + " " + s.active}>
           <img src={props.image}/> <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}


export default DialogItem;