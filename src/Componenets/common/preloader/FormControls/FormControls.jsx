import { Field } from "redux-form"
import styles from "./FormControls.module.css"

export const TextArea = (props) => {
    const { input, meta, child, ...restProps } = props
    return (
        <FormControl {...props} > <textarea {...input} {...restProps} /></FormControl>
    )
}
export const Input = (props) => {
    const { input, meta, child, ...restProps } = props
    return (
        <FormControl {...props} > <input {...input} {...restProps} /></FormControl>
    )
}
const FormControl = ({ input, meta, child, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : " ")}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}

        </div>
    )
}

export const fieldCreator = (placeholder, name, component, validators, props = {}, text = "" ) => <div><Field placeholder={placeholder} name={name} component={component} validate={validators} {...props}/>{text}</div>