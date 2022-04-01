import  "./modalWindow.css"

const Modal = ({globalError}) => {

    return (
        <div className = {globalError ? "modal active" : "modal"} >
            <div className = "modal__content">
                <span>{globalError}</span>    
            </div>
        </div>
    )
}

export default Modal