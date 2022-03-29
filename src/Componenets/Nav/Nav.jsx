import s from './Nav.module.css';
import { NavLink } from 'react-router-dom';
import FriendItem from './Friends/Friends';
const Nav = (props) => {
  // let friendsElements = props.state.map(d => <FriendItem name={d.name} id={d.id} image={d.image} />)
  return (
    <nav className={s.nav}>
      <div>
        <div className={s.item}>
          <NavLink to="/Profile" className={navData => navData.isActive ? s.active : s.item}>Profile</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/Dialogs" className={navData => navData.isActive ? s.active : s.item}>Messages</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/Users" className={navData => navData.isActive ? s.active : s.item}>Users</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/News" className={navData => navData.isActive ? s.active : s.item}>News</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/Music" className={navData => navData.isActive ? s.active : s.item}>Music</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/Settings" className={navData => navData.isActive ? s.active : s.item}>Settings</NavLink>
        </div>
      </div>

      <div className={s.friendsBlock}>
        <h2>Friends</h2>
        {/* <div className={s.friendsElements}>
          {friendsElements}
        </div> */}
      </div>
    </nav>)
}

export default Nav;