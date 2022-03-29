import { Form, reduxForm } from "redux-form"
import { fieldCreator, Input, TextArea } from "../../common/preloader/FormControls/FormControls"
import styles from "../../common/preloader/FormControls/FormControls.module.css"


const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <div>
                {<button>Save</button>}
            </div>
            {error && <div className={styles.formSummuryError}> {error} </div>} 
            <div>
                <b>Full name:</b> {fieldCreator("Full name", "fullName", Input, [])}
            </div>
            <div>
                <b> About me:</b> {fieldCreator("About me", "aboutMe", TextArea, [])}
            </div>
            <div>
                <b>Looking for a job:</b> {fieldCreator("", "lookingForAJob", Input, [], {type: "checkbox"})}
            </div>
                <div>
                    <b>My professional skills:</b> {fieldCreator("My skills", "lookingForAJobDescription", TextArea, [])}
                </div>
            
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                    return <div key = {key} className = {styles.contacts}>
                        <b>{key}</b> {fieldCreator(key, "contacts." + key, Input, [])}
                        </div>
                })}
            </div>
        </Form>
    )
}

const ProfileDataReduxForm = reduxForm({ form: "edit-profile" })(ProfileDataForm)
export default ProfileDataReduxForm