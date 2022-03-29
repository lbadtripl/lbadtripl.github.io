import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextArea } from '../common/preloader/FormControls/FormControls';
import { maxLengthCreator, required } from '../../utilites/validators/validators';


const maxLength100 = maxLengthCreator(100)
const Dialogs = (props) => {

    let dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id} image={d.image} />)

    let messagesElements = props.state.messages.map(m => <Message message={m.message} />)

    let addNewMessage = (values) => {
        props.addMessage(values.newMessageBody)
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <AddMessageFormRedux onSubmit = {addNewMessage}/>

            </div>
        </div>
    )
}

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component = {TextArea} name="newMessageBody" placeholder="Enter your message" validate = {[required, maxLength100]} />
            </div>
            <div>
                <button>new message</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm ({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs;

