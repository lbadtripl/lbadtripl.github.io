import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { Field, reduxForm } from "redux-form"
import { loginThunkCreator } from "../../Redux/auth-reducer"
import { required } from "../../utilites/validators/validators"
import { fieldCreator, Input } from "../common/preloader/FormControls/FormControls"
import styles from "../common/preloader/FormControls/FormControls.module.css"

const LoginForm = ({ handleSubmit, error, capchaUrl }) => {
    console.log("rerender")
    return (
        <form onSubmit={handleSubmit} >

            {fieldCreator("Email", "email", Input, [required])}
            {fieldCreator("Password", "password", Input, [required], { type: "password" })}
            {fieldCreator(null, "rememberMe", Input, [], { type: "checkbox" }, "remember me")}

            {capchaUrl && <img src={capchaUrl} />}
            {capchaUrl && fieldCreator("Inter image text", "captcha", Input, [required])}

            {error && <div className={styles.formSummuryError}> {error} </div>}
            <div>
                <button>Login</button>
            </div>

        </form>
    )
}


const LoginReduxForm = reduxForm({ form: "login" })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.loginThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Navigate to={"/Profile/22240"} />
    }
    return (
        <div>
            <h1> Login </h1>
            <LoginReduxForm onSubmit={onSubmit} capchaUrl={props.capchaUrl} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    capchaUrl: state.auth.capchaUrl
})

export default connect(mapStateToProps, { loginThunkCreator })(Login);