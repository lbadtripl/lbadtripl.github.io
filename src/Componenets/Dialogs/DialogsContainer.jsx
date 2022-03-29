import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addMessageActionCreator} from '../../Redux/dialog-reducer';
import { withAuthRedirect } from '../hoc/WithAuthRedirect';
import Dialogs from './Dialogs';




let mapStateToProps = (state) => {
    return {
        state: state.messagesPage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (newMessageBody) => {
            dispatch(addMessageActionCreator(newMessageBody))
        }
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);

