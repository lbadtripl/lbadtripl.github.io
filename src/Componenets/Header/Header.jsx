import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import Modal from './modalWindow';

const Header = (props) => {
    return (
        <header className={s.header}>
            <img src="logo.png" />
            <div className={s.loginBlock}>{
                props.isAuth? 
                <div> {props.login} - <button onClick = {props.logoutThunkCreator}>Logout</button> </div>
                  :<NavLink to={"/login"}>Login</NavLink>
            }     
            </div>
        </header>)
}

export default Header;