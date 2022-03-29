
import React, { Suspense } from 'react';
import { connect, Provider } from 'react-redux';
import { Routes, Route, BrowserRouter, HashRouter } from 'react-router-dom';
import './App.css';
import Preloader from './Componenets/common/preloader/Preloader';
// import DialogsContainer from './Componenets/Dialogs/DialogsContainer';
import HeaderContainer from './Componenets/Header/HeaderContainer';
import Login from './Componenets/login/login';
import Music from './Componenets/Music/Music';
import Nav from './Componenets/Nav/Nav';
import News from './Componenets/News/News';
// import ProfileContainer from './Componenets/Profile/ProfileContainer';
import Settings from './Componenets/Settings/Settings';
import UsersContainer from './Componenets/Users/UsersContainer';
import { initializeAppThunk } from './Redux/App-reducer';
import store from './Redux/redux-store';

const DialogsContainer = React.lazy(() => import('./Componenets/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Componenets/Profile/ProfileContainer'));

class App extends React.Component {

  componentDidMount() {
    this.props.initializeAppThunk()
  }

  render() {
    if (!this.props.initialaized) {
      return <Preloader />
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Nav />
        <div className="app-wrapper-content">
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path="/Profile/:userId" element={<ProfileContainer />} />
              <Route path="/Profile" element={<ProfileContainer />} />
              <Route path="/Dialogs/*" element={<DialogsContainer />} />
              <Route path="/Users/*" element={<UsersContainer />} />
              <Route path="/News" element={<News />} />
              <Route path="/Music" element={<Music />} />
              <Route path="/Settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialaized: state.app.initialaized
})

let AppContainer = connect(mapStateToProps, { initializeAppThunk })(App);

export const SamuraiJsApp = (props) => {
  return (

    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>)
}
