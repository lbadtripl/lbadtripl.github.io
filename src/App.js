
import React, { Suspense } from 'react';
import { connect, Provider } from 'react-redux';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import './App.css';
import Preloader from './Componenets/common/preloader/Preloader';
import HeaderContainer from './Componenets/Header/HeaderContainer';
import Modal from './Componenets/Header/modalWindow';
import Login from './Componenets/login/login';
import Music from './Componenets/Music/Music';
import Nav from './Componenets/Nav/Nav';
import News from './Componenets/News/News';
import Settings from './Componenets/Settings/Settings';
import UsersContainer from './Componenets/Users/UsersContainer';
import { initializeAppThunk, errorsThunkCreator, globalErrorAC } from './Redux/App-reducer';
import store from './Redux/redux-store';

const DialogsContainer = React.lazy(() => import('./Componenets/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Componenets/Profile/ProfileContainer'));

class App extends React.Component {

  catchAllRejectionErrors = (reason, promise) => {
    this.props.errorsThunkCreator()
  }
  componentDidMount() {
    this.props.initializeAppThunk()
    window.addEventListener("unhandledrejection", this.catchAllRejectionErrors)
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllRejectionErrors)
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

              <Route path="/" element={<Navigate to="/Profile" />} />
              <Route path="/Profile/:userId" element={<ProfileContainer />} />
              <Route path="/Profile" element={<ProfileContainer />} />
              <Route path="/Dialogs/*" element={<DialogsContainer />} />
              <Route path="/Users/*" element={<UsersContainer />} />
              <Route path="/News" element={<News />} />
              <Route path="/Music" element={<Music />} />
              <Route path="/Settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element="404 NOT FOUND" />

            </Routes>
          </Suspense>
        </div>
        <div>
          {this.props.globalError && <Modal globalError = {this.props.globalError}/>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialaized: state.app.initialaized,
  globalError: state.app.globalError
})

let AppContainer = connect(mapStateToProps, { initializeAppThunk, errorsThunkCreator })(App);

export const SamuraiJsApp = (props) => {
  return (

    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>)
}
